import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#A9A9A9']; // Activated blue and deactivated blue (grayish blue)

interface PieChartComponentProps {
  data: {
    totalAmount: number;
    contributionGoal: number;
  };
  className?: string;
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data, className }) => {
  const pieData = [
    { name: 'Total Amount', value: data.totalAmount },
    { name: 'Contribution Goal', value: data.contributionGoal - data.totalAmount },
  ];

  return (
    <div className={className}>
      <PieChart width={250} height={300}>
        <Legend 
          layout="horizontal" 
          verticalAlign="top" 
          align="center" 
          wrapperStyle={{ paddingTop: 0, paddingBottom: 0 }} 
        />
        <Pie
          data={pieData}
          cx={125}
          cy={150}
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;