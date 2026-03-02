import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyCertificate } from "../../redux/slices/student/studentCertificateVerifySlice";

const CertificateVerify: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state) => state.studentCertificateVerify,
  );

  useEffect(() => {
    if (!code) return;
    dispatch(verifyCertificate(code));
  }, [code, dispatch]);

  if (loading) {
    return <div className="p-10">Loading certificate...</div>;
  }

  if (error) {
    return <div className="p-10 text-error">{error}</div>;
  }

  if (!data) {
    return <div className="p-10 text-error">No certificate data found.</div>;
  }

  return (
    <div className="min-h-screen bg-background font-sans text-text-primary">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        <h1 className="text-[28px] font-bold mb-4">Certificate Verification</h1>
        <div className="border border-border rounded-[8px] p-6">
          <p className="text-[14px] text-text-secondary mb-2">
            This certificate is valid and belongs to:
          </p>
          <p className="text-[18px] font-bold">{data.learnerName}</p>
          <div className="mt-4 space-y-1 text-[14px] text-text-primary">
            <p>
              Course: <span className="font-semibold">{data.courseTitle}</span>
            </p>
            <p>
              Issued:{" "}
              <span className="font-semibold">
                {new Date(data.issuedAt).toLocaleDateString()}
              </span>
            </p>
            <p>
              Partner:{" "}
              <span className="font-semibold">{data.partnerName || "N/A"}</span>
            </p>
            <p>
              Verification Code:{" "}
              <span className="font-semibold">{data.verificationCode}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerify;
