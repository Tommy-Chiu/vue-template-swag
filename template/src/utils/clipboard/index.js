import getTypeOfData from '../getTypeOfData'

export default (data) => {
  if (getTypeOfData(data) === 'string') {
    let input = document.createElement('input')
    document.body.appendChild(input)
    input.value = data
    input.select()
    document.execCommand('Copy')
    input.remove()
  } else {
    throw new Error('param must be a string.')
  }
}
