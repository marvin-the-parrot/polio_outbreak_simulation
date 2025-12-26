<template>
  <!-- <p class="cross"></p> -->
  <div id="smooth-wrapper" ref="main">
    <div id="smooth-content">
      <div class="box box-a " data-speed="1">
      <button></button>
        <img class="title" src="../assets/title_bsc.svg" />
        <p class="text">{{ $t("text.vaccineHistory") }}</p>
        <a class="scroll"></a>
      </div>

      <div class="box box-a " data-speed="1">
        
        <v-col>
          <p class="text">{{ $t("text.controlledDisease") }}</p>
        </v-col>
        <v-col>
          <div class="historic_chart">
            <Line id="polio-chart" :options="historicChartOptions" :data="histoicChartData" style="height: 40vh;"/>
          </div>
        </v-col>
        <v-col>
          <p class="text">{{ $t("text.simulateYourself") }}</p>
        </v-col>
      </div>


      <div class="box box-a " data-speed="1">
        <h1>{{ $t("text.whereOutbreak") }}</h1>
        <button class="button" @click="zoomToCongo">
          <img src="../assets/drc_flag.png" style="background-color: grey;" class="person"></img>
          <p>D. R. of Congo</p>
        </button>
        <button class="button" @click="zoomToIndia">
          <img src="../assets/india_flag.png" style="background-color: grey; " class="person"></img>
          <p>India</p>
        </button>
        <button class="button" @click="zoomToFrance"> 
          <img src="../assets/france_flag.png" style="background-color: grey;" class="person"></img>
          <p>France</p>
        </button>
        <button clasS="button_skip" @click="scrollToTool">{{ $t("text.skip") }}</button>
      </div>
      <div class="box mapBox box-c" data-speed="1">
        <img class="map" src="../assets/world.svg">
        <p class="background-text  "></p>
        <p class="background-text  ">{{country}} {{ $t("text.countrySelected") }} {{ countrySpreadSentence }}<br><br> {{ $t("text.historyStele") }}</p>
      </div>

      <!-- <div class="box box-text" data-speed="1">
        <p class="non-background-text">Babys are protected from Polio for the first few months from their parents antibodies. It's important to vaccinate them in this timeframe.  <br> <br> Vaccination does have a cost in production and distribution keep that in mind.</p>
      </div>

      <div class="box box-immune-pop" data-speed="1">
        <h1 style="margin-top: 10vh;">What percentage of babys are we vaccinating against Polio?</h1>
        <p class="big-percentage">{{ (fraction_vaccinated_babies * 100).toFixed(0) }}%</br></p>
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
      </div> -->

      <div class="box box-text pre-vacc-percentage-box" data-speed="1">
        <p class="non-background-text">{{ $t("text.oldVaccine") }}</p>
      </div>

      <div class="box box-immune-pop" data-speed="1">
        <h1>{{ $t("text.whatPercentageImmune") }}</h1>
        <p class="big-percentage">{{ (fractio_immune_population * 100).toFixed(0) }}%</br></p>
          <!-- track-color="C7CCB9" 
           track-color="#FEE1C7"-->
          <v-slider
            width="100%"
            v-model="fractio_immune_population"
            track-size="100"
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

          <a class="scroll_primary"></a>


      </div>

      <div class="box box-text pre-vacc-percentage-box" data-speed="1">
        <p class="non-background-text breathing-text">{{ $t("text.ironLung") }} </p>
      </div>

      <div class="box box-immune-pop" data-speed="1">
        <h1>{{ $t("text.whatVaccine") }} </h1>
        <!-- Cost of vaccinating a child
         https://www.unicef.org/media/161751/file/Standard%20costs%20of%20fully%20vaccinating%20a%20child_UNICEF_2024.pdf.pdf 
         IPV: 11.30$
         OPV: 7.66$ -->
          <!-- track-color="C7CCB9" 
           track-color="#FEE1C7"-->
          <v-row justify="center">
            <v-col class="v-col-12">
              <v-btn-toggle
              v-model="vaccine_used"
              rounded="1"
              direction="vertical"
              class="btn-group"
              color="#C7CCB9"
              base-color="#99621E"
              elevation="6"
            >
              <v-btn value="opv" class="text-body-1" size="x-large"  >
                OPV (Old)<br></br> {{ $t("text.price.old") }} 
              </v-btn>

              <v-btn value="ipv" class="text-body-1" size="x-large" >
                IPV (Modern) <br></br> {{ $t("text.price.new") }} 
              </v-btn>

            </v-btn-toggle>
          </v-col>
        </v-row>
       
      </div>
      
      <div class="box box-sim" data-speed="1">
        <SeirLineChart initialDisplay="numbers" 
        :key="fractio_immune_population"
        :initialVaccineRate=fraction_vaccinated_babies
        :initialImmunePopulation=fractio_immune_population
        :initialBeta = initialSpreadRate
        :initialVaccineUsed = vaccine_used
      ></SeirLineChart>
      </div>
      <!-- <div class="box box-immun-pop">
        Impressum
      </div> -->
    </div>
  </div>

