import { createContext, useState, useEffect } from 'react';
import { getCart } from '../../../service/CartService';

interface CartContextType {
  cartLength: number;
  refreshCart: () => Promise<void>;
}

const defaultValue: CartContextType = {
  cartLength: 0,
  refreshCart: async () => { },
};

const CartContext = createContext<CartContextType>(defaultValue);

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [cartLength, setCartLength] = useState<number>(0);

  const refreshCart = async () => {
    const res = await getCart("1");
    setCartLength(res.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCart("1");
      setCartLength(res.length);
    };
    fetchData();
  }, []);

  return (
    <CartContext.Provider value={{ cartLength, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
