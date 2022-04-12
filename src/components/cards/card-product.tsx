import { Box, Center, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { formatNumber } from '../../utils/helper'
import { IProduct } from '../../utils/types'

const CardProduct = ({title, image, price}: IProduct) => {
  return (
    <Box cursor='pointer' mt="10" minWidth={{sm: 'full', md: 300}} borderWidth='1px' borderRadius='lg'  textAlign="center" backgroundColor='white'>
        <Center>
            <Image objectFit={'cover'} width={200} height={200} src={image} alt={title} />
        </Center>
        <Text fontSize='lg' fontWeight='bold'>{title}</Text>
        <Text fontSize='lg' color="teal" mt="2" mb="6" fontWeight='bold'>Rp. {formatNumber(price)}</Text>
    </Box>
  )
}

export default CardProduct