import React, { MouseEvent } from "react";

interface SubmitBtnProps {
  isDisabled: boolean;
  isLoading: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ isDisabled, isLoading, handleClick }) => {
  return (
    <button
      type="submit"
      className={`w-full group btn-indigo ${isDisabled ? "btn-indigo-disabled" : ""} ${isLoading ? "btn-indigo-loading" : ""}`}
      disabled={isDisabled || isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <div className="flex flex-row items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">
          See who doesn't follow me back
          <svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        </div>
      )}
    </button>
  );
};

export default SubmitBtn;
