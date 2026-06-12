import { type ReactNode } from 'react';
import { Link } from 'atomic-router-react';
import { routes } from '@/app/router';

import {
  BarChart3,
  CalendarDays,
  CircleCheck,
  Goal,
  Home,
  LayoutGrid,
  PieChart,
  Settings,
} from 'lucide-react';

type AppLayout = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayout) {
  return (
    <div>
      <div>
        <Link to={routes.overview} activeClassName="active">
          <LayoutGrid size={22} />
          Обзор
        </Link>
        <Link to={routes.budget} activeClassName="active">
          <PieChart size={22} />
          Бюджет
        </Link>
        <Link to={routes.tasks} activeClassName="active">
          <CircleCheck size={22} />
          Задачи
        </Link>
        <Link to={routes.calendar} activeClassName="active">
          <CalendarDays size={22} />
          Календарь
        </Link>
        <Link to={routes.statistics} activeClassName="active">
          <BarChart3 size={22} />
          Статистика
        </Link>
        <Link to={routes.goals} activeClassName="active">
          <Goal size={22} />
          Цели
        </Link>
        <Link to={routes.habits} activeClassName="active">
          <Home size={22} />
          Привычки
        </Link>
        <Link to={routes.settings} activeClassName="active">
          <Settings size={22} />
          Настройки
        </Link>
      </div>
      <section>{children}</section>
    </div>
  );
}