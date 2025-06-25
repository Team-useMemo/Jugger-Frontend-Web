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
  categoryColor?: string;
}

export interface MemoProp {
  chatId: string;
  type: userMemoType;
  content: string | scheduleProp;
  date: Date;
  categoryId: string | null;
}

export interface CalendarResponseProp {
  chatId: string;
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
}
export interface LinkResponseProp {
  caption: string;
  link: string;
}
