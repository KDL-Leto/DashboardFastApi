import { useEffect, useState } from "react";
import React from "react";

const SpinnerLoader = () => {
  return (
    <div className="bg-white pt-12 flex items-center justify-center">
      <h1 className="text-3xl text-yellow-600 ">Loading...</h1>
    </div>
  );
};

export default SpinnerLoader;
