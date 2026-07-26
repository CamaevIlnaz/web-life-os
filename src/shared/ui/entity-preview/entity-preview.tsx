import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface EntityPreviewProps {
  icon: ReactNode;
  title: string;
  description?: string;
  iconColor?: string;
  iconBg?: string;
}

export function EntityPreview({
  icon,
  title,
  description,
  iconColor = 'accent',
  iconBg = 'panelAlt',
}: EntityPreviewProps) {
  return (
    <HStack gap="3" align="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        w="10"
        h="10"
        borderRadius="xl"
        bg={iconBg}
        color={iconColor}
      >
        {icon}
      </Box>

      <VStack gap="0.5" align="start">
        <Text fontSize="sm" fontWeight="semibold" color="heading" lineHeight="1.25">
          {title}
        </Text>
        {description ? (
          <Text fontSize="xs" color="muted" lineHeight="1.3">
            {description}
          </Text>
        ) : null}
      </VStack>
    </HStack>
  );
}
