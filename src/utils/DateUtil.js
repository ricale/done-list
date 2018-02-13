import moment from 'moment';

const FORMAT_FOR_STORE = 'YYYYMMDD';
const FORMAT_FOR_DISPLAY = 'YYYY-MM-DD';

function _getMoment(m) {
  return (typeof m === 'string') ? moment(m, FORMAT_FOR_STORE) : m;
}

function _getRecentDates(lastDate = moment(), period = 14 /* days */) {
  return [...(new Array(period))].map((_,i) =>
    lastDate.clone().subtract(period - i - 1, 'days')
  );
}

/*
 * return >  0 ==> a < b
 * return == 0 ==> same day
 * return <  0 ==> a > b
 */
function _diff(a, b) {
  return Math.round(a.diff(b, 'days', true))
}

function _diffFromToday(m) {
  return _diff(m, moment());
}

export default {
  getRecentDatesBeginWithMon: (lastDate = moment(), period = 14 /* days */) => {
    const result = _getRecentDates(lastDate, period);

    const weekday = result[0].isoWeekday();

    return [...(new Array(weekday - 1))].map((_,i) =>
      result[0].clone().subtract(weekday - i - 1, 'days')
    ).concat(result);
  },

  getRecentDatesBeginWithMonOrThu: (lastDate = moment(), period = 14 /* days */) => {
    const result = _getRecentDates(lastDate, period);

    const weekday = result[0].isoWeekday();

    const prefixCount = weekday > 3 ? weekday - 3 : weekday;

    return [...(new Array(prefixCount - 1))].map((_,i) =>
      result[0].clone().subtract(prefixCount - i - 1, 'days')
    ).concat(result);
  },

  getCurrentWeeks: (date = moment(), weeks = 2) => {
    const weekday = date.isoWeekday();
    const d = (weekday < 3               ) ? (3 - weekday) :
              (weekday > 3 && weekday < 7) ? (7 - weekday) :
                                             0;

    const lastDate = date.clone().add(d, 'days');

    return _getRecentDates(lastDate, weeks * 7);
  },

  formatForStore: (m) => m.format(FORMAT_FOR_STORE),

  formatForDisplay: (m, o = {}) => {
    const {weekday} = o;

    m = _getMoment(m);

    const formatted = m.format(FORMAT_FOR_DISPLAY);

    if(weekday) {
      const weekdayFormat = ['', '월', '화', '수', '목', '금', '토', '일'][m.isoWeekday()]
      return `${formatted} ${weekdayFormat}`;
    }

    return formatted;
  },

  diff: _diff,
  diffFromToday: (m) => {
    m = _getMoment(m);
    return _diffFromToday(m);
  },

  isSunday:   (m) => _getMoment(m).isoWeekday() === 7,
  isSaturday: (m) => _getMoment(m).isoWeekday() === 6,
  isFuture:   (m) => _diffFromToday(_getMoment(m)) > 0
};
