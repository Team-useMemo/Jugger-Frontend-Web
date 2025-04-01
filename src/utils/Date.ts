const weekday = ['일', '월', '화', '수', '목', '금', '토'];

const formatDate = (date: Date, format: string) => {
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

export default formatDate;
