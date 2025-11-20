import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useCart } from "./CartContext";

export default function ShoppingCart() {
  const {cartLength} = useCart();

  return (
    <NavLink to={"/panier"} className="p-1 max-w-32 w-full relative">
      <FaShoppingCart className="mx-auto size-6 hover:text-[#63acd6] transition duration-150  " />
      <p className="bg-white px-1  font-semibold text-[10px] border-2 border-gray-400 w-fit absolute bottom-0 left-5 rounded-4xl">{cartLength}</p>
    </NavLink>
  );
}
