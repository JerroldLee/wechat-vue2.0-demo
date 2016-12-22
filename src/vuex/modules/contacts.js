import {
    PERSON_INFO,
    CONTACT_FRIENDS,
    FRIEND_ID
} from '../mutation-types'

let state = {
    person_info: {
        base: {}
    },
    contact_friends: []
}
const mutations = {
    [PERSON_INFO](state, infoObj) {
        state.person_info = infoObj
    },
    [CONTACT_FRIENDS](state, arr) {
        state.contact_friends = arr;
    },
    [FRIEND_ID](state, id) {

    }
}
const actions = {
    get_person_info : ({ commit }, id, fn) => {
        let info = require('../../mock/person-info-' + id)
        commit('PERSON_INFO', info)
        !!fn && fn()
    },
    get_friends_list : ({ commit }, id) => {
        let friends = require('../../mock/contact')
        commit('CONTACT_FRIENDS', friends)
    }
}

export default {
    state,
    mutations,
    actions
}
