import SectionPage from "./SectionPage";

export default function Students({ onNavigate }) {
  return (
    <SectionPage
      title="Student Corner"
      description="A space for student resources, projects, research collaboration and academic opportunities."
      onNavigate={onNavigate}
    />
  );
}
