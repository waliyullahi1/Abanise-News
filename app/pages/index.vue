
<template>
  <div>
    <NewsHeader />
  <div v-if="pending" class="mt-5 py-5  w-full px-2">
            <p>Loading news...</p>
          </div>

          <!-- ERROR -->
  <div v-else-if="error" class="mt-5 py-5 shadow-xl w-full px-2 text-red-500">
    <p>Failed to load news</p>
  </div>

    <main v-else class="bg-[#f8f8f8] pt- pb-12">
      <div class="max-w-7xl mx-auto px-1 sm:px-4">

        <!-- TOP SECTION -->
        <div class="grid lg:grid-cols-12 gap-6">

          <!-- LEFT SIDEBAR -->
          
          <aside class="lg:col-span-3 lg:block  hidden">
            <div class="bg-white p-1 sm:p-5 rounded-xl shadow-sm">
              <h2 class="text-2xl font-bold mb-5">
                Latest Updates
              </h2>

              <div
                v-for="item in news?.data?.slice(0,6)"
                :key="item?._id"
                class="border-b py-4 last:border-0"
              >
                <NuxtLink
                  :to="`/${item?.slug}`"
                  class="font-semibold hover:text-primary transition"
                >
                  {{ item?.title }}
                </NuxtLink>

                <p class="text-xs text-gray-500 mt-2">
                  {{ item?.category?.[0] }}
                </p>
              </div>
            </div>
          </aside>
          <div class="block  lg:hidden ">
           <TableLatestNews class="text-[poppins]" />
          </div>
          

          <!-- FEATURED NEWS -->
          <section class="lg:col-span-6">
            <NuxtLink
              v-if="news?.data?.length"
              :to="`/${news?.data[0]?.slug}`"
              class="group block"
            >
              <div class="relative overflow-hidden rounded-2xl">

                <img
                  :src="news?.data[0]?.image"
                  :alt="news?.data[0].title"
                  class="w-full h-[550px] object-cover transition duration-700 group-hover:scale-105"
                >

                <div
                  class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                />

                <div
                  class="absolute bottom-0 left-0 right-0 p-2 sm:p-8"
                >
                  <span
                    class="bg-primary text-white px-4 py-2 rounded-full text-xs font-bold"
                  >
                    {{ news?.data[0]?.category?.[0] || 'Admission' }}
                  </span>

                  <h1
                    class="mt-4 text-xl sm:text-2xl md:text-4xl font-black text-white leading-tight"
                  >
                    {{ news?.data[0]?.title }}
                  </h1>

                  <p
                    v-if="news?.data[0]?.excerpt"
                    class="text-white/80  text-sm sm:text-lg mt-4"
                  >
                    {{ news?.data[0]?.excerpt }}
                  </p>
                </div>

              </div>
            </NuxtLink>
          </section>

          <!-- POPULAR -->
          <aside class="lg:col-span-3">
            <div class="bg-white sm:p-5 p-2 rounded-xl shadow-sm">
              <h2 class="text-2xl font-bold mb-5">
                Popular Posts
              </h2>

              <div
                v-for="item in news?.data?.slice(1,6)"
                :key="item?._id"
                class="flex gap-3 mb-5"
              >
                <img
                  :src="item?.image"
                  class="w-24 h-24 rounded-lg object-cover"
                >

                <div>
                  <NuxtLink
                    :to="`/${item?.slug}`"
                    class="font-semibold text-sm hover:text-primary line-clamp-3"
                  >
                    {{ item?.title }}
                  </NuxtLink>

                  <p class="text-xs text-gray-500 mt-2">
                    {{ item?.category?.[0] }}
                  </p>
                </div>
              </div>
            </div>
          </aside>

        </div>

        <!-- SECTION TITLE -->
        <div class="flex justify-between items-center mt-16 mb-8">
          <h2 class="sm:text-4xl text-2xl font-black">
            Latest Admission News
          </h2>

          <NuxtLink
            to="/category/admission"
            class="text-primary text-sm sm:text-lg font-semibold"
          >
            View All →
          </NuxtLink>
        </div>

        <!-- NEWS GRID -->
        <div
          v-if="news?.data?.length"
          class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <article
            v-for="item in news?.data"
            :key="item._id"
            class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition"
          >
            <NuxtLink :to="`/${item?.slug}`">
              <img
                :src="item?.image"
                :alt="item?.title"
                class="h-52 w-full object-cover hover:scale-105 transition duration-500"
              >
            </NuxtLink>

            <div class="p-4">

              <span
                class="inline-block text-[11px] font-bold text-primary uppercase"
              >
                {{ item?.category?.[0] }}
              </span>

              <NuxtLink :to="`/${item?.slug}`">
                <h3
                  class="font-bold mt-2 line-clamp-3 hover:text-primary"
                >
                  {{ item?.title }}
                </h3>
              </NuxtLink>

              <p class="text-xs text-gray-500 mt-3">
                {{
                  new Date(
                    item?.datePublished || item?.createdAt
                  ).toLocaleDateString('en-NG',{
                    year:'numeric',
                    month:'short',
                    day:'numeric'
                  })
                }}
              </p>

            </div>
          </article>
        </div>

        <!-- PAGINATION -->
        <div
          class="flex justify-center items-center gap-3 mt-12"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-5 py-3 rounded-lg border bg-white hover:bg-primary hover:text-white transition"
          >
            Previous
          </button>

          <span
            class="px-5 py-3 bg-primary text-white rounded-lg font-bold"
          >
            {{ currentPage }}
          </span>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-5 py-3 rounded-lg border bg-white hover:bg-primary hover:text-white transition"
          >
            Next
          </button>
        </div>

      </div>
    </main>
   <div class="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">


    <div  class="lg:col-span-2">
          <NewsSections
            newstype="Admission"
            endpoint="Admission"
            header="Latest Admission"
          />

          <NewsSections
            newstype="JAMB"
            endpoint="JAMB"
            header="JAMB Updates"
          />

          <NewsSections
            newstype="Scholarship"
            endpoint="Scholarships"
            header="Scholarship Updates"
          />

    </div>

   <div class="hidden  top-10 sticky -64 lg:block lg:col-span-1 self-start">
            <div class="">
           
            <TableLatestNews class="text-[poppins]" />
            </div>
          
         </div>
  </div>
    <NavigationFooter />
  </div>



