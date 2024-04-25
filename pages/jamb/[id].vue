<template>
    <div>
    <FullNewsTemplate :endpoint="`jambNews/name/${newsId}`"></FullNewsTemplate>
    </div>
</template>

<script setup>
const route = useRoute();
const newsId = route.params.id;
</script>

<style>

</style>
