<template>
  <header
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-transform duration-500',
      hideHeader ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <!-- ================= TOP BAR ================= -->
    <div class="bg-[#0f172a] text-white text-[12px] border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <div class="flex flex-wrap items-center gap-3">
          <p class="text-gray-200">
            Phone:
            <span class="text-white font-medium">07068393706</span>
          </p>
          <span class="text-gray-500 hidden sm:inline">|</span>
          <p class="text-gray-200">
            Email:
            <span class="text-white font-medium">alfaabanise@gmail.com</span>
          </p>
        </div>

        <div class="hidden md:flex items-center gap-4 text-gray-300">
          <NuxtLink to="/" class="hover:text-white transition">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:text-white transition">About</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-white transition">Contact</NuxtLink>
        </div>
      </div>
    </div>

    <!-- ================= MAIN HEADER ================= -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4">
        <div class="h-[74px] flex items-center justify-between gap-4">
          <!-- LEFT: MOBILE MENU BUTTON -->
          <button
            @click="mobileOpen = !mobileOpen"
            class="lg:hidden flex items-center justify-center w-10 h-10 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <svg
              v-if="!mobileOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- CENTER: LOGO -->
          <button @click="home"  class="flex items-center gap-3 shrink-0">
            <div class="w-11 h-11 flex items-center justify-center">
              <img src="/abanisee.png" alt="Abanise News" class="w-full h-full object-contain" />
            </div>

            <div class="leading-tight">
              <h1 class="text-[22px] md:text-[26px] font-extrabold tracking-tight text-gray-900">
                Abanise News
              </h1>
              <p class="text-[12px] text-gray-500 -mt-1">
                Education • Admission • JAMB • Post-UTME
              </p>
            </div>
          </button>

          <!-- RIGHT: SEARCH + HOME -->
          <div class="flex items-center gap-3">
            <!-- DESKTOP SEARCH -->
            <div ref="searchBoxRef" class="relative hidden md:block w-[300px]">
              <div class="flex items-center border border-gray-200 rounded-full px-3 h-10 bg-gray-50">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>

                <input
                  v-model="search"
                  type="text"
                  placeholder="Search news..."
                  class="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
                  @focus="handleFocus"
                  @keydown.enter.prevent="goToSearchPage"
                />

                <div v-if="searchLoading" class="ml-2 text-xs text-gray-400">
                  ...
                </div>
              </div>

              <!-- DESKTOP SEARCH DROPDOWN -->
              <div
                v-if="showSuggestions"
                class="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-[100]"
              >
                <div v-if="searchLoading" class="p-4 text-sm text-gray-500">
                  Searching...
                </div>

                <template v-else-if="searchResults.length">
                  <NuxtLink
                    v-for="item in searchResults"
                    :key="item._id || item.slug"
                    :to="`/${item.slug}`"
                    class="flex gap-3 px-4 py-3 hover:bg-gray-50 transition border-b last:border-b-0"
                    @click="closeSuggestions"
                  >
                    <!-- <img
                      :src="getImage(item.image)"
                      :alt="item.title"
                      class="w-16 h-14 rounded-lg object-cover shrink-0"
                    /> -->

                    <div class="min-w-0 flex-1">
                      <h4 class="text-[13px] font-semibold text-gray-900 line-clamp-2">
                        {{ item.title }}
                         <span v-if="item.datePublished">•</span>
                        <span v-if="item.datePublished">{{ formatDate(item.datePublished) }}</span>
                      </h4>

                      <div class="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
                       
                      
                      </div>
                    </div>
                  </NuxtLink>

                  <button
                    class="w-full text-left px-4 py-3 text-sm font-medium text-primary hover:bg-gray-50"
                    @click="goToSearchPage"
                  >
                    View all results for "{{ search }}"
                  </button>
                </template>

                <div v-else class="p-4 text-sm text-gray-500">
                  No result found for "{{ search }}"
                </div>
              </div>
            </div>

            <NuxtLink
              to="/"
              class="hidden sm:inline-flex items-center h-10 px-4 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition"
            >
              Home
            </NuxtLink>
          </div>
        </div>
      </div>
    </div> 

    <!-- ================= CATEGORY NAV ================= -->
    <div class="bg-white border-b border-gray-200 hidden lg:block">
      <div class="max-w-7xl mx-auto px-4">
        <nav class="overflow-x-auto no-scrollbar">
          <ul class="flex items-center gap-8 h-[52px] min-w-max">
            <li v-for="item in navItems" :key="item.label">
              <NuxtLink
                :to="item.to"
                class="relative text-[14px] font-medium text-gray-700 hover:text-primary transition py-3 inline-flex"
                active-class="nav-active"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- ================= MOBILE MENU ================= -->
    <transition name="fade-slide">
      <div
        v-if="mobileOpen"
        class="lg:hidden bg-white border-b border-gray-200 shadow-md"
      >
        <div class="max-w-7xl mx-auto px-4 py-4">
          <!-- MOBILE SEARCH -->
          <div ref="mobileSearchBoxRef" class="relative mb-4">
            <div class="flex items-center border border-gray-200 rounded-full px-3 h-11 bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>

              <input
                v-model="search"
                type="text"
                placeholder="Search news..."
                class="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
                @focus="handleFocus"
                @keydown.enter.prevent="goToSearchPage"
              />
            </div>

            <!-- MOBILE SEARCH DROPDOWN -->
            <div
              v-if="showSuggestions"
              class="mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
            >
              <div v-if="searchLoading" class="p-4 text-sm text-gray-500">
                Searching...
              </div>

              <template v-else-if="searchResults.length">
                <NuxtLink
                  v-for="item in searchResults"
                  :key="item._id || item.slug"
                  :to="`/news/${item.slug}`"
                  class="flex gap-3 px-4 py-3 hover:bg-gray-50 transition border-b last:border-b-0"
                  @click="closeSuggestionsAndMenu"
                >
                  <img
                    :src="getImage(item.image)"
                    :alt="item.title"
                    class="w-14 h-14 rounded-lg object-cover shrink-0"
                  />

                  <div class="min-w-0 flex-1">
                    <h4 class="text-[13px] font-semibold text-gray-900 line-clamp-2">
                      {{ item.title }}
                    </h4>
                    <div class="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
                      
                      <span v-if="item.datePublished">•</span>
                      <span v-if="item.datePublished">{{ formatDate(item.datePublished) }}</span>
                    </div>
                  </div>
                </NuxtLink>

                <button
                  class="w-full text-left px-4 py-3 text-sm font-medium text-primary hover:bg-gray-50"
                  @click="goToSearchPage"
                >
                  View all results for "{{ search }}"
                </button>
              </template>

              <div v-else class="p-4 text-sm text-gray-500">
                No result found for "{{ search }}"
              </div>
            </div>
          </div>

          <ul class="grid gap-2">
            <li v-for="item in navItems" :key="item.label">
              <NuxtLink
                :to="item.to"
                class="block px-3 py-3 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition"
                @click="mobileOpen = false"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </header>

  <!-- spacer -->
  <div class="h-[150px] lg:h-[170px]"></div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mobileOpen = ref(false)
