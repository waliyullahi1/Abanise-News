<template>
  <div>

    <NewsHeader></NewsHeader>
    <div class=" pt-36">
      <TableLatestNews class="  text-[poppins]  " ></TableLatestNews>
      <section class=" lg:w-[88%] w-[96%]  md:pt-0   mt- mx-auto">
        <h2 class="text-[20px] font-medium">Latest News </h2>

        <div class=" flex gap-4 w-full">

          <div class="  md:w-[70%] gap-2">


            <div class="  w-full   border-y-4  h-fit border-y-primary  mt-2 shadow-lg bg-white ">
              <div class=" grid sm:grid-cols-3 grid-cols-1 gap-3 w-full">

                <div v-for="item in paginatedData" :key="item.title"
                  class="sm:block gap-3  p-2 justify-start items-center">
                  <div class="h-full group justify-center items-center gap-2">
                    <nuxt-link target="_blank" :to="`${item.route}`"
                      class="group bg-black gap-2 m overflow-hidden flex justify-center items-center h">
                      <div class="h-32 w-full"></div>
                      <img v-bind:src="item.image" class="hover:opacity-30 duration-500 w-72" alt="">
                      <img src="@/assets/abanisee1.png" alt=""
                        class="opacity-0 duration-500 group-hover:opacity-100 opacity- absolute w-10">
                      <div class="relative w-full h-fulls bg-black"></div>
                    </nuxt-link>
                    <NuxtLink class="text-[15px]" target="_blank" :to="`/${item.route}`">
                      <h3 class="hover:text-primary font-normal">{{ item.title }}</h3>
                    </NuxtLink>
                  </div>
                </div>





              </div>

            </div>
            <div class=" flex  justify-between">

              <div class="flex w-1/2">


                <div class=" flex  flex gap-4 div-class  overflow-scroll gap-4 =">
                  <button class="   flex " v-for="number in totalPages" :key="number" @click="goToPage(number)">
                    <nuxt-link class="h-fit text-[18px] font-medium " :to="{ path: '/', query: { page: number } }">
                      <p :class="{ 'bg-primary text-white': currentPage === number, 'bg-white': currentPage !== number }"
                        class=" w-full text-[14px] px-2 text-red-950">{{ number }}</p>
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
    <NavigationFooter></NavigationFooter>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';



const allNews = ref([]);
const perPage = ref(6);
const news = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
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
const replaceSpace = (words) => {
  console.log(words);
  if (words !== null && words !== undefined) {
    const wordsWithOutSpace = words.replace(/\s+/g, '-')
    return wordsWithOutSpace;
  }
  console.log('finished');;
}
const fetchData = async () => {
  
  const response = await fetch(`http://localhost:3500/news`);
  news.value = await response.json();
   console.log(news.value)
 
  await updateImageUrls();
}

onMounted(fetchData,);




const totalPages = computed(() => {
  return Math.ceil(news.value.length / perPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    const router = useRouter();
    router.push({ path: '/news', query: { page: currentPage.value + 1 } });
  }
};

const goToPage = async (pageNumber) => {
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

.div-class {
  /* Enables scrolling if content overflows */
  overflow: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.router-link-active {
  background-color: #164b3b;
  color: white;

}
</style>