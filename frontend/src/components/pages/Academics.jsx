import SectionPage from "./SectionPage";

export default function Academics({ onNavigate }) {
  return (
    <SectionPage
      title="Academics"
      description="Course information, academic resources, programme details and useful student information."
      onNavigate={onNavigate}
    />
  );
}
