import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="bg-[#000005] flex flex-col items-center ">
      <div className="w-screen h-screen flex flex-col justify-center p-16">
        <div className="flex flew-col items-center">
          <div className="relative bg-white rounded-full w-[75px] h-[75px] animate-spin" style={{ animation: 'rotation 10s linear infinite' }}>
            <div className="absolute bg-[#000005] rounded-full left-1/2 top-[7.5px] translate-x-[-50%] translate-y-[-50%] w-[10px] h-[10px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-[62.5px] top-[22.5px] translate-x-[-50%] translate-y-[-50%] w-[10px] h-[10px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-[62.5px] top-[52.5px] translate-x-[-50%] translate-y-[-50%] w-[10px] h-[10px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-1/2 top-[67.5px] translate-x-[-50%] translate-y-[-50%] w-[10px] h-[10px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-[12.5px] top-[52.5px] translate-x-[-50%] translate-y-[-50%] w-[10px] h-[10px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-[12.5px] top-[22.5px] translate-x-[-50%] translate-y-[-50%] w-[10px] h-[10px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[15px] h-[15px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
          </div>

          <div className="relative bg-white rounded-full w-[60px] h-[60px] animate-spin mb-0" style={{ animation: 'rotation 10s linear infinite' }}>
            <div className="absolute bg-[#000005] rounded-full left-1/2 top-[7.5px] translate-x-[-50%] translate-y-[-50%] w-[7.5px] h-[7.5px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-[50px] top-[20px] translate-x-[-50%] translate-y-[-50%] w-[7.5px] h-[7.5px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-[50px] top-[40px] translate-x-[-50%] translate-y-[-50%] w-[7.5px] h-[7.5px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-1/2 top-[52.5px] translate-x-[-50%] translate-y-[-50%] w-[7.5px] h-[7.5px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-[10px] top-[20px] translate-x-[-50%] translate-y-[-50%] w-[7.5px] h-[7.5px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-[10px] top-[40px] translate-x-[-50%] translate-y-[-50%] w-[7.5px] h-[7.5px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
            <div className="absolute bg-[#000005] rounded-full left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[12.5px] h-[12.5px] shadow-[0px_0px_3px_0.5px_#000000]"></div>
          </div>

        </div>

        <div className="flex items-center justify-between relative">
          <div className="relative bg-white w-full h-full rounded-[15px] mt-10 flex items-center justify-center">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <div className="absolute w-[150px] h-[90px] bg-white rounded-[15px]"></div>
              <div className="absolute top-[5%] left-[130px] w-0 h-0 border-t-[35px] border-t-transparent border-r-[40px] border-r-white border-b-[35px] border-b-transparent"></div>
            </div>
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="absolute w-full h-[4px] bg-gradient-to-r from-transparent to-gray-300 opacity-75 animate-radialShine"></div>
            </div>
          </div>

          <div className='ml-48 text-white'>
            Loading
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
