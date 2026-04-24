import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center px-6 py-3 rounded-full font-medium overflow-hidden transition-all duration-500";

  const variants = {
    primary:
      "text-white",
    outline:
      "border border-gray-300 text-gray-800",
  };

  const gradient =
    "absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600";

  const hoverGradient =
    "group-hover:from-blue-700 group-hover:to-purple-700";

  const content = (
    <>
      {/* Background */}
      {variant === "primary" && (
        <span
          className={`${gradient} ${hoverGradient} transition-all duration-500`}
        ></span>
      )}

      {/* Shine Effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>

      {/* Text */}
      <span className="relative z-10">{children}</span>
    </>
  );

  // If Link
  if (to) {
    return (
      <Link
        to={to}
        className={`${baseStyles} ${variants[variant]} ${className} group`}
      >
        {content}
      </Link>
    );
  }

  // Normal button
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className} group`}
    >
      {content}
    </button>
  );
};

export default Button;