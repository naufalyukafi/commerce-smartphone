import { 
    Box, 
    Button, 
    Heading, 
    Text, 
    useToast,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer
} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import CartProduct from '../components/cards/cart-product'
import { APICart } from '../utils'
import { ICartProduct } from '../utils/types'
import { formatNumber } from '../utils/helper'

const Cart = () => {
    const [products, setProducts] = useState<ICartProduct []>()
    const [visible, setVisible] = useState<boolean>(false)
    const toast = useToast()
    const getProducts = async () => {
        await fetch(`${APICart}carts`)
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

    useEffect(() => {    
        getProducts()
      }, [])

    const handleDelete = (id: number) => {
    let conf = window.confirm('Apakah anda yakin ingin menghapus product ini?')
    if(conf === true) {
        fetch(`${APICart}carts/${id}`, {
            method: 'DELETE'
            })
            .then(() => {
            toast({
                title: 'Product Berhasil Dihapus',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            getProducts()
            })
    }
    
    }

    const total = (data: any) => data && data.reduce((saldoAwal: number, saldoAkhir: number) => saldoAwal + saldoAkhir, 0);
    const sumBuy = products?.map(item => item.countBuy * item.price)
    const confirmBuy = () => setVisible(true)
    
    return (
        <Box>
            {
                products && products.length === 0 ? (
                    <>
                        <Box minHeight={'50vh'} textAlign="center" justifyContent={'center'} alignItems="center" alignContent={'center'} display="flex">
                            <Box>
                                <Heading color="teal" as='h3' size="lg" fontWeight={'bold'} className='text-center fw-bold'>Mohon Maaf Keranjang Belum Terisi!</Heading>
                                <Text mt={5} className='text-center'>Tambahkan product terlebih dahul</Text>
                            </Box>
                        </Box>
                    </>
                ): 
                products && products.map((el, index) => (
                    <CartProduct 
                        colour={el?.colour}
                        countBuy={el?.countBuy}
                        id={el?.id}
                        image={el?.image}
                        price={el?.price}
                        stok={el?.stok}
                        storage={el?.storage}
                        title={el?.title}
                        key={el?.id}
                        onDelete={() => handleDelete(el.id)}               
                    />
                ))
            }
            <Box height={6} />
            {products?.length !== 0 && <Button colorScheme={'teal'} width="full" onClick={confirmBuy}>Konfirmasi</Button>}
            
            <Drawer
                isOpen={visible}
                placement='right'
                onClose={() => setVisible(false)}
                size={'lg'}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Konfirmasi Pembelian</DrawerHeader>

                <DrawerBody>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Nama</Th>
                            <Th>Harga</Th>
                            <Th>QTY</Th>
                            <Th isNumeric>Sub Total</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {
                                products?.map((item, i) => (
                                    <Tr>
                                        <Td>{item.title}</Td>
                                        <Td>Rp. {formatNumber(item.price)}</Td>
                                        <Td isNumeric>{item.countBuy}</Td>
                                        <Td isNumeric>Rp. {formatNumber(item.price * item.countBuy)}</Td>
                                    </Tr>
                                ))
                            }
                       
                      
                        </Tbody>
                        <Tfoot>
                        <Tr>
                            <Th></Th>
                            <Th></Th>
                            <Th textAlign={'right'}>Total : </Th>
                            <Th isNumeric>Rp. {formatNumber(total(sumBuy))}</Th>
                        </Tr>
                        </Tfoot>
                    </Table>
                    </TableContainer>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={() => setVisible(false)}>
                    Cancel
                    </Button>
                    <Button colorScheme='blue'>Bayar</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Cart