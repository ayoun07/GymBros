import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import { MdOutlineClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser, FaShoppingCart  } from "react-icons/fa";

export default function Header() {
  const [size, setSize] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
      size >= 825 ? setIsOpen(false) : null;
  }, [size])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return (
    <>
      {size >= 825 ? (
        <header className="h-20 mb-16 w-full bg-[#f8f7f4] shadow-2xl rounded-b-2xl text-center">
          <nav className="w-full h-full flex justify-between gap-4 items-center px-8">
            <div className="p-4 w-26 bg-gray-200 rounded-2xl">logo</div>
            <div className="flex gap-6 md:gap-2 items-center max-w-64 w-full">
              <Button value="nutrition" link="/" />
              <Button value="vêtement" link="/" />
            </div>
            <div className="flex gap-6 md:gap-2 min-w-fit items-center">
              <input
                type="text"
                placeholder="rechercher"
                className="p-4 min-w-86 bg-gray-200 rounded-2xl outline-none"
              />
              <NavLink to={"/"} className="p-4 max-w-32 w-full ">
                <FaUser className="mx-auto size-6 hover:text-[#63acd6] transition duration-150" />
              </NavLink>
              <NavLink to={"/"} className="p-4 max-w-32 w-full ">
                <FaShoppingCart className="mx-auto size-6 hover:text-[#63acd6] transition duration-150  " />
              </NavLink>
            </div>
          </nav>
        </header>
      ) : (
        <div className="relative w-full">
          <div
          onClick={() => setIsOpen(false)}
            className={
              isOpen ? "absolute z-10 w-full h-screen bg-black opacity-40" : ""
            }
          ></div>
          <GiHamburgerMenu onClick={() => setIsOpen(true)} className="size-10 my-4 mx-2" />
          <div className={isOpen ? "absolute top-0 left-0 flex justify-center bg-[#F4F4F4F4] z-30 w-2/3 h-screen" : "hidden"}>
            <MdOutlineClose
              onClick={() => setIsOpen(false)}
              className="z-40 absolute top-2 right-0 text-4xl cursor-pointer"
            />
            <div className="flex flex-col justify-center gap-8 w-10/12 relative">
              <Button value="nutrition" link="/" />
              <Button value="vêtement" link="/" />
              <Button value="compte" link="/" />
              <Button value="panier" link="/" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
