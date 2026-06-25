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
          <div to="/" class="flex bg items-center gap-3 shrink-0">
            <div class="w-11 h-11 ro  flex items-center justify-center text-white font-bold text-lg ">
              <img src="/abanisee.png"/>
            </div>

            <div class="leading-tight">
              <h1 class="text-[22px] md:text-[26px] font-extrabold tracking-tight text-gray-900">
                Abanise News
              </h1>
              <p class="text-[12px] text-gray-500 -mt-1">
                Education • Admission • JAMB • Post-UTME
              </p>
            </div>
          </div>

          <!-- RIGHT: SEARCH + HOME -->
          <div class="flex items-center gap-3">
            <!-- Search -->
            <div class="hidden md:flex items-center border border-gray-200 rounded-full px-3 h-10 bg-gray-50 w-[250px]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              <input
                v-model="search"
                type="text"
                placeholder="Search news..."
                class="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
              />
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
          <!-- mobile search -->
          <div class="flex items-center border border-gray-200 rounded-full px-3 h-11 bg-gray-50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
            </svg>
            <input
              v-model="search"
              type="text"
              placeholder="Search news..."
              class="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
            />
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

  <!-- spacer so page content does not enter under fixed navbar -->
  <div class="h-[150px] lg:h-[170px]"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mobileOpen = ref(false)
const hideHeader = ref(false)
const search = ref('')

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Admission', to: '/category/admission' },
  { label: 'Post-UTME', to: '/category/post-utme' },
  { label: 'JAMB', to: '/category/jamb' },
  { label: "O'level", to: '/category/olevel' },
    { label: "NYSC", to: '/category/nysc' },
  { label: 'Scholarships', to: '/category/scholarships' },
  
]

let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY

  // if mobile menu is open, don't hide header
  if (mobileOpen.value) return

  // don't hide at top of page
  if (currentScrollY <= 20) {
    hideHeader.value = false
    lastScrollY = currentScrollY
    return
  }

  // hide when scrolling down, show when scrolling up
  if (currentScrollY > lastScrollY) {
    hideHeader.value = true
  } else {
    hideHeader.value = false
  }

  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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

/* active nav */
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

/* mobile transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.28s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>