</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, type ChartOptions } from 'chart.js'
import SeirLineChart from './SeirLineChart.vue'
import { gsap } from "gsap";
import { onMounted, onUnmounted, ref } from 'vue';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { fraction, number, re } from 'mathjs';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const main = ref();

const fractio_immune_population = ref(0);
const fraction_vaccinated_babies = ref(0);
const initialSpreadRate = ref(1);
const vaccine_used = ref("");
const toolVisible = ref(false);
const filepath_csv:string = './assets/polio_cases_year.csv'
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

const historicChartOptions:any = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0
    }
  },
  plugins: {
    legend: {display:false},
    title: {
      display: true,
      text: 'Global Polio Cases per Year',
    },
  },
  scales: {
    x: {
      grid: {
        color: '#000000',
        drawTicks: true,
      },
      ticks: {
        color: '#000000',
      },
      border: {
        color: '#000000',
      }
    },
    y: {
      grid: {
        color: '#000000',
      },
      ticks: {
        color: '#000000',
      },
      border: {
        color: '#000000',
      }
    }
  }
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

const data_years = [
  1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 
  1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 
  2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 
  2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 
  2020, 2021, 2022, 2023
];

const data_polioCases = [
  91994, 49161, 49035, 33145, 29757, 35882, 33761, 28329, 38360, 27090, 
  33719, 16786, 15092, 16919, 12173, 16037, 14700, 7952, 7616, 20650, 
  14294, 581, 1554, 3129, 7434, 7665, 8729, 3108, 7161, 6328, 
  4970, 2842, 1183, 2009, 392, 126, 35, 154, 546, 2317, 
  4452, 3808, 5075, 3563
];

const histoicChartData:any = ref({
  labels: data_years,
  datasets: [
    {
      label: 'Global Polio Cases',
      data: data_polioCases, // Y-axis
      borderColor: '#ff0000',
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
    }
  ]
})

onMounted(() => {
  ctx = gsap.context((self) => {
    smoother = ScrollSmoother.create({
      smooth: 2, 
      smoothTouch: 0.5,
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
  font-weight: 500;
  color: black;
}
h2,h3,h4,h5,h6{
  color: black;
}
.text-buttons{
  height: 200px;
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
  top:315vh;
  padding: 2em;
  font-size: x-large;
  color: black;
  opacity: 0;
}

.breathing-text{
  animation: breath 7s infinite ease-in-out
}

.non-background-text{
  justify-content: center;
  align-self: center;
  padding: 2em;
  font-size: x-large;
  font-weight: 700;
  color: black;
}

.text{
  justify-content: center;
  align-self: center;
  padding: 2em;
  padding-top: 0;
  font-size: x-large;
  color: black;
}

.historic_chart{
  /* max-height: 70vh;
  min-height: 50vh; */
  height: 100%;
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
  border-radius: .5em;
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

.box-sim{
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
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

.scroll {
  position: relative;
  display: block;
  font-size: 0.933rem;
  color: var(--secondary-color);
  text-decoration: none;
  padding: 10px 10px 10px 40px;
  &::before {
    display: block;
    position: absolute;
    top:-2px;
    left:0;
    width: 24px;
    height: 40px;
    border: 2px solid var(--secondary-color);
    border-radius: 12px;
    content:"";
  }
  &::after {
    display: block;
    position: absolute;
    top:9px;
    left:11px;
    width: 2px;
    height: 8px;
    background: var(--secondary-color);
    border-radius: 1px;
    content:"";
    animation-name: scroll;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-delay: 0s;
    animation-direction: reverse;
  }
}

.scroll_primary {
  position: relative;
  display: block;
  font-size: 0.933rem;
  color: var(--primary-color);
  text-decoration: none;
  padding: 10px 10px 10px 40px;
  &::before {
    display: block;
    position: absolute;
    top:-2px;
    left:0;
    width: 24px;
    height: 40px;
    border: 2px solid var(--primary-color);
    border-radius: 12px;
    content:"";
  }
  &::after {
    display: block;
    position: absolute;
    top:9px;
    left:11px;
    width: 2px;
    height: 8px;
    background: var(--primary-color);
    border-radius: 1px;
    content:"";
    animation-name: scroll;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-delay: 0s;
    animation-direction: reverse;
  }
}

@keyframes scroll {
  0% { opacity: 1; height: 8px;}
  20% { opacity: 1; height: 8px;}
  30% { transform: translateY(0); opacity: 1; height: 19px;}
  40% { opacity: 1;}
  80% { transform: translateY(19px); opacity: 0; height: 0;}
  81% { transform: translateY(0); opacity: 0; height: 8px;}
  100% { opacity: 1; height: 8px;}
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

@keyframes breath{
  0%{
    transform: scale(90%);
  }
  40%{
    transform: scale(100%);
  }
  100%{
    transform: scale(90%);
  }
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
