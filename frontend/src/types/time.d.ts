export interface TimeComponents {
  year: number;
  month: number; // 1-12
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  timezone: string;
}

export interface FormattedTime {
  iso: string;
  locale: string;
  localeDate: string;
  localeTime: string;
  dateTime: string;
  components: TimeComponents;
  relative: string;
  unix: number;
}