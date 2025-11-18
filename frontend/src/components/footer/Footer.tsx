import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTikTok,
  AiFillYoutube,
} from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="min-h-[410px] text-white flex gap-y-8 max-md:py-8 max-md:items-center max-md:flex-col flex-row justify-between px-8 w-full bg-[#234152]">
      <section className="flex flex-col justify-center  gap-16 h-[356px] md:max-w-[356px] w-full">
        <div className="flex flex-col justify-start max-md:items-center w-full gap-2">
          <label
            htmlFor="newsletter"
            className="font-semibold  uppercase underline ml-2"
          >
            S'abonner a la newsletter :{" "}
          </label>
          <input
            name="newsletter"
            type="text"
            placeholder="email@exemple.com"
            className="p-4 max-w-86 w-full  bg-gray-500  rounded-2xl outline-none"
          />
        </div>
        <div className="w-full flex flex-col max-md:items-center justify-center ">
          <h5 className="font-semibold uppercase underline ml-2">
            nos réseaux :
          </h5>
          <div className="flex flex-row justify-start gap-2">
            <AiFillInstagram className="size-8 hover:text-[#63acd6] transition duration-150" />
            <AiFillLinkedin className="size-8 hover:text-[#63acd6] transition duration-150" />
            <AiFillTikTok className="size-8 hover:text-[#63acd6] transition duration-150" />
            <AiFillYoutube className="size-8 hover:text-[#63acd6] transition duration-150" />
          </div>
        </div>
      </section>
      <section className="max-w-[832px] w-full flex flex-rows max-md:flex-col gap-4 pt-18 max-md:items-center max-md:gap-16 justify-around p-4">
        <div className="text-center  min-w-32 max-w-64 w-full flex flex-col justify-start gap-2 items-center py-2">
          <h4 className="font-bold">Aide et Informations</h4>
          <p>Services client</p>
          <p>Contactez-nous</p>
          <p>Aide</p>
          <p>Retours</p>
          <p>Livraison Internationale</p>
          <p>Suivi de commande</p>
          <p>Livraison</p>
          <p>Avis de rappel de produit</p>
        </div>
        <div className="text-center min-w-32 max-w-64 w-full flex flex-col justify-start gap-2 items-center py-2">
          <h4 className="font-bold">Produits</h4>
          <p>À propos</p>
          <p>Preuve de Qualité</p>
          <p>Déclaration sur l'esclavage morderne</p>
          <p>Politique de Confidentialité</p>
          <p>Termes & Conditions</p>
        </div>
        <div className="text-center min-w-32 max-w-64 w-full flex flex-col justify-start gap-2 items-center py-2">
          <h4 className="font-bold">Produits</h4>
          <p>Services client</p>
          <p>Contactez-nous</p>
          <p>Aide</p>
          <p>Retours</p>
          <p>Livraison Internationale</p>
          <p>Suivi de commande</p>
          <p>Livraison</p>
          <p>Avis de rappel de produit</p>
        </div>
      </section>
    </footer>
  );
}
