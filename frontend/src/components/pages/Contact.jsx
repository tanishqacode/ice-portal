import SectionPage from "./SectionPage";

export default function Contact({ onNavigate }) {
  return (
    <SectionPage
      title="Contact the Department"
      description="Department address, contact details and other official information will be added here."
      onNavigate={onNavigate}
    />
  );
}
