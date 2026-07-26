import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Droplet } from 'lucide-react';

import {
  CircleCheckbox,
  DataTable,
  EntityPreview,
  Title,
} from '@/shared/ui';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const;
const TODAY_INDEX = 3;

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
      <DataTable.Root title="Мои привычки">
        <DataTable.Header>
          <DataTable.Row>
            <DataTable.ColumnHeader textAlign="start">Привычка</DataTable.ColumnHeader>
            {DAYS.map((day) => {
              return (
                <DataTable.ColumnHeader key={day}>
                  <VStack gap="1" align="center">
                    <Text fontWeight="bold">{day}</Text>
                  </VStack>
                </DataTable.ColumnHeader>
              );
            })}
            <DataTable.ColumnHeader>Серия</DataTable.ColumnHeader>
          </DataTable.Row>
        </DataTable.Header>
        <DataTable.Body>
          {Array.from({ length: 3 }, (_, rowIndex) => (
            <DataTable.Row key={rowIndex}>
              <DataTable.Cell textAlign="start" width="300px">
                <Box h="10" w="40" borderRadius="md" bg="panelAlt" />
              </DataTable.Cell>
              {DAYS.map((day, index) => (
                <DataTable.Cell key={`${rowIndex}-${day}`} highlighted={index === TODAY_INDEX}>
                  <CircleCheckbox
                    ariaLabel="Выполнено"
                    colorPalette={index === TODAY_INDEX ? 'blue' : 'green'}
                  />
                </DataTable.Cell>
              ))}
              <DataTable.Cell>
                <Box mx="auto" h="4" w="8" borderRadius="sm" bg="panelAlt" />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable.Body>
      </DataTable.Root>
      <hr />
    </VStack>
  );
};
