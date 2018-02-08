import moment from 'moment';

function getRecentDates(lastDate = moment(), period = 14 /* days */) {
  return [...(new Array(period))].map((_,i) =>
    lastDate.clone().subtract(period - i - 1, 'days')
  );
}

function getRecentDatesBeginWithMon(lastDate = moment(), period = 14 /* days */) {
  const result = getRecentDates(lastDate, period);

  const weekday = result[0].isoWeekday();

  return [...(new Array(weekday - 1))].map((_,i) =>
    result[0].clone().subtract(weekday - i - 1, 'days')
  ).concat(result);
}

function getRecentDatesBeginWithMonOrThu(lastDate = moment(), period = 14 /* days */) {
  const result = getRecentDates(lastDate, period);

  const weekday = result[0].isoWeekday();

  const prefixCount = weekday > 3 ? weekday - 3 : weekday;

  return [...(new Array(prefixCount - 1))].map((_,i) =>
    result[0].clone().subtract(prefixCount - i - 1, 'days')
  ).concat(result);
}

function formatForStore(m) {
  return m.format('YYYYMMDD');
}

function formatForDisplay(m, o = {}) {
  const weekday = o.weekday;

  if(typeof m === 'string') {
    m = moment(m, 'YYYYMMDD');
  }

  const formatted = m.format('YYYY-MM-DD');

  if(weekday) {
    const weekdayFormat = ['', '월', '화', '수', '목', '금', '토', '일'][m.isoWeekday()]
    return `${formatted} ${weekdayFormat}`;
  }

  return formatted;
}

function isSunday(m) {
  if(typeof m === 'string') {
    m = moment(m, 'YYYYMMDD');
  }

  return m.isoWeekday() === 7;
}

function isSaturday(m) {
  if(typeof m === 'string') {
    m = moment(m, 'YYYYMMDD');
  }

  return m.isoWeekday() === 6;
}

export default {
  getRecentDatesBeginWithMon,
  getRecentDatesBeginWithMonOrThu,
  formatForStore,
  formatForDisplay,
  isSunday,
  isSaturday
};
