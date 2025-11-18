
import React from 'react';
import Toast from './Toast';
import { Toast as ToastInterface } from '../types';

interface ToastContainerProps {
  toasts: ToastInterface[];
  removeToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end pointer-events-none">
      {/* Enable pointer events for the toasts themselves so they can be clicked/closed */}
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
