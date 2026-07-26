import { HStack, VStack } from '@chakra-ui/react';
import { Droplet } from 'lucide-react';

import { CircleCheckbox, EntityPreview, Title } from '@/shared/ui';

export const StorybookPage = () => {
  return (
    <VStack align="stretch" gap="8" p="6">
      <hr />
      <VStack align="stretch" gap="4">
        <Title size="lg">Title — large</Title>
        <Title size="md">Title — medium</Title>
        <Title size="sm">Title — small</Title>
      </VStack>
      <hr />
      <VStack align="stretch" gap="4">
        <EntityPreview
          icon={<Droplet size={20} strokeWidth={2} />}
          title="Пить воду"
          description="2 литра в день"
          iconColor="#3b82f6"
          iconBg="#d5e7ff"
        />
      </VStack>
      <hr />
      <HStack gap="4">
        <CircleCheckbox
          ariaLabel="Выполнено"
          colorPalette="green"
          defaultChecked
        />
        <CircleCheckbox
          ariaLabel="Выполнено сегодня"
          colorPalette="blue"
          defaultChecked
        />
      </HStack>
      <hr />
    </VStack>
  );
};
