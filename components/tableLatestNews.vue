<template>
    <div id="myDiv" class="  w-[98%] mx-auto  h-0  overflow-visible  sticky top-0  place-content-center  justify-end md:flex  hidden">
        <div class=" w-[30%] ">
          <div class=" m  top-0  mt-5 shadow-lg bg-white ">
            <h3>Latest Posts</h3>
            <div v-for="item in paginatedData" :key="item.id" class="  ">
             
                <NuxtLink target="_blank" :to="`news/${item._id}`">
                    <h3 class=" px-4  py-3 border-t-2 text-[13px]  hover:text-primary ">{{ item.title }} </h3>
                
                  </NuxtLink>
            </div>
          </div>
        </div>  
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';




// Access the data from the store

const allNews = ref([]);
const perPage = ref(9);
const news = ref([
  {},{},{},{},{},{}
]);


const route = useRoute()
const page =1
const limit = perPage.value
const skip = (page - 1) * limit

const fetchData = async () => {
  try {
     const response = await axios(`https://new.abaniseedu.com/news`);
  news.value = await response.data;
 
  currentPage.value = page 
  } catch (error) {
    
  }

}

fetchData()
let scrollHandler = null



onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
})

const currentPage = computed(() => {
  const route = useRoute();
  return  1;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return news.value.slice(start, end);
});


const totalPages = computed(() => {
  return Math.ceil(news.value.length / perPage.value);
});

const props = defineProps({
  news: Array,
  
 
});
</script>

<style>

.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* Adjust this value as needed */
}

.router-link-active {
  background-color: #164b3b;
  color: white;
}
</style>
  
<style scoped>
#myDiv {
  position: sticky;
  top: 0;
}
</style>