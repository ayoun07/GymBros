import Button from "../button/Button";

interface CardProps {
    title: string;
    price: number;
    link: string;
    image: string;
}

export default function Card({title, price, link, image}: CardProps) {
  return (
    <div className="hover:scale-105 duration-300 transition text-center flex justify-center rounded-2xl max-w-80  p-2 h-fit shadow-xl bg-[#F8F7F4]">
      <div className=" flex flex-col gap-4">
        <img
          className="shadow-2xl rounded-2xl w-full h-56 bg-fit object-cover"
          src={image}
          alt=""
        />
        <p className="font-semibold uppercase h-12 ">{title}</p>
        <p className="text-2xl font-semibold">{price.toFixed(2)} €</p>
        <div className="flex justify-center">
       <Button value="ajouter au panier" link={link} />
        </div>
      </div>
    </div>
  );
}
