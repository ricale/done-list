import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

if(!global.storage) {
  global.storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
  });
}

function get(key, id) {
  return global.storage.load({key, id});
};

function getByKey(key) {
  return global.storage.getAllDataForKey(key);
};

function set({key, id, data}) {
  return global.storage.save({key, id, data});
};

function remove({key, id}) {
  return global.storage.remove({key, id});
}

function clear() {
  global.storage.clearMap();
}

export default {
  get,
  getByKey,
  set,
  remove,
  clear,
};
