import { userMemoType } from './type';

export interface ScheduleAlarm {
  minute: number;
  text: string;
}

export const scheduleAlarms = [
  {
    minute: 0,
    text: '일정 시작 시간',
  },
  {
    minute: 5,
    text: '5분 전',
  },
  {
    minute: 10,
    text: '10분 전',
  },
  {
    minute: 15,
    text: '15분 전',
  },
  {
    minute: 20,
    text: '20분 전',
  },
  {
    minute: 25,
    text: '25분 전',
  },
  {
    minute: 30,
    text: '30분 전',
  },
  {
    minute: 45,
    text: '45분 전',
  },
  {
    minute: 60,
    text: '1시간 전',
  },
];

export interface scheduleProp {
  title: string;
  startDate: Date;
  endDate: Date | null;
  place?: string;
  alarm?: ScheduleAlarm;
  description?: string;
}

export interface imageProp {
  imgUrl: string;
  description?: string;
}

export interface MemoResponseProp {
  id: number;
  type: userMemoType;
  content: string | scheduleProp | imageProp;
  date: Date;
  categoryId: string | null;
  categoryColor?: string;
}

export interface MemoProp {
  chatId: string;
  type: userMemoType;
  content: string | scheduleProp | imageProp;
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
  photoId: string;
  url: string;
  categoryId: string;
  description: string;
  timestamp: Date;
}
export interface LinkResponseProp {
  categoryId: string;
  linkId: string;
  link: string;
}
