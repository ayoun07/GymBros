import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { findProductByName } from "../../../service/ProductService";
import type { Product } from "../../../models/ProductModel";

export default function Search() {
  const [productByName, setProductByName] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    setSelectedIndex(0);
  }, [productByName]);

  const getProductName = async (value: string) => {
    if (value && value.trim() !== "") {
      setIsSearching(true);
      try {
        const response = await findProductByName(value);
        setProductByName(response || []);
        setHasSearched(true);
      } catch (error) {
        console.error("Erreur de recherche:", error);
        setProductByName([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setProductByName([]);
      setHasSearched(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setHasSearched(false);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (value !== "") {
        getProductName(value);
      } else {
        setProductByName([]);
        setHasSearched(false);
      }
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (productByName.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < productByName.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;

      case "Enter":
        e.preventDefault();
        if (productByName[selectedIndex]) {
          const product = productByName[selectedIndex];
          navigate(`/${product.type.toLowerCase()}/${product.id}`);
          setProductByName([]);
          setSearchValue("");
          setHasSearched(false);
        }
        break;

      case "Escape":
        setProductByName([]);
        setSearchValue("");
        setHasSearched(false);
        break;
    }
  };

  const handleProductClick = () => {
    setProductByName([]);
    setSearchValue("");
    setHasSearched(false);
  };

  // détermine si les résultats sont des suggestions
  const areSuggestions = hasSearched && productByName.length > 0 &&
    !productByName.some((p) =>
      p.name.toLowerCase().includes(searchValue.toLowerCase())
    );


  return (
    <div className="flex flex-col relative">
      <input
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="rechercher un produit..."
        className="p-4 min-w-86 bg-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#63acd6] transition"
      />
      {isSearching && (
        <div className="absolute top-16 w-full bg-white rounded-2xl shadow-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#63acd6]">
            </div>
            <span className="text-gray-600">
              Recherche en cours...
            </span>
          </div>
        </div>
      )}
      {!isSearching && hasSearched && productByName.length > 0 && (
        <div className="absolute top-16 w-full bg-white rounded-2xl shadow-lg max-h-96 overflow-hidden">
          {/* Message d'information si ce sont des suggestions */}
          {areSuggestions && (
            <div className="bg-blue-50 border-b border-blue-200 p-3 flex items-start gap-2">
              <IoIosInformationCircleOutline className="text-blue-500 text-xl shrink-0 mt-0.5" />
              <div className="text-sm text-blue-700">
                <p className="font-semibold">Produit non trouvé</p>
                <p className="text-blue-600">
                  Voici des suggestions similaires :
                </p>
              </div>
            </div>
          )}
          <div className="overflow-y-auto max-h-80">
            {productByName.map((value, index) => (
              <NavLink
                to={`/${value.type.toLowerCase()}/${value.id}`}
                onClick={() => handleProductClick()}
                key={value.id}
                className={`block ${index === selectedIndex
                  ? "bg-[#63acd6] text-white"
                  : "hover:bg-gray-100"
                  } transition duration-150`}
              >
                <div className="flex flex-row justify-between items-center p-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex flex-col items-start">
                    <p className="font-medium">{value.name}</p>
                    <span
                      className={`text-xs ${index === selectedIndex
                        ? "text-white/80"
                        : "text-gray-500"
                        }`}
                    >
                      {value.type.toLowerCase()}
                    </span>
                  </div>
                  <p className="font-semibold">{value.price}€</p>
                </div>
              </NavLink>
            ))}
          </div>
          <div className="bg-gray-50 px-3 py-2 text-xs text-gray-500 border-t border-gray-200">
            Utilisez ↑↓ pour naviguer, Entrée pour sélectionner
          </div>
        </div>
      )}
      {!isSearching && hasSearched && searchValue &&
        productByName.length === 0 && (
          <div className="absolute top-16 w-full bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-start gap-3">
              <IoIosInformationCircleOutline className="text-orange-500 text-2xl shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-gray-800 mb-1">
                  Aucun produit trouvé pour "{searchValue}"
                </p>
                <p className="text-gray-600 mb-2">
                  Essayez de :
                </p>
                <ul className="text-gray-600 space-y-1 list-disc list-inside">
                  <li>Vérifier l'orthographe</li>
                  <li>Utiliser des mots-clés plus généraux</li>
                  <li>Parcourir nos catégories</li>
                </ul>
                <div className="flex gap-2 mt-3">
                  <NavLink
                    to="/nutrition"
                    onClick={() => {
                      setSearchValue("");
                      setHasSearched(false);
                    }}
                    className="px-3 py-1.5 bg-[#63acd6] text-white text-xs rounded-lg hover:bg-[#5299c4] transition"
                  >
                    Nutrition
                  </NavLink>
                  <NavLink
                    to="/vetement"
                    onClick={() => {
                      setSearchValue("");
                      setHasSearched(false);
                    }}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded-lg hover:bg-gray-300 transition"
                  >
                    Vêtements
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
