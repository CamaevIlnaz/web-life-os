import { createRoute } from 'atomic-router';
import { sample } from 'effector';

import { habitsFilterChanged } from '@/entities/habit';

export const habitsRoute = createRoute();

sample({
  clock: habitsRoute.opened,
  fn: () => ({ isActive: true }),
  target: habitsFilterChanged,
});
