import { Box, Text, VStack } from '@chakra-ui/react';
import { useUnit } from 'effector-react';
import { Heart } from 'lucide-react';

import { $habits, $habitsError, $isHabitsLoading } from '@/entities/habit';
import { CircleCheckbox, DataTable, EntityPreview } from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';

import { TABLE_COLUMN_COUNT, WEEK_DAYS } from '../constants';
import {
  getHabitDescription,
  getHabitIconColor,
  getTodayIndex,
} from '../lib';

export const HabitsPage = () => {
  const [habits, isHabitsLoading, habitsError] = useUnit([
    $habits,
    $isHabitsLoading,
    $habitsError,
  ]);
  const todayIndex = getTodayIndex();

  return (
    <VStack align="stretch" gap="0">
      <PageHeader
        title="Привычки"
        subtitle="Формируй полезные привычки и отслеживай прогресс каждый день."
      />

      <Box px="8" pb="8">
        <DataTable.Root title="Мои привычки">
          <DataTable.Header>
            <DataTable.Row>
              <DataTable.ColumnHeader textAlign="start">Привычка</DataTable.ColumnHeader>
              {WEEK_DAYS.map((day, index) => {
                const isToday = index === todayIndex;

                return (
                  <DataTable.ColumnHeader
                    key={day}
                    highlighted={isToday}
                    borderTopRadius={isToday ? 'md' : undefined}
                  >
                    <Text fontWeight="bold">{day}</Text>
                  </DataTable.ColumnHeader>
                );
              })}
            </DataTable.Row>
          </DataTable.Header>

          <DataTable.Body>
            {isHabitsLoading ? (
              <DataTable.Row>
                <DataTable.Cell colSpan={TABLE_COLUMN_COUNT} textAlign="start">
                  <Text color="muted">Загрузка привычек...</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ) : null}

            {!isHabitsLoading && habitsError != null ? (
              <DataTable.Row>
                <DataTable.Cell colSpan={TABLE_COLUMN_COUNT} textAlign="start">
                  <Text color="danger">{habitsError}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ) : null}

            {!isHabitsLoading && habitsError == null && habits.length === 0 ? (
              <DataTable.Row>
                <DataTable.Cell colSpan={TABLE_COLUMN_COUNT} textAlign="start">
                  <Text color="muted">Пока нет активных привычек</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ) : null}

            {!isHabitsLoading && habitsError == null
              ? habits.map((habit) => {
                  const iconColor = getHabitIconColor(habit);

                  return (
                    <DataTable.Row key={habit.id}>
                      <DataTable.Cell textAlign="start" width="400px">
                        <EntityPreview
                          icon={<Heart size={20} strokeWidth={2} />}
                          title={habit.name}
                          description={getHabitDescription(habit)}
                          iconColor={iconColor}
                        />
                      </DataTable.Cell>

                      {WEEK_DAYS.map((day, index) => (
                        <DataTable.Cell
                          key={`${habit.id}-${day}`}
                          highlighted={index === todayIndex}
                        >
                          <CircleCheckbox
                            ariaLabel={`${habit.name}: ${day}`}
                            colorPalette={index === todayIndex ? 'blue' : 'green'}
                          />
                        </DataTable.Cell>
                      ))}
                    </DataTable.Row>
                  );
                })
              : null}
          </DataTable.Body>
        </DataTable.Root>
      </Box>
    </VStack>
  );
};
