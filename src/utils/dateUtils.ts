import { format, isAfter, parseISO } from 'date-fns';

export const format_date = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

export const format_date_time = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy HH:mm');
};

export const is_overdue = (dueDate: string): boolean => {
  return isAfter(new Date(), parseISO(dueDate));
};

export const calculate_days_overdue = (dueDate: string): number => {
  if (!is_overdue(dueDate)) return 0;

  const due = parseISO(dueDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - due.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const calculate_fine = (
  dueDate: string,
  finePerDay: number = 0.5
): number => {
  const daysOverdue = calculate_days_overdue(dueDate);
  return daysOverdue * finePerDay;
};
