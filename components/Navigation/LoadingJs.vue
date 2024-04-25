<template>
    <div :class="isJsFinishedRun?'hidden' :'flex'" class=" w-full duration-1000 h-screen bg-white fixed z-20 flex justify-center items-center top-0 left-0">
          <img class=" sm:w-36 w-28" src="@/assets/image/preload.svg" alt="" srcset="">
      </div>
</template>

<script>
export default {
 props: {
      isJsFinishedRun: Boolean

    },
}
</script>

<style>

</style>