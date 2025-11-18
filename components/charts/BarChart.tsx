import React from 'react';

interface BarChartProps {
  data: { label: string; value: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value), 0);
  const chartHeight = 300; // in pixels

  return (
    <div className="w-full h-[350px] flex flex-col p-4">
        <div className="flex-grow flex items-end gap-2 border-b-2 border-gray-200">
            {data.map((item, index) => {
                const barHeight = maxValue > 0 ? (item.value / maxValue) * chartHeight : 0;
                return (
                    <div 
                        key={index} 
                        className="flex-1 group relative"
                        style={{ height: `${chartHeight}px` }}
                    >
                        <div 
                            className="absolute bottom-0 w-full bg-primary/20 hover:bg-primary/40 rounded-t-md transition-colors"
                            style={{ height: `${barHeight}px` }}
                        >
                             <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-dark-gray text-white text-xs font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {item.value}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
        <div className="flex items-start gap-2 h-[50px] mt-1">
             {data.map((item, index) => (
                <div key={index} className="flex-1 text-center">
                    <p className="text-xs text-dark-gray/70 transform -rotate-45 origin-top-left whitespace-nowrap">
                        {item.label}
                    </p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default BarChart;