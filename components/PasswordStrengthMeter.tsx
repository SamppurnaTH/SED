import React from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const getStrength = (p: string): number => {
    let score = 0;
    if (!p) return 0;

    // Award points for different criteria
    if (p.length >= 8) score++;
    if (p.length >= 12) score++; // bonus for longer passwords
    if (/[a-z]/.test(p)) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    if (p.length < 8) return 1;
    if (score <= 2) return 1; // Weak
    if (score <= 4) return 2; // Medium
    if (score <= 5) return 3; // Good
    return 4; // Strong
  };

  const strength = getStrength(password);
  
  if (!password) {
    return null; // Don't render anything if there's no password
  }

  const strengthLabels = ['', 'Weak', 'Medium', 'Good', 'Strong'];
  const strengthColors = [
    'bg-gray-200',
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500'
  ];
   const strengthTextColors = [
    'text-gray-500',
    'text-red-500',
    'text-yellow-500',
    'text-blue-500',
    'text-green-500'
  ];
  
  const activeColor = strengthColors[strength] || 'bg-gray-200';
  const activeTextColor = strengthTextColors[strength] || 'text-gray-500';
  const widthPercentage = strength * 25;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden" role="meter" aria-valuenow={strength} aria-valuemin={0} aria-valuemax={4}>
        <div
          className={`transition-all duration-300 ${activeColor}`}
          style={{ width: `${widthPercentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className={`text-xs font-medium ${activeTextColor}`}>
          {strengthLabels[strength]}
        </p>
         <p className="text-xs text-dark-gray/60">
            {password.length < 8 && 'Minimum 8 characters'}
        </p>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
