<template>
  <div>
    <NewsHeader />

    <div class="pt-36">
      <TableLatestNews class="text-[poppins]" />

      <div class="flex md:w-[90%] w-[98%] mx-auto">
        <div class="text-xl md:w-[70%] w-full sm:mt-0 mt-32">
          <div class="mt-5 sm:py-5 py-5 shadow-xl w-full px-2">

            <!-- PAGE TITLE -->
            <h1 class="mb-6 text-2xl font-bold capitalize">
              {{ categoryTitle }} News
            </h1>

            <!-- LOADING -->
            <div v-if="pending" class="py-10 text-center text-gray-500">
              Loading news...
            </div>

            <!-- ERROR -->
            <div v-else-if="error" class="py-10 text-center text-red-500">
              Failed to load news
            </div>

            <!-- EMPTY -->
            <div v-else-if="!allNews.length" class="py-10 text-center text-gray-500">
              No news found in this category
            </div>

            <!-- NEWS LIST -->
            <div v-else class="space-y-8">
              <div
                v-for="item in allNews"
                :key="item._id"
                class="border-b pb-6"
              >
                <!-- title -->
                <NuxtLink :to="`/news/${item.slug}`" target="_blank">
                  <h2 class="text-xl font-bold hover:text-primary mb-3">
                    {{ item.title }}
                  </h2>
                </NuxtLink>

                <!-- image -->
                <NuxtLink
                  v-if="item.image"
                  :to="`/news/${item.slug}`"
                  target="_blank"
                >
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-full max-h-[350px] object-cover rounded mb-4"
                  />
                </NuxtLink>

                <!-- excerpt / content -->
                <div
                  v-if="item.excerpt"
                  v-html="item.excerpt"
                  class="entry text-[15px] pb-1"
                ></div>

                <!-- read more -->
                <NuxtLink :to="`/news/${item.slug}`" target="_blank">
                  <button
                    class="mt-3 py-2 px-4 text-[14px] duration-500 text-white hover:bg-gray-500 bg-primary"
                  >
                    Read More »
                  </button>
                </NuxtLink>
              </div>
            </div>

            <!-- PAGINATION -->
            <div
              v-if="pagination.totalPages > 1"
              class="flex justify-between items-center mt-8"
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
        </div>
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
   Example: /news/category/post-utme
========================= */
const category = 'admission'

/* =========================
   PAGE FROM QUERY
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
    .trim()
})

/* =========================
   FETCH CATEGORY NEWS
========================= */
const {
  data: response,
  pending,
  error
} = await useAsyncData(
  () => `news-category-${category.value}-page-${currentPage.value}`,
  async () => {
    const query = new URLSearchParams({
      page: String(currentPage.value),
      limit: '10'
    })

    if (category.value) {
      query.append('category', category.value)
    }

    const res = await useApiFetch(`/news?${query.toString()}`, {
      method: 'GET'
    })
    console.log(res.data.data, 'res');
    
    if (!res?.success) {
      throw createError({
        statusCode: 500,
        statusMessage: res?.message || 'Failed to fetch news'
      })
    }

    return res.data
  },
  {
    watch: [category, currentPage]
  }
)

/* =========================
   EXTRACT DATA
========================= */
const allNews = computed(() => response.value?.data || [])

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
   CHANGE PAGE
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
.blur {
  backdrop-filter: blur(5px);
}

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

.entry #user-login ul {
  margin-bottom: -5px;
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