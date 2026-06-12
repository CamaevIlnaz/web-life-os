import { notFoundRoute } from '@/pages';
import { budgetRoute } from '@/pages/budget';
import { calendarRoute } from '@/pages/calendar';
import { goalsRoute } from '@/pages/goals';
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
  goals: goalsRoute,
  habits: habitsRoute,
  settings: settingsRoute,
  notFound: notFoundRoute,
};
