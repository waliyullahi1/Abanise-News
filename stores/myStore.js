// store/auth.ts
import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({
    data: null,
    isDataFetched: false
  }),
  actions: {
    
    async fetchData() {
      if (!this.isDataFetched) {
        const response = await fetch(`http://localhost:3500/news`)
        const allNews = await response.json()

        const updatedNews = await Promise.all(allNews.map(async (element) => {
          const imageResponse = await fetch(`http://localhost:3500/news/${element.image}`)
          element.image = imageResponse.url
          return element
        }))

       this.data  = updatedNews
        this.isDataFetched = true
        console.log(this.isDataFetched);
      }else {
      console.error('Store state has not been initialized')
    }
    }
  }
})
