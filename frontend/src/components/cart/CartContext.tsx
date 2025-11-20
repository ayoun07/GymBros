import { createContext, useState, useContext, useEffect } from 'react';
import { getCart } from '../../../service/CartService';

interface CartContextType {
  cartLength: number;
  refreshCart: () => Promise<void>;
}

const defaultValue: CartContextType = {
  cartLength: 0,
  refreshCart: async () => {},
};

const CartContext = createContext<CartContextType>(defaultValue);


export function CartProvider({ children }: { children: React.ReactNode }) {

  const [cartLength, setCartLength] = useState<number>(0);

  const refreshCart = async () => {
    const res = await getCart("1");

    setCartLength(res.length);
  };

  useEffect(() => {
    firstRender()
  }, [])
  
  const firstRender = async () => {
   const res = await getCart("1");
    setCartLength(res.length);
  }

  return (
    <CartContext.Provider value={{ cartLength, refreshCart }}>
      {children}
    </CartContext.Provider>
  )

}
export const useCart = () => useContext(CartContext);
