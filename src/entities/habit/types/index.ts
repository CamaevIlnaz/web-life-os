export type HabitId = string;

export type HabitCategory =
  | 'health'
  | 'development'
  | 'productivity'
  | 'fitness'
  | 'finance';

export type HabitCompletionStatus = 'empty' | 'partial' | 'completed';

export type Habit = {
  id: HabitId;
  title: string;
  description?: string;
  category: HabitCategory;
  icon: string;
  iconColor: string;
  targetValue?: number;
  targetUnit?: string;
  createdAt: string;
  isArchived: boolean;
};

export type HabitCompletion = {
  id: string;
  habitId: HabitId;
  date: string;
  value: number;
  target: number;
};

export type HabitWithCompletions = Habit & {
  completions: HabitCompletion[];
};

export type HabitDayProgress = {
  date: string;
  value: number;
  target: number;
  progress: number;
  status: HabitCompletionStatus;
};