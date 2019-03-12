import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchParams: {},
    wordsParams: {},
    allegoricalParams: {},
    idiomParams: {}
  },
  mutations: {
    updateSearchParams (state, args) {
      state.searchParams = args
    },
    changePage (state, page) {
      state.searchParams.page = page
    },
    changePageSize (state, pageSize) {
      state.searchParams.pageSize = pageSize
    },
    updateWordsParams (state, args) {
      state.wordsParams = args
    },
    changeWordsPage (state, page) {
      state.wordsParams.page = page
    },
    changeWordsPageSize (state, pageSize) {
      state.wordsParams.pageSize = pageSize
    },
    updateAllegoricalParams (state, args) {
      state.allegoricalParams = args
    },
    changeAllegoricalPage (state, page) {
      state.allegoricalParams.page = page
    },
    changeAllegoricalPageSize (state, pageSize) {
      state.allegoricalParams.pageSize = pageSize
    },
    updateIdiomParams (state, args) {
      state.idiomParams = args
    },
    changeIdiomPage (state, page) {
      state.idiomParams.page = page
    },
    changeIdiomPageSize (state, pageSize) {
      state.idiomParams.pageSize = pageSize
    }
  },
  actions: {

  }
})
