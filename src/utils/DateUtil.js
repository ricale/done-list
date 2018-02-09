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

function getCurrentWeeks(date = moment(), weeks = 2) {
  const weekday = date.isoWeekday();
  const d = (weekday < 3               ) ? (3 - weekday) :
            (weekday > 3 && weekday < 7) ? (7 - weekday) :
                                           0;

  const lastDate = date.clone().add(d, 'days');

  return getRecentDates(lastDate, weeks * 7);
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

function isFuture(m) {
  return Math.round(m.diff(moment(), 'days', true)) > 0;
}

export default {
  getRecentDatesBeginWithMon,
  getRecentDatesBeginWithMonOrThu,
  getCurrentWeeks,
  formatForStore,
  formatForDisplay,
  isSunday,
  isSaturday,
  isFuture
};
