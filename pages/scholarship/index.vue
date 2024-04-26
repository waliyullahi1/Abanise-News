<template>
  <div>

    <NewsTemplate header="Scholarship" routes="schorlarship"
      paragraph=""
      :admissionNewsData="paginatedData"
      :totalPages="totalPages"
      endpoint="scholarshipNews"
      ></NewsTemplate>
  </div>
</template>

<script setup>




const allNews = ref([]);
const perPage = ref(6);
const news = ref([]);

const route = useRoute()




</script>






