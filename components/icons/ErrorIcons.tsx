
import React from 'react';

export const NotFoundIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 180C144.183 180 180 144.183 180 100C180 55.8172 144.183 20 100 20C55.8172 20 20 55.8172 20 100C20 144.183 55.8172 180 100 180Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round"/>
    <path d="M75 125L125 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    <path d="M125 125L75 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
    <path d="M152.75 100C152.75 129.148 129.148 152.75 100 152.75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeDasharray="1 16"/>
  </svg>
);

export const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16.0195V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
