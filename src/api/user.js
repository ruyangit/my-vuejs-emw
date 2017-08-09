import api from './index'

export const getUserInfo = () => api.post('/user/info.do')

export const userModify = (data) => api.post('/user/modify.do', data)

export const fogetPwd = (data) => api.post('/user/fogetPwd.do', data)

export const sendSMSMsg = (data) => api.post('/user/sendSMSMsg.do', data)