</template>
<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

/* =========================
   CURRENT PAGE
========================= */
const currentPage = computed(() => {
  const page = parseInt(route.query.page)
  return !isNaN(page) && page > 0 ? page : 1
})

/* =========================
   CURRENT CATEGORY / SEARCH
   (optional if you later add filter in URL)
========================= */
const currentCategory = computed(() => route.query.category || '')
const currentSearch = computed(() => route.query.search || '')

/* =========================
   FETCH NEWS FROM BACKEND
   Backend already paginates
========================= */
const {
  data: response,
  pending,
  error,
  refresh
} = await useAsyncData(
  () => `all-news-page-${currentPage.value}-category-${currentCategory.value}-search-${currentSearch.value}`,
  async () => {
    const res = await useApiFetch('/news', {
      method: 'GET',
      params: {
        page: currentPage.value,
        limit: 6,
        ...(currentCategory.value ? { category: currentCategory.value } : {}),
        ...(currentSearch.value ? { search: currentSearch.value } : {})
      }
    })

    if (!res?.success) {
      throw createError({
        statusCode: 500,
        statusMessage: res?.message || 'Failed to fetch news'
      })
    }

  
    return res
  },
  {
    watch: [currentPage, currentCategory, currentSearch]
  }
)

/* =========================
   EXTRACT DATA
========================= */
const news = computed(() => response.value?.data || [])

const totalPages = computed(() => {
  return response.value?.data?.pagination?.totalPages || 1
})


/* =========================
   GO TO PAGE
========================= */
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return

  router.push({
    path: route.path,
    query: {
      ...route.query,
      page
    }
  })
}

/* =========================
   OPTIONAL:
   If page > totalPages after filter change,
   reset to page 1
========================= */
watch([currentCategory, currentSearch], () => {
  if (currentPage.value !== 1) {
    router.push({
      path: route.path,
      query: {
        ...route.query,
        page: 1
      }
    })
  }
})
</script>

<style scoped>
.title {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>