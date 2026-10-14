import SectionPage from "./SectionPage";

export default function About({ onNavigate }) {
  return (
    <SectionPage
      title="About the Department"
      description="Learn about the department, its academic environment, facilities and areas of focus."
      onNavigate={onNavigate}
    />
  );
}
