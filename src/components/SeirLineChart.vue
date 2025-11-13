<template>
  <div class="wrapper">
    <h2 class="simHeader">{{ simulation_duration_days }} days later</h2>
    <div class="carousel">
      <v-carousel
        class="carousel"
        :show-arrows="false"
        height="40vh"
        delimiter-icon="test"
        :hide-delimiter-background="true"
        :hide-delimiters="true"
        >

        <v-carousel-item> 
          <div>
            <div class="people-capsules car-item">
              <svg v-for="(item,index) in items" class="peoples" :class="{deadPeople: index<deadPeopleThreshold, paralysisPeople: index<paralysisPeopleThreshold && index<vaccinePeopleThreshold,vaccinatedPeople: index>100-(totalVaccinatedPeople/(N/peopleSpheres))}" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144C350.9 144 376 118.9 376 88zM400 300.7L446.3 363.1C456.8 377.3 476.9 380.3 491.1 369.7C505.3 359.1 508.3 339.1 497.7 324.9L427.2 229.9C402 196 362.3 176 320 176C277.7 176 238 196 212.8 229.9L142.3 324.9C131.8 339.1 134.7 359.1 148.9 369.7C163.1 380.3 183.1 377.3 193.7 363.1L240 300.7L240 576C240 593.7 254.3 608 272 608C289.7 608 304 593.7 304 576L304 416C304 407.2 311.2 400 320 400C328.8 400 336 407.2 336 416L336 576C336 593.7 350.3 608 368 608C385.7 608 400 593.7 400 576L400 300.7z"/></svg>
          </div>
          <div class="seperator"></div>
          <div class="legend">
            <div class="legendblock">
              <p class="legendText">{{ N/peopleSpheres }}</p>
              <svg class="peoples" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144C350.9 144 376 118.9 376 88zM400 300.7L446.3 363.1C456.8 377.3 476.9 380.3 491.1 369.7C505.3 359.1 508.3 339.1 497.7 324.9L427.2 229.9C402 196 362.3 176 320 176C277.7 176 238 196 212.8 229.9L142.3 324.9C131.8 339.1 134.7 359.1 148.9 369.7C163.1 380.3 183.1 377.3 193.7 363.1L240 300.7L240 576C240 593.7 254.3 608 272 608C289.7 608 304 593.7 304 576L304 416C304 407.2 311.2 400 320 400C328.8 400 336 407.2 336 416L336 576C336 593.7 350.3 608 368 608C385.7 608 400 593.7 400 576L400 300.7z"/></svg>
            </div>
            <div class="legendblock">
              <p class="legendText">Dead</p>
              <svg class="peoples deadPeople" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144C350.9 144 376 118.9 376 88zM400 300.7L446.3 363.1C456.8 377.3 476.9 380.3 491.1 369.7C505.3 359.1 508.3 339.1 497.7 324.9L427.2 229.9C402 196 362.3 176 320 176C277.7 176 238 196 212.8 229.9L142.3 324.9C131.8 339.1 134.7 359.1 148.9 369.7C163.1 380.3 183.1 377.3 193.7 363.1L240 300.7L240 576C240 593.7 254.3 608 272 608C289.7 608 304 593.7 304 576L304 416C304 407.2 311.2 400 320 400C328.8 400 336 407.2 336 416L336 576C336 593.7 350.3 608 368 608C385.7 608 400 593.7 400 576L400 300.7z"/></svg>
            </div>
            <div class="legendblock">
              <p class="legendText">Paralysis</p>
              <svg class="peoples paralysisPeople" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144C350.9 144 376 118.9 376 88zM400 300.7L446.3 363.1C456.8 377.3 476.9 380.3 491.1 369.7C505.3 359.1 508.3 339.1 497.7 324.9L427.2 229.9C402 196 362.3 176 320 176C277.7 176 238 196 212.8 229.9L142.3 324.9C131.8 339.1 134.7 359.1 148.9 369.7C163.1 380.3 183.1 377.3 193.7 363.1L240 300.7L240 576C240 593.7 254.3 608 272 608C289.7 608 304 593.7 304 576L304 416C304 407.2 311.2 400 320 400C328.8 400 336 407.2 336 416L336 576C336 593.7 350.3 608 368 608C385.7 608 400 593.7 400 576L400 300.7z"/></svg>
            </div>
            <div class="legendblock">
              <p class="legendText">Vaccinated</p>
              <svg class="peoples vaccinatedPeople" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M376 88C376 57.1 350.9 32 320 32C289.1 32 264 57.1 264 88C264 118.9 289.1 144 320 144C350.9 144 376 118.9 376 88zM400 300.7L446.3 363.1C456.8 377.3 476.9 380.3 491.1 369.7C505.3 359.1 508.3 339.1 497.7 324.9L427.2 229.9C402 196 362.3 176 320 176C277.7 176 238 196 212.8 229.9L142.3 324.9C131.8 339.1 134.7 359.1 148.9 369.7C163.1 380.3 183.1 377.3 193.7 363.1L240 300.7L240 576C240 593.7 254.3 608 272 608C289.7 608 304 593.7 304 576L304 416C304 407.2 311.2 400 320 400C328.8 400 336 407.2 336 416L336 576C336 593.7 350.3 608 368 608C385.7 608 400 593.7 400 576L400 300.7z"/></svg>
            </div>
            
          </div>
          </div>
          
        </v-carousel-item>

        <v-carousel-item>
          <div class="box-numbers car-item">
            <div class ="card"><p class="big-number" >{{ new Intl.NumberFormat('en-GB',{ maximumFractionDigits: 0 }).format(totalDeaths) }}</p>
              <p v-if="showChange" :class="{changeNumberGreen: (totalDeaths - totalDeathsOld)<0,changeNumberRed: (totalDeaths - totalDeathsOld)>0}"><span v-if="(totalDeaths - totalDeathsOld)>0">+</span>{{ new Intl.NumberFormat('en-GB',{ maximumFractionDigits: 0 }).format((totalDeaths - totalDeathsOld)) }}</p> <p>Deaths</p>
            </div>  
            <div class ="card"><p class="big-number" >{{ new Intl.NumberFormat('en-GB',{ maximumFractionDigits: 0 }).format(totalParalysis) }}</p>
              <p v-if="showChange" :class="{changeNumberGreen: (totalParalysis- totalParalysisOld)<0,changeNumberRed: (totalParalysis- totalParalysisOld)>0}"><span v-if="(totalParalysis - totalParalysisOld)>0">+</span>{{ new Intl.NumberFormat('en-GB',{ maximumFractionDigits: 0 }).format((totalParalysis - totalParalysisOld)) }}</p> <p>Paralysis</p> 
            </div>
            <div class ="card"><p class="big-number" >{{ new Intl.NumberFormat('en-GB',{ maximumFractionDigits: 0 }).format(totalVaccinatedPeople) }}</p>
              <p v-if="showChange" :class="{changeNumberGreen: (totalVaccinatedPeople - totalVaccinatedPeopleOld)>0,changeNumberRed: (totalVaccinatedPeople - totalVaccinatedPeopleOld)<0}"><span v-if="(totalVaccinatedPeople - totalVaccinatedPeopleOld)>0">+</span>{{ new Intl.NumberFormat('en-GB',{ maximumFractionDigits: 0 }).format((totalVaccinatedPeople - totalVaccinatedPeopleOld)) }}</p> <p>Vaccinated</p>
              <p>Costing: {{new Intl.NumberFormat('en-GB',{maximumFractionDigits:0}).format(totalVaccinatedPeople * cost_per_immunized_person) }} $ </p> 
            </div>
            <div class ="card"><p class="big-number" >{{  new Intl.NumberFormat('en-GB',{ maximumFractionDigits: 1 }).format(totalVaccineRelatedDeaths) }}</p>
              <p v-if="showChange" :class="{changeNumberGreen: (totalVaccineRelatedDeaths - totalVaccineRelatedDeathsOld)<0,changeNumberRed: (totalVaccineRelatedDeaths - totalVaccineRelatedDeathsOld)}"><span v-if="(totalVaccineRelatedDeaths - totalVaccineRelatedDeathsOld)>0">+</span>{{ new Intl.NumberFormat('en-GB',{ maximumFractionDigits: 1 }).format((totalVaccineRelatedDeaths - totalVaccineRelatedDeathsOld)) }}</p> <p>Polio Deaths due to Vaccine</p> 
            </div>
          </div>
        </v-carousel-item>

        <v-carousel-item>
          <div class="lineChart car-item">
            <Line id="seir-chart" :options="chartOptions" :data="chartData" style="height: 100%;"/>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-btn-toggle
          v-model="selectedSettings"
          rounded="1"
          group
          density="compact"
          class="btn-group"
          color="#99621E"
          base-color="#FEE1C7"
          elevation="6"
        >
          <v-btn  value="option1" class="text-body-1" max-width="25%" >
            60%
          </v-btn>
          <v-btn value="no_vax" class="text-body-1" slim>
            No <br/>Vaccines
          </v-btn>

          <v-btn value="immune_pop" class="text-body-1"  slim>
            Immune Population
          </v-btn>

          <v-btn value="custom" class="text-body-1" max-width="25%" slim>
            Custom
          </v-btn>
        </v-btn-toggle>

    <div class="sliders">
        <!-- <h3>Vaccinated Newborns</h3>
        <v-slider
          v-model="fraction_vaccinated_newborns"
          max="1"
          min="0"
          :ticks=percentageLabels
          thumb-label
          step="0.01"
          tick-size="3"
          rounded="pill"
          track-size="20"
          track-color="#FEE1C7"
          track-fill-color="#99621E"
          thumb-size="0"
          
        >
      <template v-slot:thumb-label="{ modelValue }">
              {{ modelValue*100 + "%" }}
          </template></v-slider> -->
        <h3>Spread of Polio</h3>
        <v-row no-gutters>
          <v-col class="v-col-3 " ><p class="countryLabels">Europe</p></v-col>
          <v-col class="v-col-3 "><p class="countryLabels" >DRC</p></v-col>
          <v-col class="v-col-3 "><p class="countryLabels" >North Africa</p></v-col>
          <v-col class="v-col-3 "><p class="countryLabels" >India</p></v-col>
        </v-row>
        <v-slider
          v-model="beta"
          :ticks="betaTextLabels"
          min="0.20"
          max="1.20"
          step="0.1"
          tick-size="3"
          rounded="pill"
          track-size="20"
          track-color="#FEE1C7"
          track-fill-color="#99621E"
          thumb-size="0"
        >
        <template v-slot:thumb-label="{ modelValue }">
            {{ betaLabels[modelValue] }}
          </template>
        </v-slider>
        <h3>Vaccinated Population at Start</h3>
        <v-slider
          v-model="fractio_immune_population"
          max="1"
          min="0"
          thumb-label
          step="0.01"
          tick-size="3"
          :ticks=percentageLabels
          rounded="pill"
          track-size="20"
          track-color="#FEE1C7"
          track-fill-color="#99621E"
          thumb-size="0"
        >
      <template v-slot:thumb-label="{ modelValue }">
        <!-- think about if we want to add cost of vaccination -->
              {{ modelValue*100 + "%" }}
          </template>
        </v-slider>
        <h3 style="margin-bottom: 1em;">Vaccine Used</h3>
        <v-row justify="center">
          <v-btn-toggle
            v-model="selectedVaccine"
            rounded="1"
            group
            class="btn-group"
            color="#99621E"
            base-color="#FEE1C7"
            elevation="6"
          >
            <v-btn value="opv" class="text-body-1"  >
              OPV (Old)
            </v-btn>

            <v-btn value="ipv" class="text-body-1" >
              IPV (Modern)
            </v-btn>

          </v-btn-toggle>
        </v-row>
      </div>
    <div class="recalc-button">
      <button @click="recalculateDatasets" class="btn-primary">
          Recalculate Outbreak
      </button>
    </div>
    

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, triggerRef, onUpdated, watchEffect, watch } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, type ChartOptions } from 'chart.js'
// @ts-ignore
import { calculateSEIRData } from '../scripts/seirData'
import { fraction } from 'mathjs';

