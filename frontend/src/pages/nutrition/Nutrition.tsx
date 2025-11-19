import  { useEffect, useState } from 'react'
import Card from '../../components/card/Card';

export default function Nutrition() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);


    const getProducts = async () => {
        const response = await fetch('/data.json');
        const data = await response.json();
        setData(data);
        console.log(data);
    }

  return (
    <div className='grid sm:grid-cols-2 place-content-center lg:grid-cols-4 md:grid-cols-3 gap-8 mb-32'>
      {
        data.map((product: any) => (
            <Card key={product.id} title={product.title} price={product.price} link={`/nutrition/${product.id}`} image={product.image} />
        ) )
      }
    </div>
  )
}
