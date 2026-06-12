import { RouterProvider } from 'atomic-router-react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import { RoutesView, router } from './router';
import { AppLayout } from '@/widgets/app-layout';

export function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <RouterProvider router={router}>
        <AppLayout>
          <RoutesView />
        </AppLayout>
      </RouterProvider>
    </ChakraProvider>
  );
}
