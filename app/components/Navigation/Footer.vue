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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <!-- Left -->
          <div class="w-full">
            <Logos class="w-32 mb-4" />
            <p class="sm:text-[15px] text-[13px] text-white/80 leading-6 max-w-xl">
              We are the best source for education updates, admission guides,
              JAMB, Post-UTME, scholarships and school news. Subscribe to get
              the latest updates directly in your inbox.
            </p>
          </div>

          <!-- Right: Subscribe -->
          <div class="w-full md:max-w-[500px]">
            <h3 class="text-[18px] font-semibold mb-2">Subscribe to our Newsletter</h3>
            <p class="text-white/70 text-[14px] mb-4">
              Get the latest admission news, JAMB updates, Post-UTME information and scholarship alerts.
            </p>

            <form @submit.prevent="subscribeEmail" class="w-full">
              <div class="flex flex-col sm:flex-row gap-3">
                <input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email address"
                  class="w-full h-12 rounded-lg px-4 bg-white text-black outline-none border border-transparent focus:border-primary"
                />

                <button
                  type="submit"
                  :disabled="loading"
                  class="h-12 px-6 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {{ loading ? 'Subscribing...' : 'Subscribe' }}
                </button>
              </div>
            </form>

            <!-- feedback -->
            <p v-if="successMessage" class="text-green-400 text-sm mt-3">
              {{ successMessage }}
            </p>

            <p v-if="errorMessage" class="text-red-400 text-sm mt-3">
              {{ errorMessage }}
            </p>
          </div>
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
import { ref } from 'vue'
import Logos from './Logos.vue'

const email = ref('')
const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const subscribeEmail = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  const cleanEmail = email.value.trim().toLowerCase()

  if (!cleanEmail) {
    errorMessage.value = 'Please enter your email address.'
    return
  }

  // simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(cleanEmail)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  try {
    loading.value = true

    const res = await useApiFetch('/newsletter/subscribe', {
      method: 'POST',
      body: { email: cleanEmail }
    })

    if (!res?.success) {
      throw new Error(res?.message || 'Subscription failed')
    }

    successMessage.value = res.message || 'Subscription successful!'
    email.value = ''
  } catch (error) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Failed to subscribe. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>