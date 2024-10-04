import React from 'react';
import Header from '@/app/course/[courseId]/start/_components/Header';

function CourseLayout({ children }) {
  return (
    <div className="">
      {/* Fixed Header */}
      <div className="fixed top-0 w-full z-10">
        <Header />
      </div>
      
      {/* Content */}
      <div className="pt-16"> {/* Adjust padding based on header height */}
        {children}
      </div>
    </div>
  );
}

export default CourseLayout;
