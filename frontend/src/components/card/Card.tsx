import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAverageRating, getNoticesId } from "../../../service/NoticeService";
import Button from "../button/Button";
interface CardProps {
  id: string;
  title: string;
  price: number;
  link: string;
  image: string;
  rating?: number;
}

export default function Card({ id, title, price, link, image }: CardProps) {
  const [rating, setRating] = useState("0");
  const [averageRating, setAverageRating] = useState("0");

  useEffect(() => {
    getNoticesById();
  }, []);

  const getNoticesById = async () => {
    const response = await getNoticesId(id);
    const responseAverage = await getAverageRating(id);
    console.log("jean", response);
    console.log("jean", responseAverage);
    setRating(response);
    setAverageRating(responseAverage);
  };

  return (
    <NavLink
      to={link}
      className="z-0 hover:scale-105 duration-300 transition text-center flex justify-center rounded-2xl max-w-80  p-2 h-fit shadow-xl bg-[#F8F7F4]"
    >
      <div className=" flex flex-col gap-4">
        <img
          className="shadow-2xl rounded-2xl w-full h-56 bg-fit object-cover"
          src={image}
          alt=""
        />
        <p className="font-semibold uppercase h-12 ">{title}</p>
          <div className="flex flex-row justify-center font-bold text-xl items-center gap-2">
            <div className="text-yellow-500 flex flex-row gap-2 items-center">
            <FaStar  size={24} /> {rating ? `${averageRating}/5` : "0"}
            </div>
            {rating ? <span className="text-gray-500">({rating.length} avis) </span> : <span>0</span>}
          </div>
        <p className="text-2xl font-semibold">{price.toFixed(2)} €</p>
        <div className="flex items-center justify-center  w-full rounded-xl">
            <Button value="Ajouter au panier" />
        </div>
      </div>
    </NavLink>
  );
}
