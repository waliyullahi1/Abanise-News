<template>
  <div>
    <NewsHeader />

    <div class="pt-36">
      <div class="w-[95%] max-w-[1400px] mx-auto flex gap-6 items-start">
        
        <!-- LEFT CONTENT -->
        <main class="w-full lg:w-[70%]">
          <div class="bg-white px-4 sm:px-6 py-5 shadow-sm border">
            <!-- PAGE TITLE -->
            <h1 class="text-3xl font-semibold capitalize mb-3">
              {{ categoryTitle }} News
            </h1>

            <!-- optional intro text like screenshot -->
            <p class="text-[15px] text-gray-700 mb-6 leading-7">
              For all the latest information on {{ categoryTitle }},
              registration updates, examination news, admission guides and
              other related announcements.
            </p>

            <!-- LOADING -->
            <div v-if="pending" class="py-10 text-center text-gray-500">
              Loading news...
            </div>

            <!-- ERROR -->
            <div v-else-if="error" class="py-10 text-center text-red-500">
              Failed to load news
            </div>

            <!-- EMPTY -->
            <!-- <div v-else-if="!allNews.length" class="py-10 text-center text-gray-500">
              No news found in this category
            </div> -->

            <!-- NEWS LIST -->
            <div  class="space-y-0">
            hjkhjgghkjg
              <article
                v-for="item in latestNews"
                :key="item._id"
                class="border border-gray-200 mb-6 bg-white"
              >
                <div class="p-5">
                  <!-- TITLE -->
                  <NuxtLink :to="`/news/${item.slug}`" target="_blank">
                    <h2 class="text-[28px] leading-tight font-medium hover:text-primary mb-3">
                      {{ item.title }}
                    </h2>
                  </NuxtLink>

                  <!-- META -->
                  <div class="flex items-center gap-4 text-[14px] text-gray-500 mb-5">
                    <span class="capitalize">{{ item.category || categoryTitle }}</span>
                    <span>{{ formatDate(item.datePublished || item.createdAt) }}</span>
                  </div>

                  <!-- CONTENT ROW -->
                  <div class="flex flex-col md:flex-row gap-6 items-start">
                    <!-- IMAGE -->
                    <NuxtLink
                      v-if="item.image"
                      :to="`/news/${item.slug}`"
                      target="_blank"
                      class="md:w-[42%] w-full flex-shrink-0"
                    >
                      <img
                        :src="item.image"
                        :alt="item.title"
                        class="w-full h-[220px] object-cover"
                      />
                    </NuxtLink>

                    <!-- TEXT -->
                    <div class="flex-1">
                      <p class="text-[16px] leading-9 text-gray-800">
                        {{ getExcerpt(item) }}
                      </p>

                      <NuxtLink :to="`/news/${item.slug}`" target="_blank">
                        <button
                          class="mt-5 bg-primary text-white px-5 py-2 text-[15px] hover:bg-green-700 transition"
                        >
                          Read More »
                        </button>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <!-- PAGINATION -->
            <div
              v-if="pagination.totalPages > 1"
              class="flex justify-between items-center mt-8 border-t pt-6"
            >
              <button
                @click="goToPage(currentPage - 1)"
                :disabled="!pagination.hasPrevPage"
                class="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>

              <p class="text-sm">
                Page {{ pagination.page }} of {{ pagination.totalPages }}
              </p>

              <button
                @click="goToPage(currentPage + 1)"
                :disabled="!pagination.hasNextPage"
                class="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </main>

        <!-- RIGHT SIDEBAR -->
        <aside class="hidden lg:block lg:w-[30%] sticky top-[110px] self-start">
          <div class="bg-[#f7f7f7] border border-gray-200">
            <h3 class="px-4 py-4 text-[24px] font-medium border-b bg-white">
              Latest Posts
            </h3>

            <div v-if="latestPending" class="p-4 text-gray-500 text-sm">
              Loading latest posts...
            </div>

            <div v-else-if="latestError" class="p-4 text-red-500 text-sm">
              Failed to load latest posts
            </div>

            <div v-else>
              <div
                v-for="post in latestNews"
                :key="post._id"
                class="border-b border-gray-200"
              >
                <NuxtLink
                  :to="`/news/${post.slug}`"
                  target="_blank"
                  class="block px-4 py-4 text-[16px] leading-7 hover:text-primary"
                >
                  {{ post.title }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <NavigationFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

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

console.log(category.value, 'category  dsdfs');

/* =========================
   CURRENT PAGE
========================= */
const currentPage = computed(() => {
  const page = parseInt(route.query.page)
  return !isNaN(page) && page > 0 ? page : 1
})

/* =========================
   PAGE TITLE
========================= */
const categoryTitle = computed(() => {
  return String(category.value || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, s => s.toUpperCase())
})

/* =========================
   FETCH CATEGORY NEWS
========================= */
/* =========================
   FETCH CATEGORY NEWS
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
    console.log(res.data.data);
    
    // backend shape:
    // { success: true, data: [...], pagination: {...} }
    return res.data
  },
  {
    watch: [category]
  }
)
console.log(response.value, 'response.value?.data');


/* =========================
   EXTRACT CATEGORY NEWS
========================= */
const allNews = computed(() => response.value?.data || [])
console.log(allNews, 'allNews');

const pagination = computed(() => {
  return (
    response.value?.pagination || {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false
    }
  )
})

/* =========================
   FETCH SIDEBAR LATEST POSTS
========================= */
const {
  data: latestResponse,
  pending: latestPending,
  error: latestError
} = await useAsyncData(
  'latest-news-sidebar',
  async () => {
    const res = await useApiFetch('/news?page=1&limit=8', {
      method: 'GET'
    })

    if (!res?.success) {
      throw createError({
        statusCode: 500,
        statusMessage: res?.message || 'Failed to fetch latest posts'
      })
    }
    console.log(res,'res');
    
    return res.data.data
  }
)

console.log(latestResponse.value, 'latestResponse');

const latestNews = computed(() => latestResponse.value || [])
console.log(latestNews.value, 'latestNews');

/* =========================
   HELPERS
========================= */
const stripHtml = (html = '') => {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

const getExcerpt = (item) => {
  if (item.excerpt) {
    return stripHtml(item.excerpt).slice(0, 240) + '...'
  }

  if (item.content) {
    return stripHtml(item.content).slice(0, 240) + '...'
  }

  return 'Click to read the full story.'
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/* =========================
   PAGINATION
========================= */
const goToPage = (page) => {
  if (page < 1 || page > pagination.value.totalPages) return

  router.push({
    path: route.path,
    query: {
      ...route.query,
      page
    }
  })
}
</script>

<style>
.entry {
  word-wrap: break-word;
  line-height: 22px;
}

.entry p {
  margin-bottom: 20px;
}

.entry img {
  max-width: 100%;
  height: auto;
}

.entry p a:hover {
  color: #007f26;
}

.entry li a:hover {
  color: #007f26;
}

.entry li a {
  color: #007f26;
}

body.single .post .entry a,
body.page .post .entry a {
  color: #1b9048;
  text-decoration: underline;
}

.entry h1,
.entry h2,
.entry h3,
.entry h4,
.entry h5,
.entry h6 {
  margin-top: 25px;
  margin-bottom: 10px;
  line-height: 1em;
  font-family: Helvetica;
  font-weight: normal;
}

.entry h1 {
  font-size: 36px;
}

.entry h2 {
  font-size: 30px;
}

.entry h3 {
  font-size: 24px;
}

.entry h4 {
  font-size: 18px;
}

.entry h5 {
  font-size: 14px;
}

.entry h6 {
  font-size: 12px;
}

.entry ol,
.entry ul {
  margin: 0 0 20px 15px;
}

.entry ul li {
  list-style: outside disc;
  list-style-image: none;
}

.entry ol li {
  list-style: outside decimal;
}

.entry li {
  margin: 0 0 5px 0;
}

.entry li ul,
.entry li ol {
  margin: 5px 0 0 15px;
}

.entry table {
  border-spacing: 0;
  width: 100%;
  border: 1px solid #eee;
  border-collapse: separate;
  margin-bottom: 1.5em;
}

.entry table tr:nth-child(even) {
  background: #f9f9f9;
}

.entry table td,
.entry table th {
  padding: 0.4em;
  text-align: left;
  border-right: 1px dotted #eee;
}

.entry table thead th {
  background: #f4f4f4;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  text-transform: uppercase;
  padding: 0.7em 0.4em;
  vertical-align: middle;
}

.entry table tbody th {
  background: #f4f4f4;
  border-bottom: 1px solid #eee;
}

.entry table tbody td {
  border-bottom: 1px solid #eee;
}

.entry table tr th:last-child,
.entry table tr td:last-child {
  border-right: 0;
}

.entry table tbody tr:last-child td,
.entry table tbody tr:last-child th {
  border-bottom: 0;
}
</style>