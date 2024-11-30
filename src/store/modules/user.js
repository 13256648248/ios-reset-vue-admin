import { login, getDevicesList, getInfo, addDevice } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    coin: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_COIN: (state, coin) => {
    state.coin = coin
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const base64Password = btoa(password)

    return new Promise((resolve, reject) => {
      login({ mobile: username.trim(), pwd: base64Password }).then(response => {
        const { data } = response
        console.log('data', data)

        commit('SET_TOKEN', data.token.token)
        // commit('SET_NAME', data.nick_name)
        // commit('SET_AVATAR', data.mobile)
        setToken(data.token.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { nick_name, coin } = data
        console.log('data', data)

        commit('SET_NAME', nick_name)
        commit('SET_COIN', coin)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // 获取设备列表
  getDevicesList({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      getDevicesList(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addDevice({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      addDevice(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

