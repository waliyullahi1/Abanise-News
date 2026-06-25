<template>
  <div class="">
    <NewsHeader />
    <Adsbygoogle />

    <div >
     

      <section class="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
       

        <div class="lg:col-span-2">
          <div class="md:w-[ w-full gap-2">
           
            
            <div class="w-full border-b-4 h-fit border-b-primary px-1 sm:px-5 py-3 mt-2  bg-white">
              <!-- LOADING -->
              <h2 class="text-4xl  font-bebas font-medium font-medium">{{ props.header }}</h2>
              <p class=" w-full text-[15px]">{{ props.paragraph }}</p>
              <div class="  w-full h-1 bg-slate-500"></div>
              <!-- LOADING -->
              <div v-if="pending" class="grid grid-cols-1 gap-6 w-full mt-6">
                <div
                  v-for="n in 6"
                  :key="n"
                  class="sm:block gap-3 p-2 border-b-2 py-8 animate-pulse"
                >
                  <div class="h-full">
                    <!-- title skeleton -->
                    <div class="space-y-3 mb-4">
                      <div class="h-6 bg-gray-200 rounded w-[90%]"></div>
                      <div class="h-6 bg-gray-200 rounded w-[70%]"></div>
                    </div>

                    <div class="sm:gap-6 gap-3">
                      <!-- image skeleton -->
                      <div class="sm:px-5 float-left mr-4 mb-3">
                        <div class="w-72 h-40 bg-gray-200 rounded-md"></div>
                      </div>

                      <!-- excerpt skeleton -->
                      <div class="space-y-3">
                        <div class="h-4 bg-gray-200 rounded w-full"></div>
                        <div class="h-4 bg-gray-200 rounded w-[95%]"></div>
                        <div class="h-4 bg-gray-200 rounded w-[92%]"></div>
                        <div class="h-4 bg-gray-200 rounded w-[85%]"></div>

                        <!-- button skeleton -->
                        <div class="pt-2">
                          <div class="h-9 w-28 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ERROR -->
              <div v-else-if="error" class="py-10 text-center text-red-500">
                Failed to load news
              </div>

              <!-- EMPTY -->
              <div v-else-if="!news.length" class="py-10 text-center text-gray-500">
                No news found
              </div>

              <!-- NEWS LIST -->
              <div v-else class="grid-cols-1 gap-6 w-full">
                <div
                  v-for="item in news"
                  :key="item._id || item.slug"
                  class="sm:block gap-3 p-2 border-b-2 py-8 justify-start items-center"
                >
                  <div class="h-full group justify-center items-center gap-2">
                    <!-- TITLE -->
                    <NuxtLink target="_blank" :to="`/${item.slug}`">
                      <h2 class="hover:text-primary text-[15px] sm:text-xl mb-4 font-semibold">
                        {{ item.title }}
                      </h2>
                    </NuxtLink>

                    <div class="sm:gap-6 gap-3">
                      <!-- IMAGE -->
                      <div v-if="item.image" class="sm:px-5 float-left mr-4 mb-3">
                        <NuxtLink
                          target="_blank"
                          :to="`/${item.slug}`"
                          class="bg-black overflow-hidden flex justify-center items-center"
                        >
                          <img
                            :src="normalizeImage(item.image)"
                            class="hover:opacity-30 duration-500 w-72 h-40 object-cover"
                            :alt="item.title"
                          />
                        </NuxtLink>
                      </div>

                      <!-- EXCERPT -->
                      <div class="p">
                        <p class="text-[14px] leading-7">
                          {{ getExcerpt(item) }}
                        </p>

                        <NuxtLink target="_blank" :to="`/${item.slug}`">
                          <button
                            class="mt-2 py-1 px-2 text-[14px] duration-500 text-white hover:bg-gray-500 bg-primary"
                          >
                            Read More »
                          </button>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- PAGINATION -->
            <div class="grid grid-cols-2 overflow-hidden justify-between mt-4">
              <div class="flex">
                <div class="flex text-[14px] gap-2">
                  <!-- PREVIOUS -->
                  <NuxtLink
                    v-if="pagination.hasPrevPage"
                    class="py-1 text-[13px] px-4 border"
                    :to="{
                      path: route.path,
                      query: { ...route.query, page: currentPage - 1 }
                    }"
                  >
                    Previous
                  </NuxtLink>

                  <!-- NEXT -->
                  <NuxtLink
                    v-if="pagination.hasNextPage"
                    class="py-1 text-[13px] px-4 border"
                    :to="{
                      path: route.path,
                      query: { ...route.query, page: currentPage + 1 }
                    }"
                  >
                    Next
                  </NuxtLink>
                </div>
              </div>

              <div class="text-end">
                <p class="text-[14px] font-medium">
                  Page {{ pagination.page }} of {{ pagination.totalPages }}
                </p>
              </div>
            </div>
          </div>
        </div>


          <div class="hidden  top-10 sticky -64 lg:block lg:col-span-1 self-start">
            <div class="">
           
            <TableLatestNews class="text-[poppins]" />
            </div>
          
         </div>
      </section>

      
    </div>

    <Adsbygoogle />
   
    <NavigationFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  newstype: String,
  header: String,
  paragraph: String,
  routes: String,
  endpoint: String
})

