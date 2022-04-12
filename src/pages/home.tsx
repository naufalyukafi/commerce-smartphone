import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Link to="/products">
        <Box cursor={"pointer"}>
            <Image src="https://images.tokopedia.net/img/cache/1208/NsjrJu/2022/4/11/b5370398-ff06-41d9-9488-40e515e36647.jpg.webp?ect=3g"/>
        </Box>
    </Link>
  )
}

export default Home