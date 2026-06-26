<template>
  <div>

    <NewsTemplate :header="category" routes="JAMB"
      paragraph=""
      :admissionNewsData="paginatedData"
      :totalPages="totalPages"
      endpoint="jambNews"
      ></NewsTemplate>
  </div>
</template>





<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'



const allNews = ref([]);
const perPage = ref(6);
const news = ref([]);

const route = useRoute()

const category = computed(() => {
  return route.params.category || 'Admission'
})




const currentUrl = computed(() => {
  return `hhttps://www.news.abanise.com/category/${category.value}`
})

const categoryImage = computed(() => {
  const firstNews = news.value?.[0]

  if (!firstNews?.image) {
    return 'hhttps://www.news.abanise.com/ogimage.png'
  }

  if (
    firstNews.image.startsWith('http://') ||
    firstNews.image.startsWith('https://')
  ) {
    return firstNews.image
  }

  return `https://www.news.abanise.com/abanisee.png/category/${firstNews.image}`
})

useSeoMeta({
  title: `${category.value} News | Abanise News`,

  description: `Latest ${category.value} news, admission updates, JAMB, Post-UTME, scholarships and education news from Abanise News.`,

  keywords: `${category.value}, ${category.value} news, Nigerian education news, admission, JAMB, Post UTME, scholarships`,

  robots: 'index, follow',

  ogTitle: `${category.value} News | Abanise News`,

  ogDescription: `Latest ${category.value} news and education updates from Abanise News.`,

  ogImage: categoryImage,

  ogType: 'website',

  ogUrl: currentUrl,

  ogSiteName: 'Abanise News',

  twitterCard: 'summary_large_image',

  twitterTitle: `${category.value} News | Abanise News`,

  twitterDescription: `Latest ${category.value} news and education updates.`,

  twitterImage: categoryImage
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: computed(() =>
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",

          name: `${category.value} News`,

          description: `Latest ${category.value} news from Abanise News.`,

          url: currentUrl.value,

          image: categoryImage.value,

          isPartOf: {
            "@type": "WebSite",
            name: "Abanise News",
            url: "https://www.news.abanise.com/abanisee.png"
          },

          publisher: {
            "@type": "Organization",
            name: "Abanise News",

            logo: {
              "@type": "ImageObject",
              url: "https://www.news.abanise.com/abanisee.png"
            }
          }
        })
      )
    }
  ]
})
</script>



// updateImageUrls();





