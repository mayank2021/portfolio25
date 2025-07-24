import React from "react";

const knowMore = () => {
  return (
    <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center">
      <p className="font-light text-[#fff] tracking-[0.05em] text-[30px] text-center">
        Wanted to know <p className="text-[#56d9cd] inline">more</p>?
      </p>
      <div className="flex items-center gap-1">
        <img
          width={100}
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGNoZnQ5aWh3dW5pa3RqdXlhcDI2MnJjcW02M3Y0cWNsb3hnZXV4biZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/t9Cgq1ZlCGPlvneY3v/giphy.gif"
          alt="arrow-right"
        />
        <a href="https://heymayank.surge.sh/" target="_blank">
          <span className="text-[28px] font-bold hover:text-red-300 transition-all duration-300 cursor-pointer uppercase tracking-wider text-[#F5513A]">
            here
          </span>
        </a>
      </div>
    </div>
  );
};

export default knowMore;
