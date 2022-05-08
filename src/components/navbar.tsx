import {
  Container,
  Box,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Heading,
  Input,
  Badge
} from '@chakra-ui/react'
import { useContext } from 'react';
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../context/APIProducts';
import { sumArrNumber } from '../utils/helper';


const Navbar = ({...props }: any) => {
  const { carts } = useContext(MyContext)
  let navigate = useNavigate();
  const arrCountBuy = carts?.map((item) => item.countBuy)
  return (
    <Box
    top={0}
    position="fixed"
    as="nav"
    w="100%"
    zIndex={1}
    backgroundColor="white"
    {...props}
  >
    <Container
      display="flex"
      alignItems="center"
      p={3}
      maxW="container.lg"
      justifyContent="space-between"
    >
      <div>
        <Link to="/">
          <Heading cursor="pointer" as='h3' size='md' color={'teal'}>
            SMARTPHONE
          </Heading>
        </Link>
      </div>
      <Box display={{ sm: 'none', md: 'none', lg: 'block' }}>
        <Input placeholder='Cari produk smartphone idamanmu' width={'100vh'} />
      </Box>
      <Box>
        {/* <IconButton
          colorScheme='blue'
          aria-label='Search database'
          icon={}
        /> */}
        <IconButton
          colorScheme='teal'
          aria-label='Call Segun'
          size='md'
          icon={<FaShoppingCart />}
          style={{marginRight: 15}}
          onClick={() => navigate('/cart')}
        />
        <Badge marginLeft={'-12px'} marginRight="6px" marginTop="-40px">{sumArrNumber(arrCountBuy)}</Badge>
        <Menu>
          <MenuButton 
            aria-label='Options'
            as={IconButton} 
            icon={<FaUserCircle />}
            colorScheme='teal'
          />
          <MenuList>
            <Link to="/"><MenuItem>Home</MenuItem></Link>
            <Link to="/about"><MenuItem>About</MenuItem></Link>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Container>
  </Box>
  )
}

export default Navbar