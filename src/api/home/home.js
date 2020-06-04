import fetch from '@api/fetch'

export function listCustomerService(params){
  return fetch({
    url:'/api/pc/customerService/listCustomerService',
    method: 'get',
    params
  })
}

export function client_search_cp(params){
  return fetch({
    url:'/qq/soso/fcgi-bin/client_search_cp',
    method: 'get',
    params
  })
}

export function search(params){
  return fetch({
    url:'/qq/splcloud/fcgi-bin/smartbox_new.fcg',
    method: 'get',
    params
  })
}


export function audioFun(params){
  return fetch({
    url:'/uqq/cgi-bin/musicu.fcg',
    method: 'get',
    params
  })
}


export function common(params){
  return fetch({
    url:'/wis/weather/common',
    method: 'get',
    params
  })
}