const props = defineProps({initialDisplay: String,initialVaccineRate: Number, initialImmunePopulation: Number, initialBeta: Number, initialVaccineUsed: String})

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

const betaTextLabels = {
  0.10: 'Slow Spread',
  0.20: '',
  0.30: '',
  0.40: '',
  0.50: '',
  0.60: '',
  0.70: '',
  0.80: '',
  0.90: '',
  1.00: '',
  1.10: '',
  1.20: 'Fast Spread'
}
// const betaLabels = {
//   0.27: 'Western Europe',
//   0.54: 'DPC',
//   0.80: 'Northern Africa',
//   1.07: 'India',
// } 
const betaLabels: { [key: string]: string } = {
  0.10: 'Western Europe',
  0.20: 'Western Europe',
  0.30: 'Western Europe',
  0.40: 'DRC',
  0.50: 'DRC',
  0.60: 'DRC',
  0.70: 'North Africa',
  0.80: 'North Africa',
  0.90: 'North Africa',
  1.00: 'India',
  1.10: 'India',
} 

// Parameters
//
// R0 = beta/gamma
// Industrialized country 	Good 	United States, Western Europe, Australia, etc. 	A 	4; beta: 0.27
// Industrialized country 	Poor 	South America, Russia 	A 	10; beta: 0.67
// Developing country 	Poor 	Egypt, Eastern Europe, Northern Africa, Middle East, etc. 	A 	12; beta: 0.80
// Developing country 	Dense and poor 	India 	A 	14–18; beta: 1.07
// Developing country 	Poor 	Horn of Africa (e.g., Congo, Uganda) 	B 	8–12; beta: 0.67
// Developing country 	Poor 	Central Asia (e.g., Tajikistan, Turkmenistan) 	B 	10–14; beta: 0.80
// Developing country 	Poor 	Angola, Chad, Democratic Republic of the Congo, and Sudan 	C 	8–12; beta: 0.54
// Developing country 	Poor 	Afghanistan, Nigeria, and Pakistan 	D 	14–17; beta: 1.04

