import { useEffect, useState } from 'react'
import { getLimitedProducts } from '../service/ProductService';
import Card from './components/card/Card';

export default function Clothe() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);


    const getAllProducts = async () => {
        const response = await getLimitedProducts(400);
        setData(response.VETEMENT);
      }

  return (
    <div className='grid sm:grid-cols-2 place-content-center lg:grid-cols-4 md:grid-cols-3 gap-8 mb-32'>
      {
        data.map((product: any) => (
            <Card key={product.id} id={product.id} type='vetement' title={product.name} price={product.price} link={`${product.id}`} image={product.imageUrls[0]} />
        ) )
      }
    </div>
  )
}
