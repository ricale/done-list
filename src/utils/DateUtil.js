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

export default {
  getRecentDates,
  getRecentDatesBeginWithMon,
  getRecentDatesBeginWithMonOrThu
};
