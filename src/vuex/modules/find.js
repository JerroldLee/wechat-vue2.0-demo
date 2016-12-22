// import { } from '../mutation-types'
let state = {
    iframe_url:'',
    iframe_title:''
}
const mutations = {
    ['SET_IFRAME_URL'](state,urlObj){
        state.iframe_url = urlObj.url
        state.iframe_title = urlObj.title
    }
}
const actions = {
	set_iframe_url : ({ commit }, urlObj, fn) => {
	    commit('SET_IFRAME_URL', urlObj)
	    !!fn && fn()
	}
}

export default {
  state,
  mutations,
  actions
}