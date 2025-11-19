import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface dataDetailsProps {
  id: number;
  title: string;
  price: number;
  image: string[];
}

export default function NutritionDetails() {
  const [dataDetails, setDataDetails] = useState<dataDetailsProps>();
  const { id } = useParams();
  const [changeImage, setChangeImage] = useState<string>("");

  useEffect(() => {
    getProductDetails();
  }, [id]);

  const getProductDetails = async () => {
    const response = await fetch("/data.json");
    const data = await response.json();
    const product = data.find((item: any) => item.id === Number(id));
    console.log(product);
    setDataDetails(product);
  };

  console.log(id);

  return (
    dataDetails && (
      <div className="flex flex-row max-md:flex-col justify-around mb-32">
        <section>
          <div className="bg-[#e6e6e6] w-fit rounded-2xl md:p-4 p-2">
            <img
              className="w-[35em] max-md:h-80 md:h-[24em] object-cover"
              src={changeImage || dataDetails.image[0]}
              alt=""
            />
            <div className="flex flex-row max-md:grid grid-cols-2 p-2 gap-4">
              {dataDetails.image.map(
                (value: any, idx) =>
                    <div
                      className="bg-[#F8F7F4] shadow-2xl w-32 p-2 rounded-xl"
                      key={idx}
                    >
                      <img
                        onClick={() => setChangeImage(value)}
                        src={value}
                        alt=""
                        className="w-full rounded-xl h-full object-cover"
                      />
                    </div>
                  
              )}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <h1 className="text-4xl max-md:text-2xl max-md:text-center font-bold uppercase">{dataDetails.title}</h1>
          <p className="text-2xl font-semibold">{dataDetails.price} €</p>
          <div className="flex flex-col gap-2 text-xl font-semibold uppercase">
            <p>couleur :</p>
            <div className="flex flex-row justify-start gap-2">
              <div className="w-8 h-8 rounded-2xl border-3 border-transparent cursor-pointer hover:border-[#5390b3] bg-red-600"></div>
              <div className="w-8 h-8 rounded-2xl border-3 border-transparent cursor-pointer hover:border-[#5390b3] bg-green-600"></div>
              <div className="w-8 h-8 rounded-2xl border-3 border-transparent cursor-pointer hover:border-[#5390b3] bg-purple-600"></div>
            </div>
          </div>
          <p></p>
        </section>
      </div>
    )
  );
}
