import { RiProgress4Line, RiCheckboxCircleFill } from "react-icons/ri";
import { HiOutlineMinusSm } from "react-icons/hi";

export const statuses = [
  { status: "TODO", icon: HiOutlineMinusSm, color: "text-primary" },
  { status: "ATTEMPTED", icon: RiProgress4Line, color: "text-orange-600" },
  { status: "SOLVED", icon: RiCheckboxCircleFill, color: "text-emerald-700" },
];

// Utility function to get status icon
export const getStatusIcon = (status: string) => {
  return statuses.find((s) => s.status === status)?.icon || null;
};

// Utility function to get status color
export const getStatusColor = (status: string) => {
  return statuses.find((s) => s.status === status)?.color || "";
};
