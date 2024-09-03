/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useId } from "react";

function Select({ label, className, options, ...porps }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <labal htmlFor={id} className="">
          {label}
        </labal>
      )}
      <select
        {...porps}
        id={id}
        ref={ref}
        className={`px-3  py-2 rounded-lg  bg-white text-black outline-none
             focus:bg-gray-50 duration-200 border border-gray-100 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
