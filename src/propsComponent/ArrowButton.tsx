import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ArrowButtonProps {
  direction: "left" | "right";
  onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick }) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full bg-white shadow hover:bg-green-100 hover:scale-110 transition-all duration-300"
    >
      <Icon className="text-green-700 w-5 h-5" />
    </button>
  );
};

export default ArrowButton;