let seirData:any;
let firstPass = true;
let N = 5000000; // Population (5*10^6)
const beta = ref(props.initialBeta); // Contact rate
let gamma = 0.067; // Recovery rate
let sigma = 0.13; // Rate of incubation
// let birth_rate = 0.005 ; //0.005 0.0001144
let birth_rate = 0.0001144;
// let mortality_rate = 0.005; //0.005 0.0001144
let mortality_rate = 0.0001144; //0.005 0.0001144
let vaccineInfectionRate = 3.79/10e6;
let peopleSpheres = 100
let prevent_auto_reset_after_click = false
let cost_per_immunized_person = 0.14 // https://www.unicef.org/media/161751/file/Standard%20costs%20of%20fully%20vaccinating%20a%20child_UNICEF_2024.pdf.pdf
const simulation_duration_days = 365 * 1 // 1 years
const fraction_vaccinated_newborns = ref(props.initialVaccineRate);
const fractio_immune_population = ref(props.initialImmunePopulation);
const infection_mortality_rate = 0.005;
const infection_paralysis_rate = 0.05;
const display = ref(props.initialDisplay);
const items = ref([] as number[]);
const selectedSettings = ref("custom");
const selectedVaccine = ref(props.initialVaccineUsed);
const showChange = ref(false);

