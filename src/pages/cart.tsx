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
import React, {useState, useContext} from 'react'
import {mutate} from 'swr'
import CartProduct from '../components/cards/cart-product'
import { MyContext } from '../context/APIProducts'
import { formatNumber } from '../utils/helper'
import { API_URL } from '../utils/config'
import { ICartProduct } from '../utils/types'

const Cart = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const toast = useToast()
    const { carts } = useContext(MyContext)

    const handleDelete = (id: number) => {
    let conf = window.confirm('Apakah anda yakin ingin menghapus product ini?')
    if(conf === true) {
        mutate(`carts/${id}`, (post: ICartProduct[]) => [id, ...post], false)
        fetch(`${API_URL}carts/${id}`, {
            method: 'DELETE'
            })
            .then(() => {
            toast({
                title: 'Product Berhasil Dihapus',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            mutate('http://localhost:3000/carts')
        })
    }
    
    }

    const total = (data: any) => data && data.reduce((saldoAwal: number, saldoAkhir: number) => saldoAwal + saldoAkhir, 0);
    const sumBuy = carts?.map(item => item.countBuy * item.price)
    const confirmBuy = () => setVisible(true)
    
    return (
        <Box>
            {
                carts && carts.length === 0 ? (
                    <>
                        <Box minHeight={'50vh'} textAlign="center" justifyContent={'center'} alignItems="center" alignContent={'center'} display="flex">
                            <Box>
                                <Heading color="teal" as='h3' size="lg" fontWeight={'bold'} className='text-center fw-bold'>Mohon Maaf Keranjang Belum Terisi!</Heading>
                                <Text mt={5} className='text-center'>Tambahkan product terlebih dahulu</Text>
                            </Box>
                        </Box>
                    </>
                ): 
                carts && carts.map(el => (
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
            {carts?.length !== 0 && <Button colorScheme={'teal'} width="full" onClick={confirmBuy}>Konfirmasi</Button>}
            
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
                                carts?.map((item, i) => (
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