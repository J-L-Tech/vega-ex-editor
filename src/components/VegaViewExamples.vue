<script setup lang="ts">
"use strict";
import { onMounted} from 'vue';
import { View, parse} from 'vega';
import { bar_spec, donut_spec, stacked_area_spec, barley_trellis_spec, population_pyramid_spec } from '../spec_examples';

// let spec: Ref<{}> = ref(bar_spec);
let view;
// let svg;

// function setSpec(newSpec: {}) {
//   spec.value = newSpec;
// }

onMounted(() => {
  render(bar_spec);
})
// watchEffect(() => render());

function render(spec: {}) {
  view = new View(parse(spec), {
    renderer:  'canvas',  // renderer (canvas or svg)
    container: '#view',   // parent DOM container
    hover:     true       // enable hover processing
  });

  // svg = new View(parse(spec.value), {
  //   renderer:  'svg',  // renderer (canvas or svg)
  //   container: '#svg',   // parent DOM container
  //   hover:     true       // enable hover processing
  // });
  // svg.runAsync();
  return view.runAsync();
}
</script>

<template>
  <div style="display: flex;">
    <button @click="render(bar_spec)">Bar Chart</button>
    <button @click="render(donut_spec) ">Donut Chart</button>
    <button @click="render(stacked_area_spec) ">Stacked Area Chart</button>
    <button @click="render(barley_trellis_spec) ">Barley-Tellis Chart</button>
    <button @click="render(population_pyramid_spec)">Population Pyramid</button>
  </div>
  
  <div id="view"></div>
  <!-- <div id="svg"></div> -->
</template>
