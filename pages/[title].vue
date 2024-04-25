<template>
    <div>
    <FullNewsTemplate :endpoint="`news/name/${title}`"></FullNewsTemplate>
    </div>
</template>

<script setup>
const route = useRoute();
const title = route.params.title;
</script>

<style>

</style>
