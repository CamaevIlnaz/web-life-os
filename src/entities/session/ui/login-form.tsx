import { useState, type FormEvent } from 'react';
import { useUnit } from 'effector-react';
import { Box, Button, Field, Heading, Input, Text, VStack } from '@chakra-ui/react';

import { $isLoginPending, $loginError, loginSubmitted } from '../model';

export function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, isLoginPending] = useUnit([$loginError, $isLoginPending]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginSubmitted({ login: login.trim(), password });
  };

  return (
    <Box
      minH="100vh"
      bg="page"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="4"
    >
      <Box asChild w="100%" maxW="360px">
        <form onSubmit={handleSubmit}>
          <VStack gap="6" align="stretch">
            <VStack gap="2" align="stretch">
              <Heading as="h1" size="lg" color="heading">
                LiveOS
              </Heading>
              <Text color="muted" fontSize="sm">
                Войдите, чтобы продолжить
              </Text>
            </VStack>

            <VStack gap="4" align="stretch">
              <Field.Root required>
                <Field.Label color="text">Логин</Field.Label>
                <Input
                  name="login"
                  value={login}
                  onChange={(event) => setLogin(event.target.value)}
                  autoComplete="username"
                  minLength={3}
                  required
                  disabled={isLoginPending}
                  bg="panel"
                  borderColor="border"
                  color="text"
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label color="text">Пароль</Field.Label>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  minLength={6}
                  required
                  disabled={isLoginPending}
                  bg="panel"
                  borderColor="border"
                  color="text"
                />
              </Field.Root>

              {loginError ? (
                <Text color="danger" fontSize="sm">
                  {loginError}
                </Text>
              ) : null}
            </VStack>

            <Button
              type="submit"
              loading={isLoginPending}
              disabled={isLoginPending}
              bg="primary"
              color="primaryText"
              _hover={{ opacity: 0.9 }}
            >
              Войти
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
