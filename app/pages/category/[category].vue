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




const allNews = ref([]);
const perPage = ref(6);
const news = ref([]);

const route = useRoute()

const category = computed(() => {
  return route.params.category || 'Admission'
})





// updateImageUrls();





</script>