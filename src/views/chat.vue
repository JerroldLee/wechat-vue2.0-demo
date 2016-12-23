<template>
    <div class="chat">
        <div class="_full_inner _scroll _effect component-chat" :class="{'_effect--30':decline}">
            <search-bar></search-bar>
            <ul class="wechat-list">
                <li class="item _line-fine" v-for="(item,$index) in wechat_list" transition="chat-item">
                    <div class="info" :class="{
                        'current':currentIndex==$index
                        }" @touchstart="info_touchstart($index)" @click="info_tap($index)" >
                        <div class="ico-box">
                            <i :class="item.chatConfigModel" v-text="" v-show="item.chatBaseModel"></i>
                            <div class="ico">
                                <img :src="item.base.iconSrc" alt="pic">
                            </div>
                        </div>
                        <div class="desc">
                            <div class="desc-time" v-text="">{{item.chatBaseModel.endTimeStr | f_date}}</div>
                            <div class="desc-title" v-text="item.base.name"></div>
                            <div class="desc-message">
                                <div class="desc-mute iconfont icon-mute" :title="item.chatConfigModel.newsMute" v-show="item.chatConfigModel.newsMute"></div>
                                <span :title="item.base.type" v-show="item.base.type==='friends'" v-text="">{{item.chatBaseModel.endChatAuth+':'}}</span>
                                <span v-text="item.chatBaseModel.endChatTxt"></span>
                            </div>
                        </div>
                    </div>
                    <div class="handle">
                        <div class="handle-unread" @click='increase_newsState($index,1)' v-show="item.chatBaseModel.newsUnreadCount==0">标为未读</div>
                        <div class="handle-unread" @click='increase_newsState($index,0)' v-show="item.chatBaseModel.newsUnreadCount>0">标为已读</div>
                        <div class="handle-del" @click="delete_item($index)">删除</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- router -->
        <router-view></router-view>
    </div>
</template>
<script>
// import {
//     wechat_list
// } from 'getters'
// import {
//     get_menu_wechat_list,
//     set_menu_active,
//     set_chat,
//     set_chat_count,
//     set_news_state,
//     delete_news
// } from '../vuex/actions'
import searchBar from 'components/search-bar.vue'

export default {
    // vuex: {
    //     getters: {
    //         wechat_list
    //     },
    //     actions: { 
    //         get_menu_wechat_list,
    //         set_menu_active,
    //         set_chat,
    //         set_chat_count,
    //         set_news_state,
    //         delete_news
    //     }
    // },
    computed: {
        chat_base() {
            return this.$store.state.chat.chat_base;
        },
        wechat_list() {
            return this.$store.state.chat.wechat_list;
        }
    },
    route: {
        activate({
            from,
            to,
            next
        }) {

            this.set_menu_active(0)
            next()
        }
    },
    data() {
        return {
            decline: false,
            currentIndex: -1, //列表item处在左划状态
            isTouchSwipe: false, //验证是否处于左划状态
        }
    },
    events: {
        'route-pipe' (_decline) {
            this.decline = _decline
            this.$parent.$emit('route-pipe', _decline)
        }
    },
    methods: {
        info_touchstart(_index) {
            this.currentIndex = -1
        },
        // 跳转到聊天窗口
        info_tap(_index) {
            var index = _index;
            if (index >= 0 && !this.isTouchSwipe) {
                // this.set_chat(this.wechat_list[index])
                // $router.go改为$router.push
                this.$router.push({
                    path: "/chat/dialogue"
                })
            }
            this.isTouchSwipe = false
        },
        info_swipeleft(_index) {
            event.stopPropagation()
            if (!this.isTouchSwipe) {
                this.isTouchSwipe = true
                this.currentIndex = _index
            } else {
                this.isTouchSwipe = false
            }
        },
        computed_unRead_count() {
            //计算未读数量
            let sum = 0;
            console.log(this.wechat_list)
            this.wechat_list.forEach(({
                chatBaseModel,
                chatConfigModel
            }, index) => {
                if (!chatConfigModel.newsMute) {
                    let count = chatBaseModel.newsUnreadCount
                    sum += count
                }
            })
            this.set_chat_count(sum)
        },
        increase_newsState(index, val) {
            this.isTouchSwipe = false;
            //改变已读未读状态并回调计算未读总和
            this.set_news_state(index, val, () => {
                this.currentIndex = -1
                this.computed_unRead_count()
            })
        },
        delete_item(index) {
            this.delete_news(index, () => {
                this.currentIndex = -1;
                this.computed_unRead_count()
            })

        }
        // get_menu_wechat_list() {
        //     this.$store.dispatch('get_menu_wechat_list',list)
        // }
    },
    mounted() {
            this.$store.dispatch('get_menu_wechat_list')
    },
    filters: {
        // 过滤器函数总接受表达式的值作为第一个参数
        // f_news: function(obj,attr) {
            
        // }
        f_news(obj, attr) {
            var obj = obj || {}
            let newsClass = obj.newsMute ? '_news-dot' : '_news-count'
            let newsText = !obj.newsMute ? obj.newsUnreadCount : ''
            let newsShow = (obj.newsUnreadCount > 0)
            let o = {
                nclass: newsClass,
                ntext: newsText,
                nshow: newsShow
            }
            return o[attr]
        },
        // 时间戳转换
        f_date(date) {
            var oDate=new Date(date*1000);
            return oDate.getHours()+':'+oDate.getMinutes();
        }
    },
    components: {
        searchBar
    },
    // created() {
    //     this.get_menu_wechat_list(() => {
    //         this.computed_unRead_count()
    //     })
    // }
}
</script>
<style scoped>
</style>
