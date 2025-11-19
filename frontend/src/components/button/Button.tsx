import { NavLink } from "react-router-dom";

interface ButtonProps {
  value: string;
  link?: string;
}

export default function Button({ value, link }: ButtonProps) {
  return (
    <NavLink
      to={link || "/"}
      className=" active:bg-[#63acd6] z-10 text-center bg-[#5390b3] hover:bg-[#63acd6] transition duration-300 rounded-2xl text-white max-w-64 w-full px-2 py-4 uppercase font-medium"
    >
      {value}
    </NavLink>
  );
}
