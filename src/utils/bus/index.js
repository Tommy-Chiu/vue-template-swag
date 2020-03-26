import Vue from 'vue'
let instance = new Vue()
instance.bindEvent = (eventName, fun) => {
  instance.$on(`${eventName}.action`, fun)
}
instance.removeEvent = (eventName, fun) => {
  instance.$off(`${eventName}.action`, fun)
}
instance.actionEvent = async (eventName, prams, callBack) => {
  await instance.$off(`${eventName}.result`)
  await instance.$emit(`${eventName}.action`, prams)
  await instance.$on(`${eventName}.result`, async (data) => {
    if (callBack) await callBack(data)
    await instance.$off(`${eventName}.result`)
  })
}
instance.resultEvent = (eventName, data) => {
  instance.$emit(`${eventName}.result`, data)
}
export default instance
