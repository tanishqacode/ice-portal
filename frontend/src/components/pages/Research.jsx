import SectionPage from "./SectionPage";

export default function Research({ onNavigate }) {
  return (
    <SectionPage
      title="Research & Publications"
      description="Explore research areas, faculty publications and research opportunities. Publication records can be connected to the database later."
      onNavigate={onNavigate}
    />
  );
}
