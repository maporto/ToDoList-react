import { AsyncStorage } from "react-native";
import { __CONFIG__ } from "./config";

import {
  convertToArrayOfObject,
  convertToStringWithSeparators
} from "./helper";

export const getAll = (callback) => {
  return AsyncStorage.getItem(__CONFIG__.storage, (err, itens) =>
    convertToArrayOfObject(itens, callback)
  );
}

export const saveAll = (itens) => {
  AsyncStorage.setItem(__CONFIG__.storage, convertToStringWithSeparators(itens));
}
