import { userMemoType } from './type';

export interface scheduleProp {
  title: string;
  startDate: Date;
  endDate: Date | null;
  place?: string;
  alarm?: Date;
  description?: string;
}

export interface MemoResponseProp {
  id: number;
  type: userMemoType;
  content: string | scheduleProp;
  date: Date;
  categoryId: string | null;
  categoryColor?: string;
}

export interface MemoProp {
  chatId: string;
  type: userMemoType;
  content: string | scheduleProp;
  date: Date;
  categoryId: string | null;
  description: string;
}

export interface CalendarResponseProp {
  chatId: string;
  place: string;
  alarm?: string;
  description: string;
  startDateTime: string;
  endDateTime?: string;
  categoryId: string;
  categoryColor: string;
  title: string;
}

export interface PhotoResponseProp {
  chatId: string;
  url: string;
  categoryName: string;
  timestamp: Date;
  description: string;
}
export interface LinkResponseProp {
  caption: string;
  link: string;
}
