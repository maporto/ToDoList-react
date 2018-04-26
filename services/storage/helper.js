export const convertToArrayOfObject = (itens, callback) => {
  return callback(
    itens ? itens.split("||").map((item, i) => ({ key: i, text: item })) : []
  );
}

export const convertToStringWithSeparators = (itens) => {
  return itens.map(item => item.text).join("||");
}