const route = useRoute()

/* =========================
   CURRENT PAGE FROM QUERY
========================= */
const currentPage = computed(() => {
  const page = parseInt(route.query.page)
  return !isNaN(page) && page > 0 ? page : 1
})

/* =========================
   ITEMS PER PAGE
========================= */
const perPage = 6

/* =========================
   CATEGORY / ENDPOINT
   example:
   endpoint="admission"
   endpoint="jamb"
   endpoint="postutme"
========================= */




/* =========================
   CATEGORY FROM URL
   Example:
   /category/admission
   /category/jamb
   /category/post-utme
========================= */
const category = computed(() => {
  return route.params.category || 'Admission'
})
/* =========================
   FETCH NEWS FROM BACKEND SSR
========================= */
const {
  data: response,
  pending,
  error
} = await useAsyncData(
  () => `news-${category.value}-page-${currentPage.value}`,
  async () => {

    const query = new URLSearchParams({
      page: String(currentPage.value),
      limit: String(perPage)
    })

    if (category.value) {
      query.append('category', category.value)
    }

  
    const res = await useApiFetch(`/news?${query.toString()}`, {
      method: 'GET'
    })

    if (!res?.success) {
      throw createError({
        statusCode: 500,
        statusMessage: res?.message || 'Failed to fetch news'
      })
    }

    // expected backend response:
    // {
    //   success: true,
    //   data: [...],
    //   pagination: {...}
    // }
  ;
    
    return res.data
  },
  {
    watch: [category, currentPage]
  }
)

/* =========================
   NEWS LIST
========================= */
const news = computed(() => response.value?.data || [])

/* =========================
   PAGINATION
========================= */
const pagination = computed(() => {
  return (
    response.value?.pagination || {
      total: 0,
      page: 1,
      limit: perPage,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false
    }
  )
})

/* =========================
   EXCERPT HELPERS
========================= */
const stripHtml = (html = '') => {
  return String(html)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const getExcerpt = (item) => {
  const text = item?.excerpt || item?.content || ''
  const cleanText = stripHtml(text)

  if (!cleanText) return 'Click to read the full story.'

  return cleanText.length > 220
    ? cleanText.slice(0, 220) + '...'
    : cleanText
}

/* =========================
   IMAGE NORMALIZER
   if backend already returns full image url,
   it leaves it as is
========================= */
const normalizeImage = (image) => {
  if (!image) return ''
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }
  return `https://new.abaniseedu.com/news/${image}`
}
</script>

<style>
.title {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.div-class {
  overflow: auto;
}

.div-class::-webkit-scrollbar {
  display: none;
}

.div-class {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.router-link-active {
  background-color: #164b3b;
  color: white;
}
</style>