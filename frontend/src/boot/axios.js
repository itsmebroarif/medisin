import { defineBoot } from '#q-app'
import api from '../api'

export default defineBoot(({ app }) => {
  app.config.globalProperties.$api = api
})

export { api }
