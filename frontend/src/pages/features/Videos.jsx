import React from "react";
import { FaPlay, FaClock, FaChalkboardTeacher } from "react-icons/fa";

function Videos() {
  const videos = [
    {
      title: "The Ultimate Frontend Developer Roadmap",
      description: "Complete guide to becoming a frontend developer in 2024",
      duration: "10 Minutes",
      views: "15K",
      instructor: "Sarah Johnson",
      link: "/frontend-roadmap",
      thumbnail: "https://img.youtube.com/vi/frontend123/maxresdefault.jpg"
    },
    {
      title: "Session Based Authentication",
      description: "Learn modern authentication techniques for web applications",
      duration: "2 Minutes",
      views: "8K",
      instructor: "Mike Chen",
      link: "/session-authentication",
      thumbnail: "https://img.youtube.com/vi/auth456/maxresdefault.jpg"
    },
    {
      title: "Backend Development with Django",
      description: "Master backend development using Django framework",
      duration: "15 Minutes",
      views: "12K",
      instructor: "Alex Thompson",
      link: "/django-backend",
      thumbnail: "https://img.youtube.com/vi/django789/maxresdefault.jpg"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Learning Videos
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Enhance your skills with our curated video content
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={video.thumbnail}
                  alt={video.title}
                />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <a href={video.link} className="block">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {video.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500">
                      {video.description}
                    </p>
                  </a>
                </div>
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <FaClock className="mr-1.5 h-4 w-4" />
                        {video.duration}
                      </span>
                      <span className="flex items-center">
                        <FaPlay className="mr-1.5 h-4 w-4" />
                        {video.views} views
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center">
                    <FaChalkboardTeacher className="h-5 w-5 text-gray-400" />
                    <p className="ml-2 text-sm font-medium text-gray-900">
                      {video.instructor}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Videos;
