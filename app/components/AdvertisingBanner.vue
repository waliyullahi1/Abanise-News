<template>
  <Transition name="slide-down">
    <div
      v-if="showBanner"
      class="fixed top-0 left-0 w-full h-full z-[9999]  bg-white/55 shadow-2xl border-b"
    >
      <div class="relative h-full  max-w-7xl mx-auto">

        <!-- Close -->
        <button
          @click="closeBanner"
          class="absolute top-3 right-3 z-20 bg-black/70 text-white w-8 h-8 rounded-full hover:bg-black"
        >
          ✕
        </button>

        <!-- Banner -->
        <a
          href="https://www.abanise.com/search/hostel"
          target="_blank"
          class="block w-full h-full flex  items-center justify-center "
        >
        <div class=" w-[90%] md:w-[50%]">
          <img
            :src="image"
            alt="Advertisement"
            class="w-40%] ob-cover"
          >
        </div>
        </a>

      </div>
    </div>
  </Transition>

  <!-- Spacer -->
  <div
    v-if="showBanner"
    class="h-[120px] md:h-[180px]"
  ></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  image: {
    type: String,
    default: '/ads/hostel-banner.png'
  },

  website: {
    type: String,
    default: 'https://abanise.com'
  },

  duration: {
    type: Number,
    default: 60 // minutes
  }
})

const showBanner = ref(false)

const STORAGE_KEY = 'advert_banner_closed'

onMounted(() => {
  const lastClosed = Number(localStorage.getItem(STORAGE_KEY))

  if (!lastClosed) {
    showBanner.value = true
    return
  }
  showBanner.value = true

  const diff =
    Date.now() - lastClosed

  const wait =
    props.duration * 60 * 1000

  showBanner.value = diff >= wait
})

function closeBanner() {
  localStorage.setItem(
    STORAGE_KEY,
    Date.now()
  )

  showBanner.value = false
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active{
transition:.35s;
}

.slide-down-enter-from,
.slide-down-leave-to{
transform:translateY(-100%);
opacity:0;
}
</style>