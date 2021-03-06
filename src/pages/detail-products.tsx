import { 
  Box, 
  Grid, 
  Center, 
  Image, 
  Heading, 
  Text, 
  Divider,
  UnorderedList, 
  ListItem,
  HStack,
  Button,
  useToast} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {mutate} from 'swr'
import CardProductDetail from '../components/cards/card-product-detail'
import ModalAddCart from '../components/modal-add-cart'
import { MyContext } from '../context/APIProducts'
import { useRequest } from '../hooks/useRequest'
import { API_URL } from '../utils/config'
import { formatNumber } from '../utils/helper'
import { ICartProduct } from '../utils/types'

const DetailProducts = () => {
  const {count, dispatch} = useContext(MyContext)
  const [visible, setVisible] = useState<boolean>(false)
  const [valueStorage, setValueStorage] = useState<string>('')
  const [valueColor, setValueColor] = useState<string>('')
  const { productId } = useParams()
  const toast = useToast()
  const navigate = useNavigate()
  const { carts } = useContext(MyContext)
  const { data: product } = useRequest('products', productId)

  const findDataCartById = carts?.find(element => element?.id === product?.id)

  const onCart = (type: string) => {
    const saveDataProduct = {
      id: product?.id,
      title: product?.title,
      storage: valueStorage,
      colour: valueColor,
      stok: product?.stok,
      countBuy: count,
      price: product?.price,
      image: product?.image_detail
    }

    const findIdCart = carts?.find(el => el.id === product?.id)?.id
    const idproduct = product && product.id
    if(findIdCart === idproduct) {
      mutate("carts", (post: ICartProduct[]) => [...post, saveDataProduct], false)
      fetch(`${API_URL}carts/${findIdCart}`, {
        method: 'PUT', // or 'POST'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveDataProduct),
      })
      .then(response => response.json())
      .then(() => {
        if(type === 'detailCart') {
          navigate('/cart-detail')
          toast({
            title: 'Berhasil menambahkan ke keranjang',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        }
        else setVisible(true)
        mutate(`${API_URL}carts`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      mutate("carts", (post: ICartProduct[]) => [saveDataProduct, ...post], false)
      fetch(`${API_URL}carts`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveDataProduct),
      })
      .then(response => response.json())
      .then(() => {
        if(type === 'detailCart') {
          navigate('/cart-detail')
          toast({
            title: 'Berhasil menambahkan ke keranjang',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
        } 
        else setVisible(true)
        mutate(`${API_URL}carts`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

  }
  
  const storage = product?.storage.split('|')
  const bonus = product?.bonus.split('|')
  const colour = product?.colour.split('|')

  const onStorage = (data: string) => setValueStorage(data)
  const onColour = (data: string) => setValueColor(data)

  return (
    <Grid templateColumns={{sm: 'repeat(1)', md: 'repeat(2, 1fr)'}} mt={5}>
      <Box w='100%' minH={'100vh'} display="flex" justifyContent={'center'} alignContent="center">
        <Center>
          <Image src={product?.image_detail} alt='phone' />
        </Center>
      </Box>
      <Box w='100%' minH={'100vh'} p={10}>
        <Heading as='h3' size='lg' isTruncated>
          {product?.title}
        </Heading>
        <Box height={3} />
        <Text fontWeight={'bold'} fontSize='lg'>{valueStorage === "" ? storage?.map((item: string)=> item)[0] : valueStorage}, {valueColor === "" ? colour?.map((item: string) => item)[0] : valueColor}</Text>
        <Box height={3} />
        <Text color={'teal'} fontWeight={'bold'} fontSize='lg'>Rp. {product && formatNumber(product?.price)}</Text>
        <Box height={3} />
        <Divider />
        <Box height={3} />
        <UnorderedList>
          {
            bonus?.map((item: string, i: number) => (
              <ListItem key={i}>{item}</ListItem>
            ))
          }
        </UnorderedList>
        <Box height={3} />
        <Heading as='h4' size='md' isTruncated>
          Storage
        </Heading>
        <Box height={3} />
        <Box display={'flex'} alignItems="center" gap={5}>
          {
            storage?.map((item: string, index: number) => (
              <CardProductDetail value={item} valueSelected={valueStorage} handleClick={() => onStorage(item)} key={index}>
                <Text color={'teal'} fontWeight={'bold'} fontSize='md'>{item}</Text>
              </CardProductDetail>
            ))
          }
        </Box>
        <Box height={3} />
        <Heading as='h4' size='md' isTruncated>
          Colour
        </Heading>
        <Box height={3} />
        <Box display={'flex'} alignItems="center" gap={5}>
          {colour?.map((item: string, index: number) => (
            <CardProductDetail key={index} value={item} valueSelected={valueColor} handleClick={() => onColour(item)}>
              <Text color={'teal'} fontWeight={'bold'} fontSize='md'>{item}</Text>
            </CardProductDetail>
          ))}
        </Box>
        <Box height={3} />
        <Heading as='h4' size='md' isTruncated>
          Jumlah
        </Heading>
        <Box display={'flex'} alignItems="center" gap={5}>
          <Text fontSize='md' mt={2}>Stok : {product?.stok}</Text>
          <HStack maxW='180px' mt={2}>
            <Button disabled={count === 0} backgroundColor={'white'} onClick={() => dispatch({type: 'decrement'})}>-</Button>
            <Box bg="white" borderRadius={2} paddingLeft={10} paddingTop={2} paddingBottom={2} paddingRight={10}>
              <Text>{count}</Text>
            </Box>
            <Button disabled={count === product?.stok} backgroundColor={'white'} onClick={() => dispatch({type: 'increment'})}>+</Button>
          </HStack>
        </Box>
        <Box height={3} />
        <Box
          minH={100}
          bg="white"
        >
            <Box height={3} />
            <Heading textAlign={'center'} as='h4' size='md' isTruncated>
              {product?.title}
            </Heading>
            <Box height={5} />
            <HStack p={5} alignItems="center" justifyContent={'space-around'}>
              <Text fontWeight={'bold'} fontSize='md'>Total: </Text>
              <Heading color={'teal'} textAlign={'center'} as='h4' size='md' isTruncated>
                Rp. {product && formatNumber(product?.price * count)}
              </Heading>
            </HStack>
        </Box>
        <Box height={3} />
        <HStack>
          <Button disabled={count === 0} w="full" colorScheme='teal' onClick={() => onCart('cart')}>Masukan Keranjang</Button>
          <Button disabled={count === 0} w="full" colorScheme='teal' onClick={() => onCart('detailCart')}>Bayar Langsung</Button>
        </HStack>
      </Box>
      <ModalAddCart isOpen={visible} isClose={() => setVisible(prev => !prev)}>
        <HStack 
          bg={'white'} 
          justifyContent="space-between" 
          alignItems={'center'} 
          flexWrap="wrap"
          p={5}
          mt={6}
        > 
        <HStack gap={3}>
          <Image objectFit={'cover'} width={20} height={20} src={findDataCartById?.image} alt={findDataCartById?.title} />
          <Text maxW={40} fontSize='md' mt={2} fontWeight="bold">{`${findDataCartById?.title} ${findDataCartById?.colour} ${findDataCartById?.storage}`}</Text>
        </HStack>
        <Box>
          <Button colorScheme={'teal'} textAlign='right'>Bayar Sekarang</Button>
        </Box>
        </HStack>
      </ModalAddCart>
    </Grid>
  )
}

export default DetailProducts