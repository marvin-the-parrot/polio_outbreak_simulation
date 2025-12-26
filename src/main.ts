import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'de',
  messages: {
    en: {
      text: {
        vaccineHistory: 'Vaccines and Polio share a long history together, if you want to find out how they interact for yourself just scroll along.',
        controlledDisease: 'As of today, Polio is a pretty well controlled disease. Most regions do not have any cases.',
        simulateYourself: 'Want to try simulating an outbreak for yourself?',
        whereOutbreak: 'Where are we simulating a polio outbreak?',
        skip: 'Skip this! Take me to the simulation Tool!',
        countrySelected: 'selected. We will be simulating with 1 Million people.',
        historyStele: 'Polio has a long history, the first documented cases were found on an egyptian stele dated to 1400 BC',
        oldVaccine: 'The oldest Polio Vacine (OPV) has a small chance of causing a polio infection. 1 in 2.700.000 doses have this effect. Vaccination can cause outbreaks, but it also prevents the spread of polio.',
        whatPercentageImmune: 'What percentage of the population is already immune (recovered or vaccinated)?',
        ironLung: 'The iron lung, a negative pressure breathing apparatus for patients who could no longer breathe on their own, was invented to increase the survivability of people suffering from paralytic polio.',
        whatVaccine: 'What Vaccine are we using?',
        price: {
          old: '7.66$ per Immunization',
          new: '11.30$ per Immunization',
        },
        daysLater: 'days later',
        dead: 'Dead',
        paralysis: 'Paralysis',
        vaccinated: 'Vaccinated',
        deathsfromvaccine: 'Polio Infections due to Vaccine',
        costing: 'Costing:',
        spreadOfPolio: 'Spread of Polio',
        vaccinatedPopluationAtStart: 'Vaccinated Population at Start',
        presets: 'Presets',
        immunePopulation1: 'Immune',
        immunePopulation2: 'Population',
        custom: 'Custom',
        vaccineUsed: 'Vaccine Used',
        vaccineOld: 'OPV (Old)',
        vaccineNew: 'IPV (Modern)',
        recalculateOutbreak: 'Recalculate Outbreak'


      }
    },
    de: {
      text: {
        vaccineHistory: 'Impfungen und Polio (Kinderlähmung) teilen sich eine lange gemeinsame Vergangenheit, wenn du mehr herausfinden willst scrolle einfach nach unten.',
        controlledDisease: 'Heutzutage ist Polio eine ziemlich gut kontrollierte Krankheit. Die meisten Regionen haben keine Fälle mehr.',
        simulateYourself: 'Möchtest du selbst einen Ausbruch simulieren?',
        whereOutbreak: 'Wo simulieren wir einen Polio-Ausbruch?',
        skip: 'Überspringe das! Bring mich direkt zum Simulationstool!',
        countrySelected: 'ausgewählt. Wir werden mit 10 Million Menschen simulieren.',
        historyStele: 'Polio hat eine lange Geschichte, die ersten dokumentierten Fälle wurden auf einer ägyptischen Stele aus dem Jahr 1400 v. Chr. gefunden',
        oldVaccine: 'Der älteste Polio-Impfstoff (OPV) hat eine geringe Chance, selbst eine Polio-Infektion zu verursachen. 1 von 2.700.000 Dosen hat diese Wirkung. Impfungen können Ausbrüche verursachen, verhindern aber auch die Ausbreitung von Polio.',
        whatPercentageImmune: 'Welcher Prozentsatz der Bevölkerung ist bereits immun (genesen oder geimpft)?',
        ironLung: 'Die eiserne Lunge, ein Unterdruckbeatmungsgerät für Patienten, die nicht mehr selbstständig atmen konnten, wurde erfunden, um die Überlebenschancen von Menschen mit paralytischer Polio zu erhöhen.',
        whatVaccine: 'Welchen Impfstoff verwenden wir?',
        price: {
          old: '7,66$ pro Immunisierung',
          new: '11,30$ pro Immunisierung',
        },
        daysLater: 'Tage später',
        dead: 'Tot',
        paralysis: 'Lähmung',
        vaccinated: 'Geimpft',
        deathsfromvaccine: 'Polio-Infektionen durch Impfstoff',
        costing: 'Kosten:',
        spreadOfPolio: 'Ausbreitung von Polio',
        vaccinatedPopluationAtStart: 'Geimpfte Bevölkerung zu Beginn',
        presets: 'Voreinstellungen',
        immunePopulation1: 'Immune Bevölkerung',
        immunePopulation2: 'Bevölkerung',
        custom: 'Keine',
        vaccineUsed: 'Verwendeter Impfstoff',
        vaccineOld: 'OPV (Alt)',
        vaccineNew: 'IPV (Modern)',
        recalculateOutbreak: 'Ausbruch neu berechnen'
      }
    }
  }
})

const app = createApp(App)

app.use(i18n)
app.use(vuetify)
app.use(createPinia())
app.mount('#app')

