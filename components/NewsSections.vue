<template>
  <section class=" lg:w-[80%] w-[96%] mt-20 mx-auto">
    <h2 class="text-xl font-medium">{{ props.header }} </h2>
    <div class=" flex gap-4 w-full">
      <div class="  md:w-[70%] w-full ">


        <div class="    border-y-4  border-y-primary  mt-2 shadow-lg bg-white ">
          <div>

            <div v-if="news.length > 0"
              class="sm:flex gap-3 sm:px-10 py-5 px-4 border-b-2  justify-start   items-center">
              <div class=" sm:w-2/5 w-full group  py-3 flex justify-center items-center ">
                <NuxtLink target="_blank" :to="`${props.newstype}/${news[0]._id}`"
                  class=" grou bg-black gap-2 m overflow-hidden  flex justify-center items-center h ">
                  <div class=" h-32  w-full"></div>
                  <img v-bind:src="news[0].image" class="v hover:opacity-30 duration-500  " alt="">
                  <img src="@/assets/abanisee1.png" alt=""
                    class=" opacity-0  duration-500  group-hover:opacity-100 opacity- absolute w-10  ">
                  <div class=" relative w-full h-full bg-black"></div>
                </NuxtLink>

              </div>
              <div class=" sm:w-3/5  w-full  r">
                <h3 class="  sm:text-[16px] text-[16px] hover:text-primary  font-medium ">{{ news[0].title }} </h3>

                <h3 v-html="truncateText(extractFirstElements(news[0].content))"
                  class=" text-[13px]  sm:text-[15px] ov"></h3>
                <NuxtLink target="_blank" :to="`${props.newstype}/${news[0].route}`">

                  <button class=" mt-2 py-1 px-2 text-[14px] duration-500 text-white hover:bg-gray-500 bg-primary">Read
                    More »</button>
                </NuxtLink>


              </div>

            </div>

            <div class="grid gap-3 bg-gray-100 h-fit sm:px-5 px-2 font-normal  py-3 grid-cols-1 sm:grid-cols-2">
              <div v-for="(item, index) in paginatedData.slice(2, 9)" :key="item.id"
                class="flex gap-2 justify-center  items-center">
               
                  <div class=" sm:w-2/5 w-20 group  py-3 flex justify-center items-center ">
                    <NuxtLink target="_blank" :to="`${props.newstype}/${news[0].route}`"
                      class=" grou bg-black  gap-2 m overflow-hidden  flex justify-center items-center h ">
                      <div class=" hfull  w-full"></div>
                      <img v-bind:src="item.image" class="v hover:opacity-30 duration-500  " alt="">
                      <img src="@/assets/abanisee1.png" alt=""
                        class=" opacity-0  duration-500  group-hover:opacity-100 opacity- absolute w-10  ">
                      <div class=" relative w-full h-full group-bg-black"></div>
                    </NuxtLink>

                  </div>
               
                <div class=" w-3/5">
                  <NuxtLink target="_blank" :to="`${props.newstype}/${news[0].route}`">

                    <h3 class=" text-[14px] sm:py-4 cursor-pointer hover:text-green-700   px-2 font-[500]">{{ item.title
                      }}</h3>
                  </NuxtLink>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>



  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  myProp: Array,
  newstype: String,
  header: String,
  endpoint: String
})


const perPage = ref(4)
const news = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])

const paginatedData = computed(() => {

  return news.value.slice(0, 6);
});

const updateImageUrls = async () => {
  let paginatedNews = paginatedData.value;
  try {
    const updatedNews = await Promise.all(paginatedNews.map(async (element) => {
    const imageResponse = await fetch(`http://localhost:3500/news/${element.image}`,{
     method : "GET",
     headers: {'Content-Type':'application/json'},
     credentials:'include',
     
   });
    element.image = imageResponse.url;
    return element;
  }));
  news.value = news.value.map(item => updatedNews.find(updatedItem => updatedItem._id === item._id) || item);

  } catch (error) {
    
  }
  }

const fetchData = async () => {
  try {
   const response = await fetch(`https://new.abaniseedu.com/${props.endpoint}`,{
     method : "GET",
     headers: {'Content-Type':'application/json'},
     credentials:'include',
     
   });
  news.value = await response.json();
  await updateImageUrls(); 
  } catch (error) {
    
  }
  
}

onMounted(fetchData);

const currentPage = computed(() => {
  const route = useRoute()
  return 1
})
const extractFirstElements = (htmlContent, limit) => {
  try {
      let tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  let allElements = Array.from(tempDiv.children);
  let firstElements = allElements.slice(0, limit);
  return firstElements.map(el => el.outerHTML).join('');
  } catch (error) {
    
  }

}

const truncateText = (text) => {
  try {
    let words = text.split(' ');
  if (words.length > 8) {
    words = words.slice(0, 8);
    return words.join(' ') + '...';
  } 
  } catch (error) {
    
  }
 
}


</script>

<style></style>