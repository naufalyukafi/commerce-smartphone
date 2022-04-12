import { Box } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import CardProduct from '../components/cards/card-product'
import { APIProduct } from '../utils'
import { IProduct } from '../utils/types'

const Products = () => {
  const [products, setProducts] = useState<IProduct []>()
  useEffect(() => {
    const getProducst = async () => {
      await fetch(`${APIProduct}products`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setProducts(data)
      })
      .catch(err => {
        console.error(err)
      })
    }
    getProducst()
  }, [])

  // if(loading) return "Loading...."

  return (
    <Box display={'flex'} justifyContent="space-between" flexWrap="wrap">
      {
        products?.map((item: IProduct) => (
          <Link to={`/products/${item.id}`}>
            <CardProduct 
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
            />
          </Link>
        ))
      }
    </Box>
  )
}

export default Products