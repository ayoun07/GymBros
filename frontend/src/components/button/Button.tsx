import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface ButtonProps {
  value: string;
  link?: string;
}

export default function Button({ value, link }: ButtonProps) {
  return (
    <NavLink
      to={link || "/"}
      className=" active:bg-[#63acd6] flex justify-center items-center gap-2 z-10 text-center bg-[#5390b3] hover:bg-[#63acd6] transition duration-300 rounded-2xl text-white max-w-64 w-full px-2 py-4 uppercase font-medium"
    >
      {value}
      {
        value === "Ajouter au panier" && <FaShoppingCart size={24}/>
      }
    </NavLink>
  );
}
