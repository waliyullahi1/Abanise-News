<template>
  <div id="footer">
    <!-- Floating WhatsApp Button -->
    <div class="fixed right-4 bottom-12 z-50 animate-bounce">
      <a
        href="https://wa.me/message/SRWH2WAPTXUAN1"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center w-14 h-14 rounded-full bg-green-600 shadow-lg hover:scale-105 transition"
      >
        <Icon name="mdi:whatsapp" class="text-white text-3xl" />
      </a>
    </div>

    <footer class="mt-10 w-full bg-[#000100] text-[13px] text-white">
      <!-- Top social bar -->
      <div class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-5 py-5 border-b border-white/10">
        <p class="whitespace-nowrap text-sm md:text-[13px]">
          Get connected with us on social networks!
        </p>

        <div class="flex flex-wrap gap-5">
          <a
            href="https://wa.me/message/SRWH2WAPTXUAN1"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 hover:text-green-400 transition"
          >
            <Icon name="mdi:whatsapp" class="text-xl" />
            <span>Whatsapp</span>
          </a>

          <a
            href="#"
            class="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <Icon name="mdi:facebook" class="text-xl" />
            <span>Facebook</span>
          </a>

          <a
            href="#"
            class="flex items-center gap-2 hover:text-sky-400 transition"
          >
            <Icon name="mdi:twitter" class="text-xl" />
            <span>Twitter</span>
          </a>
        </div>
      </div>

      <!-- Main footer content -->
      <div class="container mx-auto px-5 py-10">
        <div class="w-full md:w-1/3">
          <Logos class="w-32 mb-4" />
          <p class="sm:text-[15px] text-[13px] text-white/80 leading-6">
            We are the best source. With a platform that is trusted by Paystack,
            you can shop online with complete confidence and no worries.
          </p>
        </div>
      </div>

      <!-- Bottom copyright -->
      <div class="border-t border-white/10 py-4">
        <div class="container mx-auto px-5 text-center text-white/80 text-[13px]">
          Copyright 2024 abaniseedu.com © All Rights Reserved
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Logos from './Logos.vue'
</script>

<style scoped>
</style>