import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from '@radix-ui/themes';
import React from 'react';

function Login() {
  return (
    <Box
      style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}
    >
      <Container size='3'>
        <Card>
          <Box p='9'>
            <Flex justify='center' direction='column' gap='4'>
              <Heading>Pay Invoice</Heading>
              <Text>Pay your invoice amount of $17,975.00 here.</Text>
              <Button className='transition-all hover:scale-105 active:scale-100'>
                Pay now
              </Button>
            </Flex>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
