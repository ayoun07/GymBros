import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { addToCart } from "../../../service/CartService";
import { useCart } from "../cart/useCart";


interface ButtonProps {
  text: string;
  value: string;
  link?: string;
  action?: string;
}

export default function Button({ text, value, link }: ButtonProps) {
  const { refreshCart } = useCart();

  const addCart = async () => {
    await addToCart("1", value?.toString() as string);
    await refreshCart();
  };


  return (
    <NavLink
      to={link || "/"}
      className=" active:bg-[#63acd6] flex justify-center items-center gap-2 z-10 text-center bg-[#5390b3] hover:bg-[#63acd6] transition duration-300 rounded-2xl text-white max-w-64 w-full px-2 py-4 uppercase font-medium"
      onClick={() => addCart()}
    >
      {text}
      {text === "Ajouter au panier" && <FaShoppingCart size={24} />}
    </NavLink>
  );
}
