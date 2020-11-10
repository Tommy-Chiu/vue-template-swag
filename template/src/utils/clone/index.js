import { getTypeOfData } from '@/utils'

export default {
  shallow: function (data) {
    return JSON.parse(JSON.stringify(data))
  },
  deep: function (data) {
    const type = getTypeOfData(data)
    let newData
    switch (type) {
      case 'array':
        newData = []
        for (let i = 0, len = data.length; i < len; i++) {
          newData.push(this.deep(data[i]))
        }
        break
      case 'object':
        newData = {}
        for (let key in data) {
          newData[key] = this.deep(data[key])
        }
        break
      default:
        newData = data
        break
    }
    return newData
  }
}
