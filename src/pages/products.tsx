import { Box } from '@chakra-ui/react'
import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import CardProduct from '../components/cards/card-product'
import { IProduct } from '../utils/types'
import {MyContext} from '../context/APIProducts'

const Products = () => {
  const { products } = useContext(MyContext);

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