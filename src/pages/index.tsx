import {
  Box, Button, Flex, FormControl, FormErrorMessage, Heading, Icon, Input, InputGroup, InputLeftElement, Stack
} from '@chakra-ui/react'
import { FaUserAlt } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import * as yup from 'yup';
import Head from 'next/head'
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

type SigninFormData = {
  login: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  login: yup.string().required('Login obrigatório'),
  password: yup.string().required('Senha obrigatória'),
})

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const handleSignIn: SubmitHandler<SigninFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
  }
  return (
    <>
      <Head>
        <title>ePharma Ticket</title>
      </Head>
      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
      >
        <Box
          as="form"
          onSubmit={handleSubmit(handleSignIn)}
          bg="blue.100"
          flexDir="column"
          w="100%"
          maxW="360px"
          borderRadius="5px"
          boxShadow="lg"
        >
          <Heading pt="2rem" textAlign="center">Acesso</Heading>
          <Stack
            p="2rem"
            spacing=".5rem"
            align="center"
          >
            <FormControl
              isInvalid={!!errors.login}
              id="login"
            >
              <InputGroup flexDir="column" >
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FaUserAlt} color="gray.300" />}
                />
                <Input
                  variant="flushed"
                  type="text"
                  placeholder="Login"
                  bg="white"
                  borderRadius="5px"
                  {...register('login')}
                />
                {!!errors.login &&
                  <FormErrorMessage>
                    {errors.login.message}
                  </FormErrorMessage>
                }
              </InputGroup>
            </FormControl>
            <FormControl
              isInvalid={!!errors.password}
              id="password"
            >
              <InputGroup flexDir="column">
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={RiLockPasswordFill} color="gray.300" />}
                />
                <Input mb=".5rem"
                  variant="flushed"
                  type="password"
                  placeholder="Password"
                  bg="white"
                  borderRadius="5px"
                  {...register('password')}
                />
                {!!errors.password &&
                  <FormErrorMessage>
                    {errors.password.message}
                  </FormErrorMessage>
                }
              </InputGroup>
            </FormControl>
            <Button
              w="50%"
              type="submit"
            >
              Enter
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  )
}
