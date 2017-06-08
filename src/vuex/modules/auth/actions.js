import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  SESSION
} from './mutation-types'

import axios from '../../../services/axios'

export function login ({ commit }, user) {
  return new Promise((resolve, reject) => {
    axios.post('/signin', user)
    .then(response => {
      console.log(response.data)
      commit(LOGIN, response.data.user)
      localStorage.token = response.data.token
      axios.defaults.headers.authorization = 'Bearer ' + response.data.token
      resolve(response.data.user)
    })
    .catch(error => {
      console.log('error')
      reject(error)
    })
  })
}

export function session ({ commit }) {
  return new Promise((resolve, reject) => {
    axios.get('/auth/user')
    .then(response => {
      console.log(response.data)
      commit(SESSION, response.data.user)
      resolve(response.data.user)
    })
    .catch(error => {
      delete localStorage.token
      console.log('error')
      reject(error)
    })
  })
}

export function signup ({ commit }, user) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      commit(SIGNUP, user)
      localStorage.token = Math.random().toString(36).substring(7)
      resolve(user)
    }, 1000)
  })
}

export function logout ({ commit }, user) {
  return new Promise((resolve, reject) => {
    delete localStorage.token
    commit(LOGOUT, user)
    resolve(user)
  })
}
