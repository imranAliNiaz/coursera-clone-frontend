export interface UpNextCourseCardProps {
  title: string;
  image: string;
  className?: string;
}

export interface EarnDegreeCardProps {
  university: string;
  degree: string;
  image: string;
  universityIcon: string;
  className?: string;
}

export interface MasterTrackCertificateCardProps {
  title: string;
  image: string;
  university: string;
  universityIcon: string;
  typeLabel: "Mastertrack" | "University Certificate";
}
