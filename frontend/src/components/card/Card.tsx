import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getAverageRating, getNoticesId } from "../../../service/NoticeService";
import Button from "../button/Button";
import { updateFavoriteProduct } from "../../../service/ProductService";

interface CardProps {
  id: string;
  title: string;
  price: number;
  link: string;
  favorite: boolean;
  type: string;
  image: string;
  rating?: number;
}

export default function Card({ id, title, price, favorite, type, link, image }: CardProps) {
  const [rating, setRating] = useState("0");
  const [averageRating, setAverageRating] = useState("0");
  const [isFavorite, setIsFavorite] = useState(favorite);

  useEffect(() => {
    getNoticesById();
  }, []);

  const getNoticesById = async () => {
    const response = await getNoticesId(id);
    const responseAverage = await getAverageRating(id);
    setRating(response);
    setAverageRating(responseAverage);
  };

  const handleChangeFavorite = async () => {
    const response = await updateFavoriteProduct(id, { favorite: !isFavorite });
    setIsFavorite(response)
    console.log(response);
  }

  return (
    <NavLink
      to={link}
      className="z-0 hover:scale-105 duration-300 transition text-center flex justify-center rounded-2xl max-w-80  p-2 h-fit shadow-xl bg-[#F8F7F4]"
    >
      <div className=" flex flex-col gap-4">
        <div className="relative">
        <img
          className="shadow-2xl rounded-2xl w-full h-56 bg-fit object-cover"
          src={image}
          alt=""
        />
        <FaHeart className={`bg-white ${favorite ? "text-red-500" : ""} rounded-2xl z-20 absolute top-2 right-2 p-1`} size={24}
       onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleChangeFavorite();
                      }}
        />
        </div>
        <p className="font-semibold uppercase h-12 ">{title}</p>
          <div className="flex flex-row justify-center font-bold text-xl items-center gap-2">
            <div className="text-yellow-500 flex flex-row gap-2 items-center">
            <FaStar  size={24} /> {rating ? `${averageRating}/5` : "0"}
            </div>
            {rating ? <span className="text-gray-500">({rating.length} avis) </span> : <span>0</span>}
          </div>
        <p className="text-2xl font-semibold">{price.toFixed(2)} €</p>
        <div className="flex z-10 items-center justify-center  w-full rounded-xl">
            <Button text="Ajouter au panier" value={id} action="addToCart" link={`/${type}/${id}`} />
        </div>
      </div>
    </NavLink>
  );
}
