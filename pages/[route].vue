<template>
    <div>
    <FullNewsTemplate :endpoint="`news/name/${title}`"></FullNewsTemplate>

    </div>
</template>

<script setup>
const route = useRoute();
const title = route.params.route;
console.log(title);
</script>

<style>

</style>
