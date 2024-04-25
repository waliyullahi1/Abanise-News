<template>
    <div>
    <FullNewsTemplate :endpoint="`postutme/name/${newsId}`"></FullNewsTemplate>
    </div>
</template>

<script setup>
const route = useRoute();
const newsId = route.params.id;
</script>

<style>

</style>
