import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors:{
  },
  fonts:{
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black'
      }
    }
  }
})