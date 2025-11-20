import { useEffect, useState } from "react";
import { deleteCart, getCart } from "../../../service/CartService";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useCart } from "./CartContext";
import { NavLink } from "react-router-dom";

function ShoppingCartPage() {
  const [dataCart, setDataCart] = useState([]);
  const { refreshCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isId, setIsId] = useState(null);

  useEffect(() => {
    getAllProductFromCart();
  }, []);

  const getAllProductFromCart = async () => {
    const response = await getCart("1");
    console.log(response);
    setDataCart(response);
  };

  const deleteProductFromCart = async () => {
    isId && (await deleteCart(isId));

    setDataCart((prev) => prev.filter((item: any) => item.id !== isId));

    await refreshCart();

    setIsOpen(false);
  };

  const totalPrice = dataCart.reduce(
    (sum, item) => sum + item.product.price,
    0
  );

  return (
    <div className="pt-32 mb-32">
      {!dataCart.length ? (
        <p>aucun article dans le panier !</p>
      ) : (
        <div className="flex max-md:flex-col gap-6 flex-row">
          <section className="h-fit sm:w-full flex flex-col gap-6 md:mb-32 relative">
            {isOpen && (
              <div className="fixed text-center p-2 inset-0 flex items-center justify-center bg-black/40 z-20">
                <div className="w-full max-w-md flex flex-col justify-center p-4 gap-8 h-fit rounded-2xl bg-[#F8F7F4]">
                  <h5>voulez-vous vraiment supprimer ce produit ?</h5>
                  <div className="flex flex-row justify-center gap-4">
                    <button
                      onClick={() => deleteProductFromCart()}
                      className="cursor-pointer py-2 px-6 text-white bg-[#5390b3] hover:bg-[#63acd6] active:bg-[#63acd6] rounded-xl"
                    >
                      oui
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="hover:bg-[#63acd6] active:bg-[#63acd6] hover:text-white hover:border-[#63acd6] cursor-pointer py-2 px-6 border-3 text-gray-400 border-gray-400 rounded-xl"
                    >
                      non
                    </button>
                  </div>
                </div>
              </div>
            )}

            {dataCart.map((value: any) => (
              <NavLink
                to={`/${value.product.type.toLowerCase()}/${value.product.id}`}
                key={value.id}
                className="bg-[#F8F7F4] hover:scale-101 transition duration-300 rounded-2xl shadow-2xl w-full h-fit flex flex-row justify-between"
              >
                <div className="w-44 max-md:h-24 h-32  ">
                  <img
                    src={value.product.imageUrls[0]}
                    className="rounded-2xl object-cover w-full h-full"
                    alt=""
                  />
                </div>
                <div className="w-full flex flex-col gap-1 p-2 z-10">
                  <div className="relative flex flex-row justify-between z-30 items-center ">
                    <p className="text-xl font-semibold">
                      {value.product.price.toFixed(2)}€
                    </p>
                    <RiDeleteBin7Fill
                      size={20}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsOpen(true);
                        setIsId(value.id);
                      }}
                      className="  hover:text-red-800 active:text-red-800"
                    />
                  </div>
                  <p className="font-semibold line-clamp-2 ">
                    {value.product.name}
                  </p>
                  <p className="max-w-240 w-full line-clamp-2 max-md:hidden">
                    {value.product.description}
                  </p>
                </div>
              </NavLink>
            ))}
          </section>
          <section className="flex flex-col bg-[#F8F7F4] shadow-2xl max-w-130 w-full h-135 rounded-2xl gap-8 p-4">
            <div className="gap-4 flex flex-col mb-8">
              <div className="flex flex-row text-2xl font-semibold justify-between">
                <p>Total : </p>
                <p>{totalPrice.toFixed(2)}€</p>
              </div>
              <div className="flex flex-row justify-center w-full">
                <button className="w-full uppercase font-semibold active:bg-[#63acd6] text-center bg-[#5390b3] hover:bg-[#63acd6] transition duration-300  rounded-2xl p-4 text-white ">
                  Passer a l'achat
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-2xl font-semibold">Code Promo : </p>
              <div className="flex flex-row justify-between w-full bg-gray-200 rounded-2xl">
                <input
                  type="text"
                  placeholder="votre code promo"
                  className=" w-full rounded-r-none p-4 rounded-2xl outline-none"
                  name=""
                  id=""
                />
                <button className="cursor-pointer font-semibold active:bg-[#63acd6] text-center bg-[#5390b3] hover:bg-[#63acd6] rounded-r-2xl  text-white p-2">
                  Appliquer
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ShoppingCartPage;
