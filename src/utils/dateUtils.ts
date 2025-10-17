import { format, isAfter, parseISO } from 'date-fns';

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy HH:mm');
};

export const isOverdue = (dueDate: string): boolean => {
  return isAfter(new Date(), parseISO(dueDate));
};

export const calculateDaysOverdue = (dueDate: string): number => {
  if (!isOverdue(dueDate)) return 0;

  const due = parseISO(dueDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - due.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const calculateFine = (
  dueDate: string,
  finePerDay: number = 0.5
): number => {
  const daysOverdue = calculateDaysOverdue(dueDate);
  return daysOverdue * finePerDay;
};
