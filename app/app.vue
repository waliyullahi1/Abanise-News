<script setup>

useHead({
  htmlAttrs: {
    lang: 'en'
  },

  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/images/abanise.png'
    }
  ]
})

useSeoMeta({
  // Basic SEO
  title: 'Abanise News | Latest Education News, Admissions, JAMB & Scholarships',
  description:
    'Abanise News is your trusted source for the latest education news in Nigeria. Get updates on admissions, JAMB, Post-UTME, WAEC, NECO, O\'Level, NYSC, scholarships, universities, polytechnics, colleges of education and school announcements.',

  keywords:
    'Abanise News, Education News Nigeria, Admission News, JAMB, Post UTME, WAEC, NECO, O Level, NYSC, Scholarships, Universities, Polytechnic, College of Education, School News, Nigerian Education',

  author: 'Abanise News',

  robots: 'index, follow',

  // Open Graph
  ogTitle:
    'Abanise News | Nigeria\'s Trusted Education News Platform',

  ogDescription:
    'Stay updated with the latest admission news, JAMB updates, Post-UTME screening forms, WAEC, NECO, O\'Level, scholarships, NYSC and education news across Nigeria.',

  ogImage:
    'https://www.news.abanise.com/ogimage.png',

  ogImageWidth: '1200',
  ogImageHeight: '630',

  ogType: 'website',

  ogSiteName: 'Abanise News',

  ogLocale: 'en_NG',

  ogUrl: 'https://www.news.abanise.com/ogimage.png',

  // Twitter
  twitterCard: 'summary_large_image',

  twitterTitle:
    'Abanise News | Latest Education News in Nigeria',

  twitterDescription:
    'Latest Nigerian education news, admissions, JAMB, Post-UTME, WAEC, NECO, scholarships, NYSC and university updates.',

  twitterImage:
    'https://www.news.abanise.com/ogimage.png',

  twitterSite: '@abanisenews'
})

</script>


<template>
<AdvertisingBanner
    image="/banner4.png"
    :duration="1"
  />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

</template>