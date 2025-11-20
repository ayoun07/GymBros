import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../service/ProductService";
import Button from "../../components/button/Button";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { addToCart} from "../../../service/CartService.ts";

interface dataDetailsProps {
  id: number;
  name: string;
  price: number;
  imageUrls: string[];
  stock: number;
  description: string;
}

export default function NutritionDetails() {
  const [dataDetails, setDataDetails] = useState<dataDetailsProps>();
  const { id } = useParams();
  const [changeImage, setChangeImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const getProductDetails = async () => {
    const response = await getProductById(id as string);
    setDataDetails(response);
  };

  const addCart = async () => {
    const response = await addToCart("1", dataDetails?.id.toString() as string);

    console.log(response);
  }

  return (
    dataDetails && (
      <div className="flex flex-col gap-16 mb-32">

        <div className="flex flex-row max-md:flex-col max-md:align-middle max-md:justify-center w-full justify-center gap-16">
          <section>
            <div className="max-w-140 bg-[#e6e6e6] md:max-w-[35em] md:min-w-[20em] h-full max-sm:w-full max-md:mx-auto max-md:w-2/3 rounded-2xl md:p-4 p-2">
              <p>{dataDetails.description}</p>
            </div>
          </section>
          <section className="flex max-md:text-center flex-col gap-8">
            <div className="max-w-140 bg-[#e6e6e6] md:max-w-[35em] md:min-w-[20em] max-sm:w-full max-md:mx-auto max-md:w-2/3 rounded-2xl md:p-4 p-2">
              <img
                className="w-full max-md:h-80 md:h-[32em] object-cover"
                src={dataDetails.imageUrls[1]}
                alt=""
              />
            
            </div>
          </section>
        </div>

        <div className="flex flex-row max-md:flex-col max-md:align-middle max-md:justify-center w-full justify-center gap-16">
          <section>
            <div className="max-w-140 bg-[#e6e6e6] md:max-w-[35em] md:min-w-[20em] max-sm:w-full max-md:mx-auto max-md:w-2/3 rounded-2xl md:p-4 p-2">
              <img
                className="w-full max-md:h-80 md:h-[24em] object-cover"
                src={changeImage || dataDetails.imageUrls[0]}
                alt=""
              />
              <div className="flex flex-row w-full max-md:grid max-md:grid-cols-3 p-2 gap-4">
                {dataDetails.imageUrls.map((value: any, idx) => (
                  <div
                    className="bg-[#F8F7F4] shadow-2xl sm:min-w-24 max-sm: max-w-32 p-2 rounded-xl"
                    key={idx}
                  >
                    <img
                      onClick={() => setChangeImage(value)}
                      src={value}
                      alt=""
                      className="w-full rounded-xl h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex   max-md:text-center justify-between flex-col gap-8">
            <div className="flex max-w-140 flex-col justify-start gap-y-4 h-full">
              <h1 className="text-4xl  max-lg:text3xl max-md:text-2xl max-md:text-center font-bold uppercase">
                {dataDetails.name}
              </h1>
                <div className="flex flex-col gap-2 text-xl font-semibold uppercase">
                <p>prix :</p>
                <div className="flex flex-row justify-start max-md:justify-center gap-2">
              <p className="text-2xl font-semibold">
                {dataDetails.price.toFixed(2)} €
              </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xl font-semibold uppercase">
                <p>couleur :</p>
                <div className="flex flex-row justify-start max-md:justify-center gap-2">
                  <div className="w-8 h-8 rounded-2xl border-3 border-transparent cursor-pointer hover:border-[#5390b3] bg-red-600"></div>
                  <div className="w-8 h-8 rounded-2xl border-3 border-transparent cursor-pointer hover:border-[#5390b3] bg-green-600"></div>
                  <div className="w-8 h-8 rounded-2xl border-3 border-transparent cursor-pointer hover:border-[#5390b3] bg-purple-600"></div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-xl font-semibold uppercase">
                <p>stock :</p>
                <div className="flex flex-row justify-start max-md:justify-center gap-2">
                  <p>{dataDetails.stock}</p>
                </div>
              </div>
              <div className="flex max-md:items-center flex-col gap-2 text-xl font-semibold uppercase">
                <p>quantité :</p>
                <div className="flex flex-row bg-gray-200 p-2 w-fit rounded-2xl justify-start items-center max-md:justify-center gap-2">
                  <FaArrowAltCircleLeft className={ quantity <= 1 ? "text-gray-400" : "text-black" } onClick={() => quantity > 1 && setQuantity(quantity - 1)}/>
                  <p className="w-16 text-center">{quantity}</p>
                  <FaArrowAltCircleRight className={ quantity >= dataDetails.stock ? "text-gray-400" : "text-black" } onClick={() => quantity < 20 && setQuantity(quantity + 1)}/>
                </div>
              </div>
            </div>
            <button onClick={() => addCart()} className="hover:bg-[#63acd6] cursor-pointer text-white p-4 font-semibold uppercase rounded-2xl w-full bg-[#5390b3] ">
              ajouter au panier
            </button>
          </section>
        </div>
      </div>
    )
  );
}
