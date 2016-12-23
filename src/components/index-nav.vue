<template>
    <nav>
        <dl v-for="(item,$index) in index_nav" @click="set_menu_active($index)">
            <!-- props动态绑定目标位置的对象 -->
            <router-link  :to="item.path">
            <dt class="iconfont" :class="item.iconClass">
                <!-- 过滤器不能写在v-text里面 -->
                <i v-if="item.hint.count" v-text="" :class="'_news-'+item.hint.type">{{item.hint | get_prompt}}</i>
            </dt>
            <dd v-text="item.text"></dd>
            </router-link>
        </dl>
    </nav>
</template>
<script>
// import {
//     index_nav
// } from 'getters'
// import {
//     get_index_nav,
//     set_menu_active
// } from 'actions'

export default {
    // vuex: {
    //     getters: {
    //         index_nav
    //     },
    //     actions: {
    //         get_index_nav,
    //         set_menu_active
    //     }
    // },
    props: {},
    computed: {
        index_nav() {
            // 这里必须要加return
            return this.$store.state.base.index_nav;
        }
    },
    data() {
        return {}
    },
    filters: {
        get_prompt(hint) {
            return hint.count
        }
    },
    mounted() {
        let index_nav = require('../mock/index-nav');
        this.$store.dispatch('get_index_nav',index_nav);
    },
    methods: {
        set_menu_active($index) {
            this.$store.dispatch('set_menu_active',$index);
        }
    }
}
</script>
<style scoped>
nav {
    display: flex;
    width: 100%;
    overflow: hidden;
    height: 50px;
    padding-top: 8px;
    background: #f9f9f9;
    font-size: 12px;
}

nav dl {
    user-select: none;
    -webkit-user-select: none;
    flex-grow: 1;
    text-align: center;
    line-height: 1;
}

nav dl.v-link-active dl,
nav dl.v-link-active dt {
    color: #0bb908;
}

nav dt {
    position: relative;
    width: 28px;
    height: 28px;
    margin: 0 auto;
    font-size: 28px;
    color: #797979;
    margin-bottom: 2px;
}

nav dd {
    color: #929292;
    transform-origin: 50% 0;
    transform: scale(0.9);
}

nav ._news-dot {
    right: -2px;
    top: -3px;
    width: 11px;
    height: 11px;
}
</style>
