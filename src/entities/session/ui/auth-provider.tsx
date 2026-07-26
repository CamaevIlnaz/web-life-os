import { useEffect, type ReactNode } from 'react';
import { useUnit } from 'effector-react';
import { Box, Spinner } from '@chakra-ui/react';

import { $sessionStatus, sessionCheckRequested } from '../model';
import { LoginForm } from './login-form';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const sessionStatus = useUnit($sessionStatus);

  useEffect(() => {
    sessionCheckRequested();
  }, []);

  if (sessionStatus === 'pending') {
    return (
      <Box
        minH="100vh"
        bg="page"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="lg" color="primary" />
      </Box>
    );
  }

  if (sessionStatus === 'anonymous') {
    return <LoginForm />;
  }

  return children;
}
