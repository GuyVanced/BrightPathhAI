import React from "react";

function MainContent() {
  return (
    <main className="flex flex-col items-center justify-center py-16">
      <div className="text-center">
        <h1 className="text-7xl md:text-8xl font-black text-white mb-8">
          BrightPath <span className="text-purple-500">AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-pink-400 max-w-3xl mx-auto leading-relaxed font-medium px-4">
          Helps to create roadmaps, guides and other educational content to help
          guide Learners in picking up a path and guide their learnings.
        </p>
      </div>
    </main>
  );
}

export default MainContent;
