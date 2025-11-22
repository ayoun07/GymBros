import { useEffect, useState } from 'react'
import { getLimitedProducts } from '../../../service/ProductService';
import Card from '../../components/card/Card';
import type { Product } from '../../../models/ProductModel';

export default function Clothe() {
  const [data, setData] = useState([]);


  const getAllProducts = async () => {
    const response = await getLimitedProducts(400);
    setData(response.VETEMENT);
  }


  useEffect(() => {
    const fetchData = async () => {

      getAllProducts();
    };

    fetchData();
  }, []);


  return (
    <div className='pt-32 grid sm:grid-cols-2 place-content-center lg:grid-cols-4 md:grid-cols-3 gap-8 mb-32'>
      {
        data.map((product: Product) => (
          <Card key={product.id} id={product.id} favorite={product.favorite} type='vetement' title={product.name} price={product.price} link={`${product.id}`} image={product.imageUrls[0]} />
        ))
      }
    </div>
  )
}
