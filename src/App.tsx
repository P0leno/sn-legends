import { Hero } from './components/Hero';
import { MusicPlayer } from './components/MusicPlayer';
import { ProjectsSection } from './components/ProjectsSection';
import { FoldersSection } from './components/FoldersSection';
import { SpecsAndContact } from './components/SpecsAndContact';

export function App() {
  return (
    <main>
      <Hero />
      <MusicPlayer />
      <ProjectsSection />
      <FoldersSection />
      <SpecsAndContact />
    </main>
  );
}

export default App;
