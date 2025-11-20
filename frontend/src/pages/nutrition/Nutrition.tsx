import  { useEffect, useState } from 'react'
import Card from '../../components/card/Card';
import { getLimitedProducts } from '../../../service/ProductService';

export default function Nutrition() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);


    const getAllProducts = async () => {
        const response = await getLimitedProducts(400);
        console.log(response.NUTRITION);
        setData(response.NUTRITION);
      }

  return (
    <div className='grid sm:grid-cols-2 place-content-center lg:grid-cols-4 md:grid-cols-3 gap-8 mb-32'>
      {
        data.map((product: any) => (
            <Card key={product.id} title={product.name} price={product.price} link={`/nutrition/${product.id}`} image={product.imageUrls[0]} />
        ) )
      }
    </div>
  )
}
