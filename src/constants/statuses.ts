import { RiProgress4Line, RiCheckboxCircleFill } from "react-icons/ri";
import { HiOutlineMinusSm } from "react-icons/hi";

export const statuses = [
  { status: "TODO", icon: HiOutlineMinusSm },
  { status: "ATTEMPTED", icon: RiProgress4Line },
  {
    status: "SOLVED",
    icon: RiCheckboxCircleFill,
  },
];

// Utility function to get status icon
export const getStatusIcon = (status: string) => {
  return statuses.find((s) => s.status === status)?.icon || null;
};
