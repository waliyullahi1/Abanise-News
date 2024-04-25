<template>
  <div  >

    <NewsHeader ></NewsHeader>
<div class=" pt-36">
  <TableLatestNews class="  text-[poppins]  " ></TableLatestNews>
 <section  class=" lg:w-[88%] w-[96%]  md:pt-0   mt- mx-auto">
      <h2 class="text-[20px] font-medium">Latest News </h2>

      <div class=" flex gap-4 w-full">
      
        <div class="  md:w-[70%] gap-2">
       
        
          <div class="  w-full   border-y-4  h-fit border-y-primary  mt-2 shadow-lg bg-white ">
            <div class=" grid sm:grid-cols-3 grid-cols-1 gap-3 w-full">

              <div v-for="item in paginatedData" :key="item.title"
                class="sm:block gap-3  p-2 justify-start   items-center">


                <div class=" h-full   group justify-center items-center gap-2">
                  <NuxtLink target="_blank"  :to="`news/${item._id}`"
                    class=" grou bg-black min-h-60 gap-2 m overflow-hidden  flex justify-center items-center h ">
                    <div class=" h-32  w-full"></div>
                    <img v-bind:src="item.image" class="   hover:opacity-30 duration-500  w-72 " alt="">
                    <img src="@/assets/abanisee1.png" alt="" class=" opacity-0  duration-500  group-hover:opacity-100 opacity- absolute w-10  ">
                    <div class=" relative w-full h-full bg-black"></div>
                  </NuxtLink>
                  <NuxtLink class="text-[15px]" target="_blank" :to="`news/${item._id}`">
                    <h3 class="   hover:text-primary  font-normal  ">{{ item.title }}</h3>

                  </NuxtLink>
                </div>


              </div>




            </div>

          </div>
          <div class=" flex  justify-between">

            <div class="flex w-1/2">

            
              <div class=" flex gap-4 =">
                <button class="   flex " v-for="number in totalPages" :key="number" @click="goToPage(number)">
                  <nuxt-link class="h-fit text-[18px] font-medium " :to="{ path: '/news', query: { page: number } }">   <p :class="{'bg-primary text-white': currentPage === number, 'bg-white': currentPage !== number}" class=" w-full text-[14px] px-2 text-red-950">{{ number }}</p> 
                </nuxt-link>
                  
                </button>
              </div>

            </div>



            <div>
              <p class="text-[14px] font-medium">Page {{ currentPage }} of {{ totalPages }}</p>

            </div>
          </div>
        </div>

      </div>



    </section>
</div>
      
   
    <NewsSections :myProp="sectionpaginatedData" newstype="Admission" :endpoint="`admissionNews`" header="Latest Admission"></NewsSections> 
    <NewsSections  newstype="jamb" :endpoint="`jambNews`" header="Jamb"></NewsSections> 

    <NavigationFooter ></NavigationFooter>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMyStore } from '~/stores/myStore'



const allNews = ref([]);
const perPage = ref(6);
const news = ref([{},{},{},{},{},{},{},{},{},{},{},{}])
const sectionnews = ref([]);


const route = useRoute()
const page = parseInt(route.query.page) || 1

const currentPage = computed(() => {
  const route = useRoute();
  return parseInt(route.query.page) || 1;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return news.value.slice(start, end);
});

const updateImageUrls = async () => {
  let paginatedNews = paginatedData.value;
  const updatedNews = await Promise.all(paginatedNews.map(async (element) => {
    const imageResponse = await fetch(`http://localhost:3500/news/${element.image}`);
    element.image = imageResponse.url;
    return element;
  }));
  news.value = news.value.map(item => updatedNews.find(updatedItem => updatedItem._id === item._id) || item);
}

const fetchData = async () => {
  const response = await fetch(`http://localhost:3500/news`);
  news.value = await response.json();
  await updateImageUrls();
}

onMounted(fetchData, );




const totalPages = computed(() => {
  return Math.ceil(news.value.length / perPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    const router = useRouter();
    router.push({ path: '/news', query: { page: currentPage.value + 1 } });
  }
};

const goToPage = async(pageNumber) => {
  console.log();
  
    let paginatedNews = paginatedData.value;
    console.log('ffff');
  const updatedNews = await Promise.all(paginatedNews.map(async (element) => {
    if (!element.image.includes('http://localhost:350')) {
       const imageResponse = await fetch(`http://localhost:3500/news/${element.image}`);
    element.image = imageResponse.url;
    return element;
    }
    news.value = news.value.map(item => updatedNews.find(updatedItem => updatedItem._id === item._id) || item);
  }));
};


const previousPage = () => {
  if (currentPage.value > 1) {
    const router = useRouter();
    router.push({ path: '/news', query: { page: currentPage.value - 1 } });
  }
};
</script>





<style>
.title {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}



.router-link-active {
  background-color: #164b3b;
  color: white;

}
</style>