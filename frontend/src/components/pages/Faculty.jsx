import SectionPage from "./SectionPage";

export default function Faculty({ onNavigate }) {
  return (
    <SectionPage
      title="Faculty"
      description="Faculty profiles, research interests, qualifications and contact information will be available here."
      onNavigate={onNavigate}
    />
  );
}
