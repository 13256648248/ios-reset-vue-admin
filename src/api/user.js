import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/v1/user/info',
    method: 'get',
    params: { token }
  })
}

export function getDevicesList(data) {
  return request({
    url: '/api/v1/device/record',
    method: 'get',
    params: data
  })
}

export function addDevice(data) {
  return request({
    url: '/api/v1/device/register',
    method: 'post',
    data
  })
}
