import type { HabitResponseDto } from '@/entities/habit';

/**
 * Возвращает индекс текущего дня недели для сетки Пн–Вс.
 */
export const getTodayIndex = (): number => (new Date().getDay() + 6) % 7;

/**
 * Приводит неизвестное значение к непустой строке или `undefined`.
 */
export const asOptionalString = (value: unknown): string | undefined => {
  return typeof value === 'string' && value.trim().length > 0 ? value : undefined;
};

/**
 * Возвращает описание привычки или название категории как запасной вариант.
 */
export const getHabitDescription = (habit: HabitResponseDto): string | undefined => {
  return asOptionalString(habit.description) ?? asOptionalString(habit.category?.name);
};

/**
 * Возвращает цвет иконки привычки из категории, если API отдал строку.
 */
export const getHabitIconColor = (habit: HabitResponseDto): string | undefined => {
  return asOptionalString(habit.category?.color);
};
