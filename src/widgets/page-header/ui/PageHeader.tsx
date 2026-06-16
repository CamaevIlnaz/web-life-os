import { Flex, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Title } from '@/shared/ui';

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap="6"
      px="8"
      py="6"
    >
      <VStack align="start" gap="1">
        <Title size="lg">{title}</Title>
        {subtitle != null && (
          <Text fontSize="sm" color="muted" lineHeight="1.5">
            {subtitle}
          </Text>
        )}
      </VStack>
      {children != null && (
        <Flex align="center" gap="3" flexShrink={0}>
          {children}
        </Flex>
      )}
    </Flex>
  );
}
