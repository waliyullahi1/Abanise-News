<template>
  <section class="w-full mt-16">
    <div class=" mx-auto px-1 sm:px-4 lg:px-6">
      <!-- section title -->
      <h2 class="text-[28px] sm:text-[32px] font-bebas mb">
        {{ header }}
      </h2>

      <!-- MAIN LAYOUT -->
      <!-- left = news block, right space reserved for your table/latest sidebar -->
      <div class=" items-start">
        <!-- LEFT CONTENT -->
        <div class="">
          <div class="border-t-4 border-t-primary bg-white shadow-md">
            <!-- LOADING -->
            <div v-if="pending" class="p-2 text-center text-gray-500">
              Loading news...
            </div>

            <!-- ERROR -->
            <div v-else-if="error" class="p-6 text-center text-red-500">
              Failed to load news
            </div>

            <!-- CONTENT -->
            <div v-else>
              <!-- FEATURED / FIRST POST -->
              <div
                v-if="news.length"
                class="grid grid-cols-1 md:grid-cols-[42%_58%] gap-3 px-4 sm:px-2 p border-b"
              >
                <!-- image -->
                <NuxtLink
                  :to="`/${news[0].slug}`"
                  target="_blank"
                  class="group relative block overflow-hidden rounded bg-gray-100"
                >
                  <img
                    :src="news[0].image"
                    :alt="news[0].title"
                    class="w-full h-[220px] sm:h-[250px] object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                  />

                  <img
                    src="@/assets/abanisee1.png"
                    alt=""
                    class="absolute inset-0 m-auto w-10 opacity-0 transition duration-500 group-hover:opacity-100"
                  />
                </NuxtLink>

                <!-- text -->
                <div class="flex flex-col justify-center">
                  <NuxtLink :to="`/${news[0].slug}`" target="_blank">
                    <h3
                      class="text-[20px] sm:text-[22px] leading-[1.3] font-semibold hover:text-primary transition line-clamp-3"
                    >
                      {{ news[0].title }}
                    </h3>
                  </NuxtLink>

                  <p class="mt-3 text-[14px] sm:text-[15px] leading- text-gray-700 line-clamp-5">
                    {{ news[0].excerpt }}
                  </p>

                  <NuxtLink
                    :to="`/${news[0].slug}`"
                    target="_blank"
                    class="mt-4"
                  >
                    <button
                      class="px-4 py-2 text-[14px] text-white bg-primary hover:bg-gray-700 transition"
                    >
                      Read More »
                    </button>
                  </NuxtLink>
                </div>
              </div>

              <!-- GRID LIST -->
              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 px-1 sm:px-5 py-5"
              >
                <div
                  v-for="item in sideNews"
                  :key="item._id || item.slug"
                  class="flex gap-3 bg-white p-2 rounded border hover:shadow-sm transition"
                >
                  <!-- image -->
                  <NuxtLink
                    :to="`/${item.slug}`"
                    target="_blank"
                    class="w-[110px] sm:w-[130px] shrink-0 overflow-hidden rounded bg-gray-100"
                  >
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-full h-[85px] sm:h-[95px] object-cover hover:scale-105 transition duration-500"
                    />
                  </NuxtLink>

                  <!-- title -->
                  <div class="flex-1 min-w-0">
                    <NuxtLink :to="`/${item.slug}`" target="_blank">
                      <h3
                        class="text-[14px] sm:text-[15px] leading-6 font-medium hover:text-primary transition line-clamp-3"
                      >
                        {{ item.title }}
                      </h3>
                    </NuxtLink>

                    
                  </div>
                </div>

                <div
                  v-if="!sideNews.length && news.length <= 1"
                  class="col-span-full text-center py-6 text-gray-500"
                >
                  No news found
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT SPACE -->
        <!-- This keeps this section from touching your TableLatestNews/sidebar -->
        <div class="hidden lg:block lg:w-[32%] xl:w-[30%]"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  header: {
    type: String,
    default: 'Latest News'
  },
  endpoint: {
    type: String,
    default: ''
  },
  newstype: {
    type: String,
    default: '/news'
  }
})

/* =========================
   CATEGORY / ENDPOINT
========================= */
const category = computed(() => props.endpoint?.trim() || '')

/* =========================
   FETCH NEWS
========================= */
const {
  data: response,
  pending,
  error
} = await useAsyncData(
  () => `news-section-${category.value || 'all'}`,
  async () => {
    const query = new URLSearchParams({
      page: '1',
      limit: '9'
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

    // backend shape:
    // { success: true, data: [...], pagination: {...} }
    return res.data
  },
  {
    watch: [category]
  }
)

/* =========================
   NEWS ARRAY
========================= */
const news = computed(() => response.value?.data || [])

/* =========================
   SMALL GRID ITEMS
   first item = featured
   remaining = side items
========================= */
const sideNews = computed(() => {
  if (!news.value.length) return []
  return news.value.slice(1, 9)
})

/* =========================
   FORMAT DATE
========================= */
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style>
.font-bebas {
  font-family: 'Bebas Neue', sans-serif;
}
</style>