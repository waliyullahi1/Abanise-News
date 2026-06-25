<template>
  <div>
    <NewsHeader />

    <div class="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
     

      <div class=" lg:col-span-2 mx-2">
        <div class="text-xl md:w-[70%] w-full ">
          
          <!-- LOADING -->
          <div v-if="pending" class="mt-5 py-5  w-full px-2">
            <p>Loading news...</p>
          </div>

          <!-- ERROR -->
          <div v-else-if="error" class="mt-5 py-5 shadow-xl w-full px-2 text-red-500">
            <p>Failed to load news</p>
          </div>

          <!-- NEWS -->
          <div v-else class="  w-full px-2">
            <h1 class="mb-4 text-3xl font-bold font-bebas">
              {{ allNews?.data?.title }}
            </h1>

            <div
              v-html="allNews?.data?.content"
              class="entry tess text-[15px] pb-1"
            ></div>
          </div>
        </div>
      </div>
      <div class="hidden  top-10 sticky -64 lg:block lg:col-span-1 self-start">
       <TableLatestNews class="text-[poppins]" />
      </div>
    </div>

    <NavigationFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = route.params.route;
console.log(title);
/* =========================
   GET SLUG FROM ROUTE
========================= */
const slug = computed(() => route.params.slug)

/* =========================
   FETCH SINGLE NEWS
========================= */
const {
  data: allNews,
  pending,
  error,
  refresh
} = await useAsyncData(
  `news-${slug.value}`,
  async () => {
    const res = await useApiFetch(`/news/${slug.value}`, {
      method: 'GET'
    })

    if (!res?.success) {
      throw createError({
        statusCode: 500,
        statusMessage: res?.message || 'Failed to fetch news'
      })
    }

    return res.data || {}
  },
  {
    watch: [slug]
  }
)
</script>

<style>
.blur {
    backdrop-filter: blur(5px);
}


.entry {
    word-wrap: break-word;
    line-height: 22px
}

.entry p {
    margin-bottom: 20px
}

.entry img {
    max-width: 100%;
    height: auto
}

.entry img {
    max-width: 100%;
    height: auto
}
.entry p a:hover {
    color: #007f26;
}
.entry li a:hover {
    color: #007f26;
}
.entry p a:hover {
    color: #007f26;
}
.entry li a {
    color: #007f26;
}
body.single .post .entry a, body.page .post .entry a {
    color: #1b9048;
    text-decoration: underline;
}
.entry h1, .entry h2, .entry h3, .entry h4, .entry h5, .entry h6 {
    margin-top: 25px;
    margin-bottom: 10px;
    line-height: 1em;
    font-family: Helvetica;
    font-weight: normal
}

.entry h1 {
    font-size: 36px
}

.entry h2 {
    font-size: 30px
}

.entry h3 {
    font-size: 24px
}

.entry h4 {
    font-size: 18px
}

.entry h5 {
    font-size: 14px
}

.entry h6 {
    font-size: 12px
}

.entry ol, .entry ul {
    margin: 0 0 20px 15px
}

.entry ul li {
    list-style: outside disc;
    list-style-image: none
}

.entry ol li {
    list-style: outside decimal
}

.entry li {
    margin: 0 0 5px 0
}

.entry li ul, .entry li ol {
    margin: 5px 0 0 15px
}

.entry #user-login ul {
    margin-bottom: -5px
}

.entry table {
    border-spacing: 0;
    width: 100%;
    border: 1px solid #eee;
    border-collapse: separate;
    margin-bottom: 1.5em
}

.entry table tr:nth-child(even) {
    background: #F9F9F9
}

.entry table td, .entry table th {
    padding: .4em;
    text-align: left;
    border-right: 1px dotted #eee
}

.entry table thead th {
    background: #F4F4F4;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    text-transform: uppercase;
    padding: 0.7em .4em;
    vertical-align: middle
}

.entry table tbody th {
    background: #F4F4F4;
    border-bottom: 1px solid #eee
}

.entry table tbody td {
    border-bottom: 1px solid #eee
}

.entry table tr th:last-child, .entry table tr td:last-child {
    border-right: 0
}

.entry table tbody tr:last-child td, .entry table tbody tr:last-child th {
    border-bottom: 0
}
</style>
