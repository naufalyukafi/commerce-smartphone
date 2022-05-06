
import React, { createContext } from 'react'

import { useRequest } from '../hooks/useRequest'
import { IContext, IContextValue } from '../utils/types'

export const MyContext = createContext<IContextValue>({
    products: [], carts: []
});

const APIProducts = (props: IContext) => {
    const { data: products } = useRequest('products')
    const { data: carts } = useRequest('carts')

    const contextValue: IContextValue = {
        products, carts
    }

    return (
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    )
}

export default APIProducts