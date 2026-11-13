import { useState } from 'react';
import { Hero } from './components/Hero';
import { MusicPlayer } from './components/MusicPlayer';
import { ProjectsSection } from './components/ProjectsSection';
import { FoldersSection } from './components/FoldersSection';
import { ProjectSheet } from './components/ProjectSheet';
import { SpecsAndContact } from './components/SpecsAndContact';
import type { ProjectItem } from './data/profile';

export function App() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  return (
    <>
      <main>
        <Hero />
        <MusicPlayer />
        <ProjectsSection onSelectProject={setActiveProject} />
        <FoldersSection onSelectProject={setActiveProject} />
        <SpecsAndContact />
      </main>
      <ProjectSheet project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}

export default App;
