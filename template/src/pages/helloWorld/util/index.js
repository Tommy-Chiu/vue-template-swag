import { repuireAllAsJson } from '@/utils'
const files = require.context('./', true, /\.js$/)
export default repuireAllAsJson(files)
