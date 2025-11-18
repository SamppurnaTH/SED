import React from 'react';
import { Course } from '../types';
import { DeadlinesIcon } from './icons/DashboardIcons';

const formatDateDistance = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    // Reset time part to compare dates only
    date.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Past due';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `in ${diffDays} days`;
};

const UpcomingDeadlines: React.FC<{ enrolledCourses: Course[] }> = ({ enrolledCourses }) => {
  const allDeadlines = enrolledCourses
    .flatMap(course => 
      course.deadlines?.map(d => ({ ...d, courseName: course.name })) || []
    )
    .filter(d => new Date(d.date) >= new Date(new Date().setDate(new Date().getDate() -1))) // Show deadlines from yesterday onwards
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h3 className="font-poppins font-bold text-xl text-dark-gray flex items-center gap-3">
        <DeadlinesIcon className="w-6 h-6 text-primary" />
        Upcoming Deadlines
      </h3>
      <div className="mt-4 space-y-4">
        {allDeadlines.length > 0 ? (
          allDeadlines.map((deadline, index) => (
            <div key={index} className="border-l-4 border-primary pl-4">
              <p className="font-semibold text-dark-gray">{deadline.task}</p>
              <p className="text-sm text-dark-gray/70">{deadline.courseName}</p>
              <p className="text-sm font-bold text-primary mt-1">
                Due {formatDateDistance(deadline.date)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-dark-gray/70">No upcoming deadlines. You're all caught up!</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;