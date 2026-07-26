import { createEffect, createEvent, createStore, restore, sample } from 'effector';

import {
  ApiError,
  habitsControllerFindAll,
  type HabitResponseDto,
  type HabitsControllerFindAllParams,
} from '@/shared/api';

export const habitsFilterChanged = createEvent<HabitsControllerFindAllParams>();
export const habitsRequested = createEvent();

export const $habitsFilter = restore(habitsFilterChanged, {});

export const loadHabitsFx = createEffect<
  HabitsControllerFindAllParams,
  HabitResponseDto[],
  ApiError
>(async (params) => habitsControllerFindAll(params));

export const $habits = restore(loadHabitsFx.doneData, []);

export const $isHabitsLoading = loadHabitsFx.pending;

export const $habitsError = createStore<string | null>(null)
  .on(habitsRequested, () => null)
  .on(habitsFilterChanged, () => null)
  .on(loadHabitsFx.fail, () => 'Не удалось загрузить привычки')
  .reset(loadHabitsFx.done);

sample({
  clock: habitsRequested,
  source: $habitsFilter,
  target: loadHabitsFx,
});

sample({
  clock: habitsFilterChanged,
  target: loadHabitsFx,
});
