import {
    SET_MENU,
    SET_MENU_ACTIVE,
    BACK_PATH,
    SET_CHAT_COUNT
} from '../mutation-types'

let state = {
    backPath: '',
    index_nav: [{
        index: 0,
        path: {
            path: '/chat'
        },
        hint: { type: "count", count: 0 }, //count,dot
        iconClass: 'icon-wechat',
        text: '微信'
    }],
    menu_active: { text: "", index: 0 },
}
const mutations = {
    [SET_MENU](state, index_nav) {
        state.index_nav = index_nav;
    },
    [SET_MENU_ACTIVE](state, _index) {
        //底部导航激活
        state.menu_active = state.index_nav[_index]
    },
    [BACK_PATH](state, _path) {
        //设置返回按钮跳转路径,router.afterEach设置
        state.backPath = { path: _path };
    },
    [SET_CHAT_COUNT](state, count) {
        state.index_nav[0].hint.count = count;
    }
}
const actions = {
    get_index_nav : ({ commit },index_nav) => {
        
        commit('SET_MENU', index_nav)
    },
    set_menu_active : ({ commit }, _index) => {
        commit('SET_MENU_ACTIVE', _index)
    },
    set_chat_count : ({ commit }, count) => {
        commit('SET_CHAT_COUNT', count)
    }
}

export default {
    state,
    mutations,
    actions
}
