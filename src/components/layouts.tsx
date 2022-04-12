import { Box, Container } from '@chakra-ui/react'
import Navbar from './navbar'

interface ILayouts {
    children?: React.ReactNode
}

const Layouts = ({children}: ILayouts) => {
    return (
        <Box as="main" minHeight={'100vh'} backgroundColor='ghostwhite'>
            <Navbar />
            <Container maxW="container.lg" pt={20} pb={20}>
                {children}
            </Container>
        </Box>
    )
}

export default Layouts
