import React from "react";
import type { ButtonProps } from "../../types/button.type";

const Button: React.FC<ButtonProps> = ({ title, className }) => {
  return <button className={`${className}`}> {title}</button>;
};

export default Button;
