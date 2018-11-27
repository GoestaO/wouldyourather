export const getObjectAsArray = obj => {
  let list = [];
  for (var key in obj) {
    list.push(obj[key]);
  }
  return list;
}
