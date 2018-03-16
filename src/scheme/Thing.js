import {Storage} from 'utils';

const spliceArray = (array, item) => {
  const result = array.slice(0);
  const itemIndex = result.indexOf(item);
  result.splice(itemIndex, 1);
  return result;
};

function get() {
  return Storage.getByKey('things').then(values => {
    const result = values.reduce((hash, item) => {
      hash[item.id] = item;
      return hash;
    }, {});
    return new Promise((resolve, reject) => resolve(result));
  });
}

function add(name, date) {
  return Storage.getByKey('things').then(result => {
    const id = result.length === 0 ? 0 :
      (Math.max(
        ...result.map(r => r.id)
      ) + 1)

    const thingData = addDate({id, name}, date);

    return new Promise((resolve, reject) => {
      resolve(thingData);
    });
  })
}

function update(id, data) {
  return Storage.set({
    key: 'things',
    id,
    data
  });
}

function remove(id) {
  return Storage.remove({
    key: 'things',
    id
  });
}

function addDate(thing, date) {
  const thingData = {
    id: thing.id,
    name: thing.name,
    dates: (thing.dates || []).concat(date).sort((a,b) => a - b)
  };

  Storage.set({
    key:  'things',
    id:   thing.id,
    data: thingData
  });

  return thingData;
}

function removeDate(thing, date) {
  const thingData = {
    id: thing.id,
    name: thing.name,
    dates: spliceArray(thing.dates, date),
  };

  Storage.set({
    key:  'things',
    id:   thing.id,
    data: thingData
  });

  return thingData;
}

export default {
  get,
  add,
  update,
  remove,
  addDate,
  removeDate
};
