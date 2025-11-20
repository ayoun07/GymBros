import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";
import { getLimitedProducts } from "../../../service/ProductService";

function Home() {
  const [dataNutrition, setDataNutrtion] = useState([]);
  const [dataVetement, setDataVetement] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const response = await getLimitedProducts(4);
    setDataNutrtion(response.NUTRITION);
    setDataVetement(response.VETEMENT);
  }


  return (
    <div className="flex flex-col pt-32">
      <section className="flex max-md:flex-col max-sm:gap-6 justify-between mb-16">
        <div className="flex flex-col justify-center gap-6 max-w-4xl">
          <h1 className="text-6xl font-bold uppercase ">Gymbros</h1>
          <h1 className="text-4xl font-bold uppercase bg-linear-to-r inline-block text-transparent from-[#4a81a1] to-[#8dd5ff] bg-clip-text">
            Pour les amoureux du sport !
          </h1>
          <p className="text-justify w-[95%] font-semibold">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            perspiciatis, similique voluptatum incidunt in soluta ea
            necessitatibus voluptates illum libero modi, eveniet maiores natus,
            eius itaque magnam voluptate neque cum! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ipsam, quia! Nulla, libero unde sunt
            doloribus molestiae eaque non consectetur tenetur quae mollitia amet
            cum reiciendis distinctio totam eveniet et velit.
          </p>
        </div>
        <div className=" rounded-2xl self-center w-full h-fit shadow-2xl">
          <img
            className="rounded-2xl md:min-w-96 w-fit h-full bg-gray-200"
            src="https://img.freepik.com/psd-premium/maquette-halteres-enduite-vinyle-vue-droite-gros-plan_1332-982.jpg?w=1480"
            alt=""
          />
        </div>
      </section>
      <section className="flex flex-col mb-16">
        <h2 className="text-3xl font-medium pl-4">Nutrition </h2>
        <div className="rounded-2xl p-4 h-fit ">
          <div className="grid sm:grid-cols-2 place-content-center lg:grid-cols-4 md:grid-cols-3 gap-8 mb-8">
            {
              dataNutrition.map((product: any) => (
                <Card type="nutrition" key={product.id} favorite={product.favorite} id={product.id} title={product.name} price={product.price} link={`/nutrition/${product.id}`} image={product.imageUrls[0]}/>
              ))
            }
          </div>
          <div className="flex justify-center">
           <Button text="voir plus" value="" link="/nutrition" />
          </div>
        </div>
      </section>
      <section className="flex flex-col mb-16">
        <h2 className="text-3xl font-medium pl-4">Nutrition </h2>
        <div className="rounded-2xl p-4 h-fit ">
          <div className="grid sm:grid-cols-2 place-content-center lg:grid-cols-4 md:grid-cols-3 gap-8 mb-8">
            {
              dataVetement.map((product: any) => (
                < Card type="vetement" key={product.id} id={product.id} favorite={product.favorite} title={product.name} price={product.price} link={`/nutrition/${product.id}`} image={product.imageUrls[0]}/>
              ))
            }
          </div>
          <div className="flex justify-center">
           <Button text="voir plus" value="" link="/nutrition" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
