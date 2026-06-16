import { VStack } from '@chakra-ui/react';

import { Title } from '@/shared/ui';

export const StorybookPage = () => {
  return (
    <VStack align="stretch" gap="6" p="6">
      <Title size="lg">Title — large</Title>
      <Title size="md">Title — medium</Title>
      <Title size="sm">Title — small</Title>
    </VStack>
  );
};