const totalDeaths = ref(0.0);
const totalDeathsOld = ref(0.0);
const totalParalysis = ref(0.0);
const totalParalysisOld = ref(0.0);
const totalImmunizedPeople = ref(0.0);
const totalVaccinatedPeople = ref(0.0);
const totalVaccinatedPeopleOld = ref(0.0);
const totalVaccineRelatedDeaths = ref(0.0);
const totalVaccineRelatedDeathsOld = ref(0.0);

const paralysisPeopleThreshold = ref(0.0);
const deadPeopleThreshold = ref(0.0);
const vaccinePeopleThreshold = ref(0.0);


let display_options = {
  susceptible: false,
  exposed: false,
  infected: true,
  recovered: true,
  vaccinated: false,
  population: true,
  deaths: true,
}

watch([fraction_vaccinated_newborns,beta,fractio_immune_population],()=>{
  if(prevent_auto_reset_after_click==false){
    selectedSettings.value= "custom"
  }
  prevent_auto_reset_after_click = false;
})

watch(selectedSettings,(newValue,oldValue)=>{
  prevent_auto_reset_after_click = true;
  switch(selectedSettings.value){
    case "option1":
      // fraction_vaccinated_newborns.value = 0.8
      fractio_immune_population.value = 0.6
      recalculateDatasets();
      break;
    case "no_vax":
      // fraction_vaccinated_newborns.value = 0.0
      fractio_immune_population.value = 0.0
      recalculateDatasets();
      break;
    case "immune_pop":
      // fraction_vaccinated_newborns.value = 0.0
      fractio_immune_population.value = 0.99
      recalculateDatasets();
      break;
    default:
      return;
  }
})

