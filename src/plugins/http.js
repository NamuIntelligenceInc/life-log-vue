import axios from 'axios'

const createInstance = () => {
  const instance = axios.create()
  instance.interceptors.request.use(
    (config) => {      
      if (!config.skip_auth) {        
        const authToken = window.$cookies.get('token')
        if (authToken) {
          config.headers.Authorization = authToken
        }
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  instance.interceptors.response.use(
    (response)=>{
      return response.data
    },
    (err)=>{
      window.location.href = `/error/${err.response.status}`      
    }
  )

  return instance
}
// 앱 서버용
export const Api = createInstance()
// 외부 서비스 호출용
export const Http = (config)=>{
  const option = Object.assign({}, config)
  return axios.create(option)
}