import { combine, createEffect, createEvent, createStore, restore, sample } from 'effector';

import {
  ApiError,
  habitsControllerCreate,
  habitsControllerFindAll,
  habitsControllerRemove,
  habitsControllerUpdate,
  type CreateHabitDto,
  type HabitResponseDto,
  type HabitsControllerFindAllParams,
  type UpdateHabitDto,
} from '@/shared/api';

export type UpdateHabitParams = {
  id: number;
  data: UpdateHabitDto;
};

export const habitsFilterChanged = createEvent<HabitsControllerFindAllParams>();
export const habitsRequested = createEvent();
export const habitCreateRequested = createEvent<CreateHabitDto>();
export const habitUpdateRequested = createEvent<UpdateHabitParams>();
export const habitDeleteRequested = createEvent<number>();

export const $habitsFilter = restore(habitsFilterChanged, {});

export const loadHabitsFx = createEffect<
  HabitsControllerFindAllParams,
  HabitResponseDto[],
  ApiError
>(async (params) => habitsControllerFindAll(params));

export const createHabitFx = createEffect<CreateHabitDto, HabitResponseDto, ApiError>(
  async (dto) => habitsControllerCreate(dto),
);

export const updateHabitFx = createEffect<UpdateHabitParams, HabitResponseDto, ApiError>(
  async ({ id, data }) => habitsControllerUpdate(id, data),
);

export const deleteHabitFx = createEffect<number, HabitResponseDto, ApiError>(
  async (id) => habitsControllerRemove(id),
);

export const $habits = restore(loadHabitsFx.doneData, [])
  .on(createHabitFx.doneData, (habits, habit) => [...habits, habit])
  .on(updateHabitFx.doneData, (habits, habit) =>
    habits.map((item) => (item.id === habit.id ? habit : item)),
  )
  .on(deleteHabitFx.doneData, (habits, habit) =>
    habits.filter((item) => item.id !== habit.id),
  );

export const $isHabitsLoading = loadHabitsFx.pending;

export const $isHabitMutating = combine(
  createHabitFx.pending,
  updateHabitFx.pending,
  deleteHabitFx.pending,
  (isCreating, isUpdating, isDeleting) => isCreating || isUpdating || isDeleting,
);

export const $habitsError = createStore<string | null>(null)
  .on(habitsRequested, () => null)
  .on(habitsFilterChanged, () => null)
  .on(loadHabitsFx.fail, () => 'Не удалось загрузить привычки')
  .reset(loadHabitsFx.done);

export const $habitMutationError = createStore<string | null>(null)
  .on(habitCreateRequested, () => null)
  .on(habitUpdateRequested, () => null)
  .on(habitDeleteRequested, () => null)
  .on(createHabitFx.fail, () => 'Не удалось создать привычку')
  .on(updateHabitFx.fail, () => 'Не удалось обновить привычку')
  .on(deleteHabitFx.fail, () => 'Не удалось удалить привычку')
  .reset(createHabitFx.done)
  .reset(updateHabitFx.done)
  .reset(deleteHabitFx.done);

sample({
  clock: habitsRequested,
  source: $habitsFilter,
  target: loadHabitsFx,
});

sample({
  clock: habitsFilterChanged,
  target: loadHabitsFx,
});

sample({
  clock: habitCreateRequested,
  target: createHabitFx,
});

sample({
  clock: habitUpdateRequested,
  target: updateHabitFx,
});

sample({
  clock: habitDeleteRequested,
  target: deleteHabitFx,
});
