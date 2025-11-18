import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch("/data.json");

    const data = await response.json();
    console.log(data);
    setData(data);
  }
  return (
    <div className="flex flex-col">
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
            className="rounded-2xl md:min-w-96 w-fit h-full bg-blue-200"
            src="https://img.freepik.com/psd-premium/maquette-halteres-enduite-vinyle-vue-droite-gros-plan_1332-982.jpg?w=1480"
            alt=""
          />
        </div>
      </section>
      <section className="gap-4 flex flex-col mb-16">
        <h2 className="text-3xl font-medium">Nutrition </h2>
        <div className="rounded-2xl p-4 h-fit shadow-xl bg-[#f8f7f4]">
          <div className="grid sm:grid-cols-2 place-content-center lg:grid-cols-4 md:grid-cols-3 gap-8 mb-8">
            {
              data.map((product: any) => (
                <Card key={product.id} title={product.title} price={product.price} link={"/"} image={product.image}/>
              ))
            }
          </div>
          <div className="flex justify-center">
           <Button value="voir plus" link="/" />
          </div>
        </div>
      </section>
      <section className="gap-4 flex flex-col mb-16">
        <h2 className="text-3xl font-medium">Vêtement </h2>
        <div className="rounded-2xl p-4 h-fit shadow-xl bg-[#f8f7f4]">
          <div className="grid sm:grid-cols-2 place-content-center lg:grid-cols-4 md:grid-cols-3 gap-8 mb-8">
            <div className="rounded-2xl max-w-80  p-2 h-fit shadow-xl bg-[#F8F7F4]">
              <div className="text-center flex flex-col gap-4">
                <img
                  className="shadow-2xl rounded-2xl w-full h-56 object-cover"
                  src="https://img.freepik.com/photos-premium/jeune-homme-elegant-capuche-noire-posant-dans-espace-urbain-moderne_1179475-57083.jpg?w=2000"
                  alt=""
                />
                <p className="font-semibold uppercase h-12 ">
                  Ensemble survêtement noir de sport - Homme
                </p>
                <p className="text-2xl font-semibold">39.99€</p>
                <NavLink
                  className="bg-[#5390b3] rounded-2xl text-white w-full px-2 py-4 uppercase font-medium"
                  to={"/"}
                >
                  ajouter au panier
                </NavLink>
              </div>
            </div>
            <div className="rounded-2xl max-w-80  p-2 h-fit shadow-xl bg-[#F8F7F4]">
              <div className="text-center flex flex-col gap-4">
                <img
                  className="shadow-2xl rounded-2xl w-full h-56 bg-fit object-cover"
                  src="https://img.freepik.com/photos-premium/jeune-homme-elegant-capuche-grise-posant-plein-air-dans-cadre-urbain_1179475-55824.jpg?w=2000"
                  alt=""
                />
                <p className="font-semibold uppercase h-12 ">
                  Sweat gris a capuches - Homme
                </p>
                <p className="text-2xl font-semibold">25.99€</p>
                <NavLink
                  className="bg-[#5390b3] rounded-2xl text-white w-full px-2 py-4 uppercase font-medium"
                  to={"/"}
                >
                  ajouter au panier
                </NavLink>
              </div>
            </div>
            <div className="rounded-2xl max-w-80  p-2 h-fit shadow-xl bg-[#F8F7F4]">
              <div className="text-center flex flex-col gap-4">
                <img
                  className="shadow-2xl rounded-2xl w-full h-56 bg-fit object-cover"
                  src="https://img.freepik.com/photos-premium/femme-portant-crop-top-blanc-jupe-blanche-chemise-blanche_999340-95898.jpg?w=1480"
                  alt=""
                />
                <p className="font-semibold uppercase h-12 ">
                  Pantalon jogging - Femme
                </p>
                <p className="text-2xl font-semibold">12.99€</p>
                <NavLink
                  className="bg-[#5390b3] rounded-2xl text-white w-full px-2 py-4 uppercase font-medium"
                  to={"/"}
                >
                  ajouter au panier
                </NavLink>
              </div>
            </div>
            <div className="rounded-2xl max-w-80  p-2 h-fit shadow-xl bg-[#F8F7F4]">
              <div className="text-center flex flex-col gap-4">
                <img
                  className="shadow-2xl rounded-2xl w-full h-56 bg-fit object-cover"
                  src="https://img.freepik.com/photos-premium/jambes-masculines-leggings-baskets-noires-fond-gris_985688-11041.jpg?w=1480"
                  alt=""
                />
                <p className="font-semibold uppercase h-12 ">
                  Pantalon de survêtement noir - Homme
                </p>
                <p className="text-2xl font-semibold">15.99€</p>
                <NavLink
                  className="bg-[#5390b3] rounded-2xl text-white w-full px-2 py-4 uppercase font-medium"
                  to={"/"}
                >
                  ajouter au panier
                </NavLink>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-[#5390b3] rounded-2xl text-white max-w-64 w-full px-2 py-4 uppercase font-medium">
              Voir plus
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
