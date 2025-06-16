const weekday = ['일', '월', '화', '수', '목', '금', '토'];
export const CalendarDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const CalendarMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getCalendarDates = (date: Date) => {
  const dateList = [];
  const firstDate = new Date(date);
  firstDate.setDate(1);
  const firstDay = firstDate.getDay() == 0 ? 7 : firstDate.getDay();
  const lastDate = new Date(firstDate);
  lastDate.setMonth(lastDate.getMonth() + 1, 0);
  const lastDay = lastDate.getDay();

  const length = firstDay + lastDate.getDate() + (lastDay == 6 ? 7 : 6 - lastDay);
  firstDate.setDate(firstDate.getDate() - firstDay);
  for (let i = 0; i < length; i++) {
    dateList.push(new Date(firstDate));
    firstDate.setDate(firstDate.getDate() + 1);
  }
  return dateList;
};

export const getDateAfterOneHour = (date: Date) => {
  const _date = new Date(date);
  _date.setHours(_date.getHours() + 1);
  return _date;
};

export const formatDate = (date: Date, format: string) => {
  const _year = date.getFullYear().toString();
  const _month = (date.getMonth() + 1).toString();
  const _date = date.getDate().toString();
  const _day = weekday[date.getDay()];
  const _hour = date.getHours().toString();
  const _minute = date.getMinutes().toString();
  const _meridiem = ~~(date.getHours() / 12);

  const dateInfo = {
    Y: _year,
    YYYY: _year.padStart(4, '0'),
    M: _month,
    MM: _month.padStart(2, '0'),
    D: _date,
    DD: _date.padStart(2, '0'),
    W: _day,
    h: _hour,
    hh: _hour.padStart(2, '0'),
    AP: _meridiem ? '오후' : '오전',
    APh: (~~_hour % 12).toString(),
    m: _minute,
    mm: _minute.padStart(2, '0'),
  };

  return Object.entries(dateInfo).reduce((acc, [key, value]) => {
    return acc.replace(`{${key}}`, value);
  }, format);
};
