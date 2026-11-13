import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { FoldersSection } from './components/FoldersSection';
import { SpecsAndContact } from './components/SpecsAndContact';

export function App() {
  return (
    <main>
      <Hero />
      <ProjectsSection />
      <FoldersSection />
      <SpecsAndContact />
    </main>
  );
}

export default App;
