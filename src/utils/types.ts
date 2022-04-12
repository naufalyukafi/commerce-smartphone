interface IProduct {
    id: number,
    title: string,
    image: string,
    price: number
}

interface IProductDetail {
    id: number,
    title: string,
    img: string,
    price: number,
    bonus: string,
    storage: string,
    colour: string,
    image: string,
    image_detail: string,
    stok: number
}

interface ICartProduct {
    id: number,
    title: string,
    storage: string,
    colour: string,
    stok: number,
    countBuy: number,
    price: number,
    image: string,
    onDelete: () => void,
}

export type {
    IProduct,
    IProductDetail,
    ICartProduct
}