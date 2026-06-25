<template>
  <aside class="w-full">
    <div class="">
      <div class="sidebar-card bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="px-4 py-3 border-b bg-gray-50">
          <h3 class="text-[16px] font-bold text-gray-900">Latest Posts</h3>
        </div>

        <div v-if="pending" class="p-4 text-sm text-gray-500">
          Loading latest posts...
        </div>

        <div v-else-if="error" class="p-4 text-sm text-red-500">
          Failed to load latest posts
        </div>

        <div v-else-if="latestNews.length" class="divide-y divide-gray-100">
          <NuxtLink
            v-for="item in latestNews"
            :key="item._id || item.slug"
            :to="`${item.slug}`"
            target="_blank"
            class="flex gap-3 sm:p-3 p-1 hover:bg-gray-50 transition"
          >
            <img
              :src="getImage(item.image)"
              :alt="item.title"
              class="w-24 h-20 rounded-md object-cover shrink-0"
            />

            <div class="min-w-0 flex-1">
              <h4 class="text-[13px] leading-5 font-semibold text-gray-900 hover:text-primary line-clamp-3">
                {{ item.title }}
              </h4>

              <p v-if="item.excerpt" class="mt-1 text-[12px] text-gray-500 line-clamp-2">
                {{ stripHtml(item.excerpt) }}
              </p>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="p-4 text-sm text-gray-500">
          No latest posts found
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'

const {
  data: response,
  pending,
  error
} = await useAsyncData('latest-news-sidebar', async () => {
  const res = await useApiFetch('/news?page=1&limit=9', {
    method: 'GET'
  })

  if (!res?.success) {
    throw createError({
      statusCode: 500,
      statusMessage: res?.message || 'Failed to fetch latest news'
    })
  }

  return res.data
})

const latestNews = computed(() => response.value?.data || [])

const getImage = (image) => {
  if (!image) return '/images/placeholder-news.jpg'
  if (image.startsWith('http://') || image.startsWith('https://')) return image
  return `https://new.abaniseedu.com/news/${image}`
}

const stripHtml = (html = '') => {
  return html.replace(/<[^>]*>/g, '').trim()
}
</script>

<style>
.latest-news-sticky {
  position: sticky;
  top: 120px;
}

.sidebar-card {
  max-height: calc(100vh - 90px);
  overflow-y: auto;
}

.sidebar-card::-webkit-scrollbar {
  width: 6px;
}
.sidebar-card::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 999px;
}
.sidebar-card::-webkit-scrollbar-track {
  background: transparent;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}


</style>