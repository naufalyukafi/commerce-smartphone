import { Box, Center, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react'

const About = () => {
  return (
      <>
        <Box width='100%' mt={10} textAlign='center' display={{ sm: 'block', md: 'none' }} >
            <Center>
                <Image src="/images/naufalyukafi.jpg" alt="naufal yukafi ridlo" width="260" height="257" objectFit='cover' />
            </Center>
        </Box>
        <Flex mt={{ sm: '5%', md: '9%' }} alignItems='center' textAlign={{ base: 'center', sm: 'center', md: 'left'}}>
            <Box>
                <Heading as='h2' size='xl'>Hello, It&apos;s Me,</Heading>
                <Heading  as='h2' size='xl' mt="3" color="teal">Naufal Yukafi Ridlo</Heading>
                <Text fontSize='md' mt="5" maxWidth={{md: '95%'}}>I&apos;m a student who aspires to be a front end engineer, experienced in javascript, typescript, and React.</Text>
            </Box>
            <Spacer />
            <Box display={{ base: 'none', sm: 'none', md: 'flex' }}>
                <Image src="/images/naufalyukafi.jpg" alt="naufal yukafi ridlo"  width="387" height="477" objectFit='contain' />
            </Box>
        </Flex>
      </>
    
  )
}

export default About