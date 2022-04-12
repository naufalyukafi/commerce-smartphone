import { Box, HStack, Text, Image, Button, Input, useNumberInput } from '@chakra-ui/react'
import React, {useState} from 'react'
import { formatNumber } from '../../utils/helper'
import { ICartProduct } from '../../utils/types'

const CartProduct = ({title, storage, colour, stok, countBuy, price, image, onDelete}: ICartProduct) => {
    const [count, setCount] = useState<number>(countBuy)

    return (
        <HStack 
            bg={'white'} 
            justifyContent="space-between" 
            alignItems={'center'} 
            flexWrap="wrap"
            p={5}
            mt={6}>
            <HStack gap={3}>
                <Image objectFit={'cover'} width={200} height={200} src={image} alt={title} />
                <Text maxW={40} fontSize='md' mt={2} fontWeight="bold">{`${title} ${colour} ${storage}`}</Text>
            </HStack>
            <Box>
                <HStack gap={3}>
                    <Text fontSize='md' mt={2} fontWeight="bold">Rp.{formatNumber(price)}</Text>
                    <HStack maxW='180px' mt={2}>
                        <Button disabled={count === 0} backgroundColor={'white'} onClick={() => setCount(count - 1)}>-</Button>
                        <Box bg="white" borderRadius={2} paddingLeft={10} paddingTop={2} paddingBottom={2} paddingRight={10}>
                        <Text>{count}</Text>
                        </Box>
                        {/* <Input aria-valuemax={product?.stok} type="number" value={count} backgroundColor={'white'} /> */}
                        <Button disabled={count === stok} backgroundColor={'white'} onClick={() => setCount(count + 1)}>+</Button>
                    </HStack>
                    <Text color={"teal"} fontSize='md' mt={2} fontWeight="bold">Rp. {formatNumber(price * count)}</Text>
                </HStack>
                <Box textAlign={'right'}>
                    <Button colorScheme={'teal'} onClick={onDelete}>Hapus</Button>
                </Box>
            </Box>
            
        </HStack>
    )
}

export default CartProduct