import { notFoundRoute } from '@/pages';
import { budgetRoute } from '@/pages/budget';
import { calendarRoute } from '@/pages/calendar';
import { workoutsRoute } from '@/pages/workouts';
import { habitsRoute } from '@/pages/habits';
import { overviewRoute } from '@/pages/overview';
import { settingsRoute } from '@/pages/settings';
import { statisticsRoute } from '@/pages/statistics';
import { tasksRoute } from '@/pages/tasks';

export const routes = {
  overview: overviewRoute,
  budget: budgetRoute,
  tasks: tasksRoute,
  calendar: calendarRoute,
  statistics: statisticsRoute,
  workouts: workoutsRoute,
  habits: habitsRoute,
  settings: settingsRoute,
  notFound: notFoundRoute,
};
