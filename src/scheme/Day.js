import {Storage, DateUtil} from 'utils';

const spliceArray = (array, item) => {
  const result = array.slice(0);
  const itemIndex = result.indexOf(item);
  result.splice(itemIndex, 1);
  return result;
};

function get(beginDate = moment(), endDate = moment()) {
  const delta = endDate.diff(beginDate, 'days') + 1;

  const keyAndIds = [...(new Array(delta))].map((_,i) => {
    const formatted = DateUtil.formatForStore(beginDate.clone().add(i, 'days'));
    const key = formatted.slice(0, 6);
    const id = formatted.slice(6);
    return {key, id};
  });

  return Promise.all(
    keyAndIds.map(({key, id}) =>
      Storage.get(key, id).catch(e =>
        ({date: `${key}${id}`, doneThings: []})
      )
    )
  )
}

function AddDoneThing(day, doneThingId) {
  const yearmonth = day.date.slice(0, 6);
  const dayOfMonth = day.date.slice(6);
  const dayData = {
    date: day.date,
    doneThings: day.doneThings.concat([doneThingId]).sort((a,b) => a - b)
  };

  Storage.set({
    key:  yearmonth,
    id:   dayOfMonth,
    data: dayData
  });

  return dayData;
}

function removeDone(day, doneThingId) {
  const yearmonth = day.date.slice(0, 6);
  const dayOfMonth = day.date.slice(6);
  const dayData = {
    date: day.date,
    doneThings: spliceArray(day.doneThings, doneThingId)
  };

  Storage.set({
    key:  yearmonth,
    id:   dayOfMonth,
    data: dayData
  });

  return dayData;
}

function removeAll() {
  Storage.clear();
}

export default {
  get,
  AddDoneThing,
  removeDone
};
