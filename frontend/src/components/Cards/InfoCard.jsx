import React from 'react';

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div className='flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50'>
      <div className={`w-14 h-14 flex items-center justify-center ${color} rounded-full drop-shadow-xl`}>
        <div className="text-2xl text-white">
          {icon}
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        <h6 className='text-sm text-gray-500 mb-1'>{label}</h6>
        <span className='text-[22px] font-semibold'>${value}</span>
      </div>
    </div>  
  );
}

export default InfoCard;