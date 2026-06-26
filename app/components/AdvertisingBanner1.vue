<template>
  <Transition name="fade">
    <div
      v-if="showBanner"
      class="relative w-full bg-white border-y border-gray-200 shadow-sm"
    >
      <div class="max-w-[1600px] mx-auto relative">

        <!-- Close -->
        <button
          @click="closeBanner"
          class="absolute top-3 right-3 z-20 bg-white/90 rounded-full w-9 h-9 shadow hover:bg-red-500 hover:text-white transition"
        >
          ✕
        </button>

        <!-- Banner -->
        <a
          href="https://www.abanise.com/search/hostel"
          target="_blank"
          class="block"
        >
          <img
            src="/banner4.png"
            alt="Abanise Real Estate"
            class="w-full object-cover"
          />
        </a>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(true)


onMounted(() => {
  

})

const closeBanner = () => {
  showBanner.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active{
    transition:.35s;
}

.fade-enter-from,
.fade-leave-to{
    opacity:0;
    transform:translateY(-20px);
}
</style>