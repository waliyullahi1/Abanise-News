<template>

    <FullNewsTemplate :endpoint="`admissionNews/name/${newsId}`"></FullNewsTemplate>

</template>

<script setup>
const route = useRoute();
const newsId = route.params.id;
</script>

<style>

</style>
