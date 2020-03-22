export default (arr, property) => {
  return arr.sort((obj1, obj2) => {
    const value1 = obj1[property]
    const value2 = obj2[property]
    return value1 - value2
  })
}
