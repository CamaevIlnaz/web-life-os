/** Короткие названия дней недели, начиная с понедельника. */
export const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const;

/** Число колонок таблицы: привычка + дни недели. */
export const TABLE_COLUMN_COUNT = 1 + WEEK_DAYS.length;
