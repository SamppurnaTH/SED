import React from 'react';

interface LineChartProps {
  data: { label: string; value: number }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const width = 300;
  const height = 150;
  const padding = 20;

  const maxValue = Math.max(...data.map(item => item.value), 1); // Avoid division by zero
  const xStep = (width - padding * 2) / (data.length - 1);
  
  const points = data.map((item, index) => ({
    x: padding + index * xStep,
    y: height - padding - (item.value / maxValue) * (height - padding * 2),
  }));

  const pathD = points.map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;


  return (
    <div className="w-full h-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" aria-label="Line chart of submission trends">
        <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity={0.4}/>
                <stop offset="100%" stopColor="#1E3A8A" stopOpacity={0.05}/>
            </linearGradient>
        </defs>

        <path d={areaD} fill="url(#areaGradient)" />
        
        <path d={pathD} fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, index) => (
          <g key={index} className="group">
            <circle cx={p.x} cy={p.y} r="8" fill="#1E3A8A" fillOpacity="0" className="cursor-pointer" />
             <circle cx={p.x} cy={p.y} r="3" fill="#1E3A8A" className="transition-all group-hover:r-4" />
            <g className="opacity-0 group-hover:opacity-100 transition-opacity">
                <rect x={p.x - 20} y={p.y - 30} width="40" height="20" fill="#1E293B" rx="4" />
                <text x={p.x} y={p.y - 17} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                    {data[index].value}
                </text>
            </g>
          </g>
        ))}
        
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#d1d5db" strokeWidth="1" />
        <text x={padding} y={height - 5} fontSize="8" fill="#64748B">{data[0]?.label}</text>
        <text x={width - padding} y={height - 5} fontSize="8" fill="#64748B" textAnchor="end">{data[data.length-1]?.label}</text>

      </svg>
    </div>
  );
};

export default LineChart;