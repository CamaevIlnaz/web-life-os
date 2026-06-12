import { BudgetPage, budgetRoute } from './budget';
import { CalendarPage, calendarRoute } from './calendar';
import { WorkoutsPage, workoutsRoute } from './workouts';
import { HabitsPage, habitsRoute } from './habits';
import { NotFoundPage, notFoundRoute } from './not-found';
import { OverviewPage, overviewRoute } from './overview';
import { SettingsPage, settingsRoute } from './settings';
import { StatisticsPage, statisticsRoute } from './statistics';
import { TasksPage, tasksRoute } from './tasks';

export const routes = [
  {
    path: '/',
    route: overviewRoute,
    view: OverviewPage,
  },
  {
    path: '/budget',
    route: budgetRoute,
    view: BudgetPage,
  },
  {
    path: '/tasks',
    route: tasksRoute,
    view: TasksPage,
  },
  {
    path: '/calendar',
    route: calendarRoute,
    view: CalendarPage,
  },
  {
    path: '/statistics',
    route: statisticsRoute,
    view: StatisticsPage,
  },
  {
    path: '/workouts',
    route: workoutsRoute,
    view: WorkoutsPage,
  },
  {
    path: '/habits',
    route: habitsRoute,
    view: HabitsPage,
  },
  {
    path: '/settings',
    route: settingsRoute,
    view: SettingsPage,
  },
];

export { notFoundRoute, NotFoundPage };
