<template>
  <div>

    <NewsTemplate header=" Olevel " routes="Olevel"
      paragraph=""
      :admissionNewsData="paginatedData"
      :totalPages="totalPages"
      endpoint="olevelNews"
      ></NewsTemplate>
  </div>
</template>

<script setup>




const allNews = ref([]);
const perPage = ref(6);
const news = ref([]);

const route = useRoute()







// updateImageUrls();





</script>
















