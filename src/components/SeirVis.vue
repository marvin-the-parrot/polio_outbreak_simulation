<template>
  <!-- <p class="cross"></p> -->
  <div id="smooth-wrapper" ref="main">
    <div id="smooth-content">
      <div class="box box-a " data-speed="1">
        <img class="title" src="../assets/title_bsc.svg" />
        <h1>Where are we simulating a polio outbreak?</h1>
        <button class="button" @click="zoomToCongo">
          <img src="../assets/drc_flag.png" style="background-color: grey;" class="person"></img>
          <p>Democratic Republic of Congo</p>
        </button>
        <button class="button" @click="zoomToIndia">
          <img src="../assets/india_flag.png" style="background-color: grey; " class="person"></img>
          <p>India</p>
        </button>
        <button class="button" @click="zoomToFrance"> 
          <img src="../assets/france_flag.png" style="background-color: grey;" class="person"></img>
          <p>France</p>
        </button>
        <button clasS="button_skip" @click="scrollToTool">Skip this! Take me to the simulation Tool!</button>
      </div>
      <div class="box mapBox box-c" data-speed="1">
        <img class="map" src="../assets/world.svg">
        <p class="background-text  "></p>
        <p class="background-text  ">{{ country }} selected. {{ countrySpreadSentence }} We will be simulating with 1 Million people. <br><br> Polio has a long history, the first documented cases were found on an egyptian stele dated to 1400 BC</p>
      </div>

      <div class="box box-text" data-speed="1">
        <p class="non-background-text">Babys are protected from Polio for the first few months from their parents antibodies. It's important to vaccinate them in this timeframe.  <br> <br> Vaccination does have a cost in production and distribution keep that in mind.</p>
      </div>

      <div class="box box-immune-pop" data-speed="1">
        <h1 style="margin-top: 10vh;">What percentage of babys are we vaccinating against Polio?</h1>
        <p class="big-percentage">{{ (fraction_vaccinated_babies * 100).toFixed(0) }}%</br></p>
          <!-- track-color="C7CCB9" 
           track-color="#FEE1C7"-->
          <v-slider
            v-model="fraction_vaccinated_babies"
            track-size="300"
            track-color="#C7CCB9"
            track-fill-color="#99621E"
            max="1.0"
            min="0.0"
            :ticks=percentageLabels
            show-ticks="always"
            step="0.01"
            thumb-size="0"
            tick-size="0"
          >
            <template v-slot:thumb-label="{ modelValue }">
                  {{ modelValue*100 + "%" }}
            </template>
          </v-slider>
          <div style="width: 100%; margin-bottom: 2em;">
            <button class="button_results" @click="scrollToPopulationImmune">Continue</button>
          </div>
      </div>

      <div class="box box-text pre-vacc-percentage-box" data-speed="1">
        <p class="non-background-text">The oldest Polio Vacine (OPV) has a small chance of causing a polio infection. 1 in 2.700.000 doses have this effect. <br></br><br></br> If we vaccinate everybody without wild polio existing we could cause additional infections, if we do not vaccinate, immunity will fade.</p>
      </div>

      <div class="box box-immune-pop" data-speed="1">
        <h1>What percentage of the population is already immune (either recovered or vaccinated)</h1>
        80% immunity is often enough <br></br> to break chains of infections
        <p class="big-percentage">{{ (fractio_immune_population * 100).toFixed(0) }}%</br></p>
          <!-- track-color="C7CCB9" 
           track-color="#FEE1C7"-->
          <v-slider
            v-model="fractio_immune_population"
            track-size="300"
            track-color="#C7CCB9"
            track-fill-color="#99621E"
            max="1.0"
            min="0.0"
            :ticks=percentageLabels
            show-ticks="always"
            step="0.01"
            thumb-size="0"
            tick-size="0"
          >
            <template v-slot:thumb-label="{ modelValue }">
                  {{ modelValue*100 + "%" }}
            </template>
          </v-slider>
          <div style="width: 100%; margin-bottom: 2em;">
            <button class="button_results" @click="scrollToTool">Show me the results!</button>
          </div>
      </div>
      
      <div class="box box-sim" data-speed="1">
        <SeirLineChart initialDisplay="numbers" 
        :key="fractio_immune_population"
        :initialVaccineRate=fraction_vaccinated_babies
        :initialImmunePopulation=fractio_immune_population
        :initialBeta = initialSpreadRate
      ></SeirLineChart>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import SeirLineChart from './SeirLineChart.vue'
import { gsap } from "gsap";
import { onMounted, onUnmounted, ref } from 'vue';

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { fraction, number } from 'mathjs';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const main = ref();
const fractio_immune_population = ref(0);
const fraction_vaccinated_babies = ref(0);
const initialSpreadRate = ref(1);
const toolVisible = ref(false);
let smoother: any;
let ctx: any;
let map: any;


// const betaLabels = {
//   0.27: 'Western Europe',
//   0.54: 'DPC',
//   0.80: 'Northern Africa',
//   1.07: 'India',
// } 
const zoomToCongo = () => {
  country.value = "Democratic Republic of Congo"
  countrySpreadSentence.value = "Infections spread at average speeds due to hygiene and population density."
  initialSpreadRate.value = 0.5;
  map ? map.revert() : null
  smoother.scrollTo('.map', true, 'center center'); 
  map = gsap.to('.map', { scale: 10.0, y: -550, x: -80, duration: 1, delay: 1, ease: "power2.inOut" })
  map = gsap.to('.map', { opacity: 0, delay: 3, ease: "power2.inOut" })
  gsap.to('.background-text', { opacity: 1, delay: 3.5, ease: "power2.inOut" })
}