watch(selectedVaccine,(newValue,oldValue)=>{
  recalculateDatasets()
  })

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
const chartData:any = ref({
  datasets: [{}]
})

const chartOptions:any = {
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Polio Simulation',
    },
  },
  scales: {
    x: {
      type: 'linear',
      title: "Days",
      min: 0,
      // ticks:{
      //   stepSize: 50,
      // }
      // ticks: {
      //   callback: function (value: any){
      //     return seirData.t[value].toFixed()
      //   }
      // }
    },
    y: {
      title:"people",
      min: 0,
      max: N,
      ticks: {
        callback: function (value: any){
          // return value/1000000;
          return value/1000 + "K"
        }
      }
    }
  }
}

onMounted(async () => {
    recalculateDatasets()
    display.value = props.initialDisplay;
    firstPass = false;
    for(let i=0; i<peopleSpheres;i++){
      items.value[i] = i;
    }
})

function switchView(){
  display.value=='graph' && !firstPass ?display.value='numbers':display.value='graph';
}

async function recalculateDatasets() {
  try {
    let oldSeirData:any;
    if (!firstPass && seirData){
      showChange.value = true;
      oldSeirData = seirData
      totalDeathsOld.value = totalDeaths.value;
      totalParalysisOld.value = totalParalysis.value;
      totalVaccinatedPeopleOld.value = totalVaccinatedPeople.value;
      totalVaccineRelatedDeathsOld.value = totalVaccineRelatedDeaths.value;
    }
    switch(selectedVaccine.value){
      case("opv"):
        console.log("opv")
        vaccineInfectionRate = 3.79/10e6;
        cost_per_immunized_person = 7.66;
        break;
      case("ipv"):
        console.log("ipv")
        vaccineInfectionRate = 0;
        cost_per_immunized_person = 11.30;
        break;
      case("10xopv"):
        console.log("10xopv")
        vaccineInfectionRate = (3.79/10e6) * 10
        break;  
    }

    seirData = calculateSEIRData(N, fractio_immune_population.value, beta.value, gamma, sigma, birth_rate, mortality_rate, fraction_vaccinated_newborns.value, infection_mortality_rate,simulation_duration_days);
    const newDatasets = [];
    let susc = seirData.y.map((row:number[])=>row[0])


    if(display_options.population){
      newDatasets.push({
        label: 'Population',
        data: seirData.y.map((row:any,index:number) => [seirData.t[index],row.reduce((acc:number,curr:number)=>acc + curr)]),
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(0, 0 0, 0.2)',
      })
      if (!firstPass){
        newDatasets.push({
          label: 'Old Population',
          data: oldSeirData.y.map((row:any,index:number) => [oldSeirData.t[index],row.reduce((acc:number,curr:number)=>acc + curr)]),
          borderColor: 'rgb(0, 0, 0)',
          backgroundColor: 'rgba(0, 0 0, 0.2)',
          borderDash: [5,5],
        })
      }
    }

    if(display_options.susceptible){
      newDatasets.push({
        label: 'Susceptible',
        data: seirData.y.map((row:any,index:number) => [seirData.t[index],row[0]]),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      })
      if (!firstPass){
        newDatasets.push({
          label: 'Susceptible Old',
          data: oldSeirData.y.map((row:any,index:number) => [oldSeirData.t[index],row[0]]),
          borderColor: 'rgb(75, 192, 192, 0.5)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderDash: [5,5],
        })
      }
    }

    if (display_options.exposed){
      newDatasets.push({
        label: 'Exposed',
        data: seirData.y.map((row:any,index:number) => [seirData.t[index],row[1]]),

        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
      })
      if (!firstPass){
        newDatasets.push({
          label: 'Exposed Old',
          data: oldSeirData.y.map((row:any,index:number) => [oldSeirData.t[index],row[1]]),
          borderColor: 'rgb(255, 205, 86)',
          backgroundColor: 'rgba(255, 205, 86, 0.2)',
          borderDash: [5,5],
        })
      }
    }

    if (display_options.infected){
      newDatasets.push({
        label: 'Infectious',
        data: seirData.y.map((row:any,index:number) => [seirData.t[index],row[2]]),
        borderColor: '#7570b3',
        backgroundColor: '#7570b320',
      })
      if (!firstPass){
        newDatasets.push({
          label: 'Infectious Old',
          data: oldSeirData.y.map((row:any,index:number) => [oldSeirData.t[index],row[2]]),
          borderColor: '#7570b3',
          backgroundColor: '#7570b320',
          borderDash: [5,5],
        })
      }
    }

    if (display_options.recovered){
      newDatasets.push({
        label: 'Immune',
        data: seirData.y.map((row:any,index:number) => [seirData.t[index],row[3]+row[4]]),
        borderColor: '#1b9e77',
        backgroundColor: '#1b9e7720',
      })
      if (!firstPass){
        newDatasets.push({
          label: 'Immune (last sim)',
          data: oldSeirData.y.map((row:any,index:number) => [oldSeirData.t[index],row[3]+row[4]]),
          borderColor: '#1b9e77',
        backgroundColor: '#1b9e7720',
          borderDash: [5,5],
        })
      }
    }

    if (display_options.vaccinated){
      newDatasets.push({
        label: 'Vaccinated',
        data: seirData.y.map((row:any,index:number) => [seirData.t[index],row[4]]),
      })
      if (!firstPass){
        newDatasets.push({
          label: 'Vaccinated Old',
          data: oldSeirData.y.map((row:any,index:number) => [oldSeirData.t[index],row[4]]),
          borderDash: [5,5],
        })
      }
    }

    let deathsAccum:any[] = []
    seirData.y.forEach((element:any, index:any) => {
      let prevValue;
      deathsAccum.length == 0 ? prevValue = 0 : prevValue = deathsAccum[index-1][1]
      deathsAccum.push([seirData.t[index],prevValue + (element[2]*infection_mortality_rate)*sigma])
    });

    let deathsAccumOld:any[] = []
    if(!firstPass){
      oldSeirData.y.forEach((element:any, index:any) => {
        let prevValue;
        deathsAccumOld.length == 0 ? prevValue = 0 : prevValue = deathsAccumOld[index-1][1]
        deathsAccumOld.push([oldSeirData.t[index],prevValue + (element[2]*infection_mortality_rate)*sigma])
      });
    }

    if (display_options.deaths){
        newDatasets.push({
          label: 'Total Deaths',
          data: deathsAccum,
          borderColor: 'rgb(255, 0, 127)',
          backgroundColor: 'rgba(255, 0, 127, 0.2)',
        })
        if (!firstPass){
          newDatasets.push({
            label: 'Old Total Deaths',
            data: deathsAccumOld,
            borderColor: 'rgb(255, 0, 127)',
            backgroundColor: 'rgba(255, 0, 127, 0.2)',
            borderDash: [5,5],
          })
        }
    }
    let paralysis = seirData.y.map((row:number[]) => row[2]*infection_paralysis_rate*sigma);
    totalParalysis.value = paralysis.reduce((acc: any,curr: any)=>acc+curr); //probably wrong

    totalDeaths.value = deathsAccum[deathsAccum.length-1][1]

    // totalVaccinatedPeople.value = seirData.y[seirData.y.length-1][4];
    fractio_immune_population.value ? totalVaccinatedPeople.value = fractio_immune_population.value * (N-5) : totalVaccinatedPeople.value = 0;
    totalVaccineRelatedDeaths.value = totalVaccinatedPeople.value * (vaccineInfectionRate) // platt et. al 2014, median value
    let immunized_people = seirData.y.map((row:number[])=>row[3]);
    totalImmunizedPeople.value = immunized_people.reduce((acc: any,curr: any)=>acc+curr);


    deadPeopleThreshold.value = Math.round((totalDeaths.value/N)*peopleSpheres);
    paralysisPeopleThreshold.value = Math.round((totalParalysis.value/N)*peopleSpheres + deadPeopleThreshold.value);
    vaccinePeopleThreshold.value = Math.round((totalVaccinatedPeople.value/N)*peopleSpheres + paralysisPeopleThreshold.value);

    chartData.value = {
      labels: seirData.t,
      datasets: newDatasets
    };
  } catch (error) {
    console.error('Error loading SEIR data:', error);
  }
}

