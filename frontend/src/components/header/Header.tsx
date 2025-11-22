import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import { MdOutlineClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import ShoppingCart from "../cart/ShoppingCart";
import logo from "../../assets/logo-gymbros.png";
import Search from "../search/Search";

export default function Header() {
  const [size, setSize] = useState(window.innerWidth);
  const [isOpenInternal, setIsOpenInternal] = useState(false);
  const isLarge = size >= 825;

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isOpen = isLarge ? false : isOpenInternal;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);


  return (
    <>
      {size >= 825
        ? (
          <header className="fixed z-40 h-20 w-full bg-[#f8f7f4] shadow-2xl rounded-b-2xl text-center">
            <nav className="w-full h-full flex justify-between gap-4 items-center px-8">
              <NavLink to={"/"} className="w-18 rounded-2xl bg-gray-200">
                <img
                  src={logo}
                  className="rounded-2xl w-full h-full object-contain"
                  alt="Logo GymBros"
                />
              </NavLink>

              <div className="flex gap-6 md:gap-2 items-center max-w-64 w-full">
                <Button value="" text="nutrition" link="/nutrition" />
                <Button value="" text="vêtement" link="/vetement" />
              </div>
              <div className="flex gap-6 md:gap-2 min-w-fit items-center relative">
                <Search />
                <NavLink to={"/"} className="p-4 max-w-32 w-full">
                  <FaUser className="mx-auto size-6 hover:text-[#63acd6] transition duration-150" />
                </NavLink>
                <ShoppingCart />
              </div>
            </nav>
          </header>
        )
        : (
          <div className="relative w-full">
            <div
              onClick={() => setIsOpenInternal(false)}
              className={isOpen
                ? "absolute z-20 w-full h-screen bg-black opacity-40"
                : ""}
            >
            </div>
            <GiHamburgerMenu
              onClick={() => setIsOpenInternal(true)}
              className="size-10 my-4 mx-2"
            />
            <div
              className={isOpen
                ? "absolute top-0 left-0 flex justify-center bg-[#F4F4F4F4] z-30 w-2/3 h-screen"
                : "hidden"}
            >
              <MdOutlineClose
                onClick={() => setIsOpenInternal(false)}
                className="z-40 absolute top-2 right-0 text-4xl cursor-pointer"
              />
              <div className="flex flex-col justify-center gap-8 w-10/12 relative">
                <Button value="" text="home" link="/" />
                <Button value="" text="nutrition" link="/nutrition" />
                <Button value="" text="vêtement" link="/vetement" />
                <Button value="" text="compte" link="/" />
                <Button value="" text="panier" link="/panier" />
              </div>
            </div>
          </div>
        )}
    </>
  );
}