const zoomToIndia = () => {
  initialSpreadRate.value = 1.00;
  country.value = "India"
  countrySpreadSentence.value = "Infections spread at high speeds due to lower hygiene standars and high population density"
  map ? map.revert() : null
  smoother.scrollTo('.map', true, 'center center');
  map = gsap.to('.map', { scale: 10.0, y: -400, x: -1400, duration: 1, delay: 1, ease: "power2.inOut" })
  map = gsap.to('.map', { opacity: 0, delay: 3, ease: "power2.inOut" })
  gsap.to('.background-text', { opacity: 1, delay: 3.5, ease: "power2.inOut" })

}
const zoomToFrance = () => {
  initialSpreadRate.value = 0.25;
  country.value = "France"
  map ? map.revert() : null
  smoother.scrollTo('.map', true, 'center center');
  map = gsap.to('.map', { scale: 10.0, y: 140, x: 160, duration: 1, delay: 1, ease: "power2.inOut" })
  map = gsap.to('.map', { opacity: 0, delay: 3, ease: "power2.inOut" })
  gsap.to('.background-text', { opacity: 1, delay: 3.5, ease: "power2.inOut" })

}
const scrollToTool = () =>{
  smoother.scrollTo('.box-sim',true,'center center');
}

const scrollToPopulationImmune = () =>{
  smoother.scrollTo('.pre-vacc-percentage-box',true,'center center');
}

const country = ref()
const countrySpreadSentence = ref()

const percentageLabels: { [key: string]: string } = {
  0: '0%',
  0.10: '',
  0.20: '',
  0.30: '',
  0.40: '',
  0.50: '',
  0.60: '',
  0.70: '',
  0.80: '',
  0.90: '',
  1.0: '100%',
}

onMounted(() => {
  ctx = gsap.context((self) => {
    smoother = ScrollSmoother.create({
      smooth: 2, 
      smoothTouch: 0,
      effects: true, 
    });
    ScrollTrigger.create({
      trigger: '.map_world',
      pin: true,
      start: 'center center',
      end: '+=300',
      markers: false,
    });
  }, main.value);
});

onUnmounted(() => {
  ctx.revert();
});


</script>

<style>
:root {
--primary-color: #C7CCB9;
--secondary-color: #FEE1C7;
--accent-color: #99621E;
--vaccinated-color: #1b9e77;
--paralysis-color: #d95f02;
--last-color: #7570b3;
--deaths-color:#e7298a;
}

p{
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: black;
}

h1 {
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 2em;
  font-synthesis-weight: 900;
  color: black;
}
h2,h3,h4,h5,h6{
  color: black;
}

.changeNumberGreen{
  color: green;
}

.big-percentage{
  color:black;
  font-size: 6rem;
  width: 100%;
}

.changeNumberRed{
  color: red;
}

.h2 {
  font-size: xx-large;
  color: white;
  z-index: 100;
}

.title{
  max-width: 100%;
}

.button_skip{
  padding: .5em;
  font-size: large;
  background-color: var(--accent-color);
  color: white;
  border-radius: .5em;
}

.button_skip:hover{
  background-color: var(--secondary-color);
  color: black;
}

.button_results{
  padding: .5em;
  font-size: large;
  background-color: var(--accent-color);
  color: white;
  border-radius: .5em;
}

.button_results:hover{
  background-color: var(--primary-color);
  color: black;
}

.background-text{
  position:absolute;
  top:130vh;
  padding: 2em;
  font-size: x-large;
  color: black;
  opacity: 0;
}

.non-background-text{
  justify-content: center;
  align-self: center;
  padding: 2em;
  font-size: x-large;
  color: black;
}

.mapBox {
  overflow: hidden;
}

.button {
  background: var(--secondary-color);
  min-height: 20vh;
  max-width: 20vh;
  margin: .5em;
  padding: .5em;
  z-index: 10;
}

.button:focus{
  background: var(--accent-color);
  -webkit-box-shadow: 0px 1px 0px fefefe;
  -moz-box-shadow: 0px 1px 0px fefefe;
  box-shadow: 0px 1px 0px fefefe;
  color: #ffffff;

}

.button:hover {
  background: var(--accent-color);
  -webkit-box-shadow: 0px 1px 0px fefefe;
  -moz-box-shadow: 0px 1px 0px fefefe;
  box-shadow: 0px 1px 0px fefefe;
  color: #ffffff;
  text-decoration: none;
}

.map {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 90%;
}

.person{
  width: 100%;
  object-fit: contain;
  
}

img + p{
  font-size: large;
}

.map_world {
  padding: 1rem;
}

.box {
  width: 100vw;
  height: 100vh;
  padding: 0 .5em;
  font-weight: 600;
  line-height: 1.2;
}

.box:nth-child(2n+1){
  background-color: var(--primary-color); 
}

.box:nth-child(2n){
  background-color: var(--secondary-color);
}



.box-a {
  display: flex;
  flex: true;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap:wrap;
  top: 200px
}

.box-immune-pop {
  display: flex;
  flex: true;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap:wrap;
}

.box-b {
  top: 500px
}

.box-c {
  top: 0px
}

.box-text{
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-flow: column;
}

.box-numbers{
  padding: 10vh 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

}

.card{
  padding: 1em;
  margin: .5em;
  text-align: center;
  align-content: center;
  border-radius: 2em;
  background-color: var(--primary-color) ;
}

.big-number{
  font-size: xx-large;
}



.green {
  background-color: green
}

.brown {
  background-color: tan;
}

.white {
  background-color: white;
}

@keyframes wipe-progress {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0vw);
  }
}

.progress {
  animation: wipe-progress linear forwards;
  animation-timeline: view();
}

.light button {
  color: var(--light);
  background-image: linear-gradient(to bottom, #575757, #414141);
}


</style>