</script>
<style scoped>
.sliders{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.countryLabels{
  border-left: 0.2rem dotted;
  text-align: center;
}


p{
  color: black;
}

.countryLabels{
  align-self: center;
}

.wrapper {
  display:flex;
  flex-direction: column;
  height: 100vh;
}

.simHeader{
  padding: .25em;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: 400;
  font-size: xx-large;
  text-align: center;
}

.changeNumberGreen{
  color: green;
}

.changeNumberRed{
  color: red;
}

.carousel{
  touch-action: none;
}
.car-item{
  height: 100%;
}

.lineChart{
  padding-left: .5rem;
  padding-right: .5rem;
}

.btn-primary{
  background-color: var(--accent-color);
  padding: 1em;
  border-radius: .5em;
  color: white;
}

.btn-primary:hover{
  background-color: var(--secondary-color);
  color: black;
}

.box-numbers{
  padding: .5em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.people-capsules{
  padding: .5em;
  display: grid;
  height: 30vh;
  grid-template-columns: repeat(10,minmax(0,1fr));
  grid-template-rows: repeat(10,minmax(0,1fr));
  justify-content: space-evenly;
  align-content: center;
}

svg{
  height: 100%;
  width: 100%;
}

.legend{
  height: 7vh;
  display: flex;
  justify-content: space-evenly;
}

.legendblock{
  display:flex;
  flex-direction: column;
  align-items: center;
}

.legendText{
  align-self: center;
  padding: .5em;
}

.seperator{
  margin-bottom: 0.5em;
  margin: 0em 1em 0.5em 1em;
  border-radius: 5px;
  border: 1px solid gray;
}

.paralysisPeople{
  fill: var(--paralysis-color);
}

.deadPeople{
  fill: var(--deaths-color);
}

.vaccinatedPeople{
  fill: var(--vaccinated-color);
}

.card{
  padding: 1em;
  margin: .5em;
  box-shadow: 2px 2px 2px gray;
  text-align: center;
  align-content: center;
  border-radius: 2em;
  background-color: var(--secondary-color) ;
}

.big-number{
  font-size: x-large;
  color: black;
}


#button{
  background-color: var(--accent-color);
}

.button-row{
  display:flex;
  justify-content: space-evenly;
  width: 100vw;
  bottom:10px;
}

.recalc-button{
  display:flex;
  justify-content: space-evenly;
  margin-top: 2em;
  width: 100vw;
  margin-bottom: 1em;
}

.btn-group{ 
  margin-top: 1vh;
  margin-bottom: 1vh;
  overflow: hidden;
  height: 7vh;
  margin-left: .5em;
  
}



</style>