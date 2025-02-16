import React, { useState } from 'react';

const WaterReminder: React.FC = () => {
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [goal] = useState<number>(2000); // Default goal: 2 liters

  const handleAddIntake = (amount: number) => {
    setWaterIntake(prev => prev + amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Water Reminder</h3>
      <p className="text-sm">Daily Goal: {goal} ml</p>
      <p className="font-medium">{waterIntake} ml consumed</p>
      <div className="flex space-x-2 mt-4">
        <button onClick={() => handleAddIntake(250)} className="px-3 py-1 bg-[#7c9b88] text-white rounded">Add 250 ml</button>
        <button onClick={() => handleAddIntake(500)} className="px-3 py-1 bg-[#7c9b88] text-white rounded">Add 500 ml</button>
      </div>
    </div>
  );
};

export default WaterReminder;
