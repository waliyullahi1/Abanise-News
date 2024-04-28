<template>


  <header :class="top ? '  -translate-y-36' : 'translate-y-0 '"
    class="w-full  fixed   ease-out duration-500 z-20 bg-primary change flex justify-center ">
    <div class=" w-full  border-b-2 border-primary">

      <div class="   mx-auto px-2 bg-gray-100 font-sembold">
        <div class="text-[12px] gap-3 flex">

          <p class=" text-yellow-600">Phone number: <span class="ml-1 text-black">07068393706</span></p>
          <p>|</p>
          <p class="text- text-yellow-600">Email <span class="ml-1 text-black">alfaabanise@gmail.com</span></p>
        </div>
      </div>
      <div class=" bg- ">
        <div class=" px-2 bg-primary py-3 justify-between items-center text-white flex container mx-auto">
          <navigation-logo2></navigation-logo2>
          <router-link to="/" class=" text-[13px] font-medium">Home</router-link>
        </div>

      </div>
      <div class="text-[poppins] bg-gray-100 font-medium text-xl   ">

        <div class="  w-full duration-1000 text-black  my-auto mx-auto   px-3  justify-between items-center ">

          <div class=" overflow-scroll div-class h-fit  ">
            <nav
              class=" duration-700 ease-in-out transform  w-full  place-contnt-center px-3  lg:h-7   justify-ed items-center block sm:flex">
              <ul @click=" rotate = true" class=" lg:bg-transparent text-[13px] text-primary w-fit  flex gap-4">
                <li class="  h-full py w-full  lg:mt-0 ext-[11px] boder border-transparent  transform duration-200 ease-in-out  ">
                  <router-link to="/" class="px-1  t md:hover:border-b py-2">Home</router-link>
                </li>

                <li class="  h-full py  lg:mt-0 boder border-transparent text-[13px]  transform duration-200 ease-in-out  ">
                  <router-link to="/Admission" class="px-1 md:hover:border-b  py-2">Admission</router-link>
                </li>


                <li class="  h-full py  lg:mt-0 boder border-transparent  transform duration-200 ease-in-out  ">
                  <router-link to="/Post-utme" class="px-1 whitespace-nowrap md:hover:border-b py-2">Post-UTME</router-link>
                </li>

                <li class="  h-full py  lg:mt-0 boder border-transparent  transform duration-200 ease-in-out  ">
                  <router-link to="/jamb" class="px-1 md:hover:border-b py-2">JAMB</router-link>
                </li>


                <li class="  h-full py  lg:mt-0 boder border-transparent  transform duration-200 ease-in-out  ">
                  <router-link to="/Olevel" class="px-1 md:hover:border-b py-2">O'level</router-link>
                </li>

                <!-- <li class="  h-full py  lg:mt-0 boder border-transparent  transform duration-200 ease-in-out  ">
                  <router-link to="/news" class="px-1 md:hover:border-b py-2">Scholarships</router-link>
                </li> -->
                
              
              </ul>
            </nav>
          </div>



        </div>

        
      </div>

    </div>

  </header>

</template>

<script setup>

import { ref, onMounted, onUnmounted } from 'vue';

let top = ref(false);
let rotate = ref(false);
let lastScrollPosition = 0;
const transc = () => {
  emit('transaction');
};
const emitclick = () => {
  rotate.value = !rotate.value;
};
onMounted(() => {
  const handleScroll = () => {
    const currentScrollPosition = window.pageYOffset;
    top.value = currentScrollPosition > lastScrollPosition ? true : false;
    lastScrollPosition = currentScrollPosition;
  };

  window.addEventListener('scroll', handleScroll);
});

// onUnmounted(() => {
//   window.removeEventListener('scroll',);
// });

</script>

<style>
/* .change {
  transition: background-color 0.5s ease;
  position: fixed;
} */
.div-class {
  /* Enables scrolling if content overflows */
  overflow: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.shodow {

  box-shadow: -3px 17px 28px -2px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -3px 17px 28px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -3px 17px 28px -2px rgba(0, 0, 0, 0.75);
}
</style>