import React from 'react';
import { MessagesIcon } from './icons/DashboardIcons';
import Logo from './icons/Logo';

const mockMessages = [
  {
    sender: 'Priya Sharma',
    course: 'Full Stack Development',
    message: "Great work on the latest module! Don't forget the deadline for Project 1 is approaching.",
    time: '2 days ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop'
  },
  {
    sender: 'System Announcement',
    course: 'All Courses',
    message: "Scheduled maintenance on the platform this Sunday at 2 AM. Expect brief downtime.",
    time: '4 days ago',
    read: true,
  }
];

const InstructorMessages: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
      <h3 className="font-poppins font-bold text-xl text-dark-gray flex items-center gap-3">
        <MessagesIcon className="w-6 h-6 text-primary" />
        Instructor Messages
      </h3>
      <div className="mt-4 space-y-4">
        {mockMessages.map((msg, index) => (
          <div key={index} className="flex gap-4 cursor-pointer group">
            <div className="w-10 h-10 rounded-full flex-shrink-0 bg-light-gray flex items-center justify-center">
             {msg.avatar ? (
                <img src={msg.avatar} alt={msg.sender} className="w-full h-full rounded-full object-cover" loading="lazy" decoding="async" />
             ) : (
                <Logo className="w-6 h-6 text-primary" />
             )}
            </div>
            <div className="flex-grow border-b border-gray-200 pb-3 group-last:border-b-0">
              <div className="flex justify-between items-baseline">
                <p className={`font-semibold text-dark-gray ${!msg.read ? 'font-bold' : ''}`}>{msg.sender}</p>
                <p className="text-xs text-dark-gray/60">{msg.time}</p>
              </div>
              <p className="text-sm text-dark-gray/80 truncate">{msg.message}</p>
            </div>
          </div>
        ))}
         <button className="w-full text-center text-primary font-semibold text-sm hover:underline mt-2">View All Messages</button>
      </div>
    </div>
  );
};

export default InstructorMessages;
