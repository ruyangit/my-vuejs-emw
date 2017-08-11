import api from './index'

export const getUserInfo = () => api.post('/user/info.do')

export const fogetPwd = (data) => api.post('/user/fogetPwd.do', data)

export const modifyPwd = (data) => api.post('/user/modifyPwd.do', data)

export const modifyEmail = (data) => api.post('/user/modifyEmail.do', data)

export const modifyMobile = (data) => api.post('/user/modifyMobile.do', data)

export const sendSMSMsg = (data) => api.post('/user/sendSMSMsg.do', data)
