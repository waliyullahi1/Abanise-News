<template>
  <div>
   
    <NewsTemplate header=" Admission" routes="Admission"
      paragraph="Admission: To find out about undergraduate and graduate degree admissions."
      :admissionNewsData="paginatedData"
      :totalPages="totalPages"
      endpoint="admissionNews"
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






<style>
.title {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}



.router-link-active {
  background-color: #164b3b;
  color: white;

}
</style>