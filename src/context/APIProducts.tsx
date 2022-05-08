
import React, { createContext, useReducer } from 'react'

import { useRequest } from '../hooks/useRequest'
import { initialValue, reducer } from '../reducer/countProduct';
import { IContext, IContextValue } from '../utils/types'

export const MyContext = createContext<IContextValue>({
    products: [], carts: [], count: 0, dispatch: () => {}
});

const APIProducts = (props: IContext) => {
    const { data: products } = useRequest('products')
    const { data: carts } = useRequest('carts')
    const [count, dispatch] = useReducer(reducer, initialValue)
    
    const contextValue: IContextValue = {
        products, carts, count, dispatch
    }

    return (
        <MyContext.Provider value={contextValue}>
            {props.children}
        </MyContext.Provider>
    )
}

export default APIProducts