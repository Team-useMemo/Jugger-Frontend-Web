import { userMemoType } from './type';

export interface scheduleProp {
  title: string;
  startDate: Date;
  endDate: Date | null;
}

export interface MemoResponseProp {
  id: number;
  type: userMemoType;
  content: string | scheduleProp;
  date: Date;
  categoryId: string | null;
}
export interface CalendarResponseProp {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  categoryId: string;
}

export interface PhotoResponseProp {
  url: string;
  categoryName: string;
  timestamp: Date;
}
