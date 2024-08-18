<script setup lang="ts">
"use strict";
import { onMounted, } from 'vue';
import { View, parse} from 'vega';
import { bar_spec, donut_spec, stacked_area_spec, barley_trellis_spec, population_pyramid_spec } from '../spec_examples';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
})
let view;

onMounted(() => {
  render(bar_spec);
})

function render(spec: {}) {
  view = new View(parse(spec), {
    renderer:  'canvas',  // renderer (canvas or svg)
    container: "#" + props.id,   // parent DOM container
    hover:     true       // enable hover processing
  });
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

  <div v-bind:id="props.id"></div>
</template>