const hideHeader = ref(false)
const search = ref('')

const searchLoading = ref(false)
const searchResults = ref([])
const showSuggestions = ref(false)

const searchBoxRef = ref(null)
const mobileSearchBoxRef = ref(null)

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Admission', to: '/category/admission' },
  { label: 'Post-UTME', to: '/category/post-utme' },
  { label: 'JAMB', to: '/category/jamb' },
  { label: "O'level", to: '/category/olevel' },
  { label: 'NYSC', to: '/category/nysc' },
  { label: 'Scholarships', to: '/category/scholarships' }
]

let lastScrollY = 0
let searchTimeout = null

/* =========================
   HEADER HIDE / SHOW
========================= */
const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (mobileOpen.value) return

  if (currentScrollY <= 20) {
    hideHeader.value = false
    lastScrollY = currentScrollY
    return
  }

  hideHeader.value = currentScrollY > lastScrollY
  lastScrollY = currentScrollY
}
const home = () =>{
  router.push('/')
}
/* =========================
   SEARCH API
========================= */
const searchNews = async () => {
  const keyword = search.value.trim()

  if (keyword.length < 2) {
    searchResults.value = []
    showSuggestions.value = false
    return
  }

  searchLoading.value = true

  try {
    const res = await useApiFetch(`/news?search=${encodeURIComponent(keyword)}&limit=6`, {
      method: 'GET'
    })
  console.log(res);
  
    if (res?.success) {
      searchResults.value = res.data.data || []
    } else {
      searchResults.value = []
    }

    showSuggestions.value = true
  } catch (error) {
    console.error('Search failed:', error)
    searchResults.value = []
    showSuggestions.value = true
  } finally {
    searchLoading.value = false
  }
}

/* =========================
   WATCH SEARCH WITH DEBOUNCE
========================= */
watch(search, (value) => {
  clearTimeout(searchTimeout)

  if (!value.trim()) {
    searchResults.value = []
    showSuggestions.value = false
    return
  }

  searchTimeout = setTimeout(() => {
    searchNews()
  }, 400)
})

/* =========================
   GO TO FULL SEARCH PAGE
========================= */
const goToSearchPage = () => {
  const keyword = search.value.trim()
  if (!keyword) return

  showSuggestions.value = false
  mobileOpen.value = false

  router.push({
    path: '/search',
    query: {
      q: keyword
    }
  })
}

/* =========================
   OPEN/CLOSE SUGGESTIONS
========================= */
const handleFocus = () => {
  if (search.value.trim().length >= 2) {
    showSuggestions.value = true
  }
}

const closeSuggestions = () => {
  showSuggestions.value = false
}

const closeSuggestionsAndMenu = () => {
  showSuggestions.value = false
  mobileOpen.value = false
}

/* =========================
   CLICK OUTSIDE
========================= */
const handleClickOutside = (event) => {
  const desktopEl = searchBoxRef.value
  const mobileEl = mobileSearchBoxRef.value

  if (
    desktopEl &&
    desktopEl.contains(event.target)
  ) {
    return
  }

  if (
    mobileEl &&
    mobileEl.contains(event.target)
  ) {
    return
  }

  showSuggestions.value = false
}

/* =========================
   HELPERS
========================= */
const getImage = (image) => {
  if (!image) return '/images/placeholder-news.jpg'

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }

  return `https://new.abaniseedu.com/news/${image}`
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  clearTimeout(searchTimeout)
})
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.nav-active {
  color: #15803d;
}
.nav-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 6px;
  width: 100%;
  height: 2px;
  background: #15803d;
  border-radius: 9999px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.28s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>