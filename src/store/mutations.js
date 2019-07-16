import * as types from './mutation-types'

export default {
  //key为types.UPDATE_NICKNAME,value为一个函数，函数名为types.UPDATE_NICKNAME
  [types.UPDATE_NICKNAME](state, nickname) {
    state.nickname = nickname;
  },
  [types.UPDATE_CARTCOUNT](state, cartCount) {
    state.cartCount = cartCount;
  }
}
