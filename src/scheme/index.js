function Day(date, doneThings) {
  return {
    date,
    doneThings
  }
};

function Thing(id, name, dates) {
  return {
    id,
    name,
    dates
  }
};


export default {
  Day,
  Thing
};
