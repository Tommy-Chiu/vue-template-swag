import { repuireAllAsJson } from '@/utils'
const files = require.context('./', true, /\.vue$/)
export default repuireAllAsJson(files)
