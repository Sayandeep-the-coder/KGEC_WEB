import AnnouncementsClient, { Notice } from "./AnnouncementsClient";

interface AnnouncementsProps {
  notices: Notice[];
}

export default function Announcements({ notices }: AnnouncementsProps) {
  return <AnnouncementsClient notices={notices} />;
}
