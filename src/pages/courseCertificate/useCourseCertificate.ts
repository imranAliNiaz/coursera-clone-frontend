import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { certificateApi } from "../../services/certificateApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCertificate } from "../../redux/slices/student/studentCertificateSlice";
import type { CertificateData } from "../../types/student";
import { toast } from "react-hot-toast";

const useCourseCertificate = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { certificate, loading } = useAppSelector(
    (state) =>
      state.studentCertificate as {
        certificate: CertificateData | null;
        loading: boolean;
      },
  );

  useEffect(() => {
    if (!id) return;
    dispatch(fetchCertificate(id));
  }, [id, dispatch]);

  const verifyUrl = certificate?.verificationCode
    ? `${window.location.origin}/verify/${certificate.verificationCode}`
    : "";

  const apiBase = import.meta.env.VITE_API_BASE_URL || "/api/v1";
  const backendOrigin = apiBase.replace(/\/api\/v1\/?$/, "");
  const certificateImageUrl =
    certificate?.imageUrl && certificate.imageUrl.startsWith("/")
      ? `${backendOrigin}${certificate.imageUrl}`
      : certificate?.imageUrl;

  const formatCompletionDate = (value?: string) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const normalizeOutcomes = (value?: string | string[]) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((point) => point.trim()).filter(Boolean);
    }
    return value
      .split(/\r?\n|;|â€¢|\u2022|- /g)
      .map((point) => point.trim())
      .filter(Boolean);
  };

  const learningPoints = (() => {
    const outcomes = certificate?.course?.outcomes;
    const points = normalizeOutcomes(outcomes ?? undefined);
    if (points.length > 0) return points;
    return normalizeOutcomes(
      certificate?.course?.description?.substring(0, 100) ?? undefined,
    );
  })();

  const handleDownload = async () => {
    if (!id) return;

    const toastId = toast.loading("Preparing your certificate...");

    try {
      const blob = await certificateApi.downloadCertificate(id);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${certificate?.courseTitle || "certificate"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Certificate downloaded successfully!", { id: toastId });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to download certificate.";

      toast.error(message, { id: toastId });
    }
  };

  const handleShare = async () => {
    if (!verifyUrl) return;

    try {
      await navigator.clipboard.writeText(verifyUrl);
      toast.success("Verification link copied to clipboard!");
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to copy verification link.";

      toast.error(message);
    }
  };

  return {
    certificate,
    loading,
    verifyUrl,
    certificateImageUrl,
    learningPoints,
    formatCompletionDate,
    handleDownload,
    handleShare,
  };
};

export default useCourseCertificate;
