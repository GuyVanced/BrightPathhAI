import React from 'react';
import Header from './layouts/Header';
import MainContent from './components/MainContent';
import RoleBasedRoadmaps from './pages/roadmaps/RoleBasedRoadmaps';
import SkillsBasedRoadmaps from './pages/roadmaps/SkillsBasedRoadmaps';
import Videos from './pages/features/Videos';
import PracticeForFree from './pages/features/PracticeForFree';
import Footer from './layouts/Footer';

function BrightPathAI() {
  return (
    <div className="flex overflow-hidden flex-col items-center bg-neutral-950 pt-20">
      <Header />
      <div className="w-full max-w-[1344px] px-4">
        <MainContent />
        <RoleBasedRoadmaps />
        <SkillsBasedRoadmaps />
        <Videos/>
        <PracticeForFree/>
      </div>
      <Footer/>
    </div>
  );
}

export default BrightPathAI;