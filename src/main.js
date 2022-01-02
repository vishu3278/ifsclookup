import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
// import vuetify from './plugins/vuetify';
import './assets/icomoon.css';
import '../node_modules/bulma/bulma.sass';
import './assets/style.css';

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        search: '',
        bank: '',
        state: '',
    },
    getters: {
        getSearchString: (state) => {
            return state.search
        }
    },
    mutations: {
        updateBankID(state, bankid) {
            state.bank = bankid
        },
        set_search_string(state, payload) {
            state.search = payload
        }
    },
    actions: {
        searched({ commit }, payload) {
            commit('set_search_string', payload)
        }
    }
})

new Vue({
    router,
    // vuetify,
    store,
    render: h => h(App)
}).$mount('#app')