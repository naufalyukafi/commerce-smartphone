import { Box } from '@chakra-ui/react'
import React from 'react'

interface ICardProductDetail {
    handleClick: () => void,
    valueSelected: string,
    value: string,
    children?: React.ReactNode
}

const CardProductDetail = ({children, handleClick, value, valueSelected}: ICardProductDetail ) => {
  return (
      <>
      
        {
            value !== valueSelected ? 
            <Box 
                onClick={handleClick}
                _hover={{borderColor: 'teal', borderWidth:'1px'}} 
                backgroundColor="white" 
                maxWidth={120}
                minWidth={120}
                height={35}
                display="flex"
                alignItems={'center'}
                p={2}
                cursor={'pointer'}
            >
                {children}
            </Box> : 
            <Box 
            onClick={handleClick}
            _hover={{borderColor: 'teal', borderWidth:'1px'}} 
            backgroundColor="white" 
            maxWidth={120}
            minWidth={120}
            height={35}
            display="flex"
            alignItems={'center'}
            p={2}
            cursor={'pointer'}
            borderColor={'teal'}
            borderWidth={1}
        >
            {children}
        </Box>
        }
      </>
    
  )
}

export default CardProductDetail