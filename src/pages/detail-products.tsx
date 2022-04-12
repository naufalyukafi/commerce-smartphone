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
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CardProductDetail from '../components/cards/card-product-detail'
import { APICart, APIProduct } from '../utils'
import { formatNumber } from '../utils/helper'
import { ICartProduct, IProductDetail } from '../utils/types'

const DetailProducts = () => {
  const [product, setProduct] = useState<IProductDetail>()
  const [productsCart, setProductsCart] = useState<ICartProduct []>()
  const [count, setCount] = useState<number>(0)
  const [valueStorage, setValueStorage] = useState<string>('')
  const [valueColor, setValueColor] = useState<string>('')
  const { productId } = useParams()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const getProducst = async () => {
      await fetch(`${APIProduct}products/${productId}`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setProduct(data)
      })
      .catch(err => {
        console.error(err)
      })
    }

    const getProductCarts = async () => {
      await fetch(`${APICart}carts`)
      .then(res => {
        return res.json()
      })
      .then(data => {
        setProductsCart(data)
      })
      .catch(err => {
        console.error(err)
      })
    }

    getProductCarts()

    getProducst()
  }, [])

  const onCart = () => {
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

    const findIdCart = productsCart?.find(el => el.id === product?.id)?.id
    const idproduct = product && product.id
    if(findIdCart === idproduct) {
      fetch(`${APICart}carts/${findIdCart}`, {
        method: 'PUT', // or 'POST'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveDataProduct),
      })
      .then(response => response.json())
      .then(() => {
        navigate('/cart')
        toast({
          title: 'Berhasil menambahkan ke keranjang',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      fetch(`${APICart}carts`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveDataProduct),
      })
      .then(response => response.json())
      .then(() => {
        navigate('/cart')
        toast({
          title: 'Berhasil menambahkan ke keranjang',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
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
        <Text fontWeight={'bold'} fontSize='lg'>{valueStorage === "" ? storage?.map(item => item)[0] : valueStorage}, {valueColor === "" ? colour?.map(item => item)[0] : valueColor}</Text>
        <Box height={3} />
        <Text color={'teal'} fontWeight={'bold'} fontSize='lg'>Rp. {product && formatNumber(product?.price)}</Text>
        <Box height={3} />
        <Divider />
        <Box height={3} />
        <UnorderedList>
          {
            bonus?.map((item, i) => (
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
            storage?.map((item, index) => (
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
          {colour?.map((item, index) => (
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
            <Button disabled={count === 0} backgroundColor={'white'} onClick={() => setCount(count - 1)}>-</Button>
            <Box bg="white" borderRadius={2} paddingLeft={10} paddingTop={2} paddingBottom={2} paddingRight={10}>
              <Text>{count}</Text>
            </Box>
            <Button disabled={count === product?.stok} backgroundColor={'white'} onClick={() => setCount(count + 1)}>+</Button>
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
        <Button w="full" colorScheme='teal' onClick={onCart}>Masukan Keranjang</Button>
      </Box>
    </Grid>
  )
}

export default DetailProducts