<script setup lang="ts">
"use strict";
import { onMounted, Ref, ref, watchEffect} from 'vue';
import { View, parse} from 'vega';
import { bar_spec, /*donut_spec, stacked_area_spec, barley_trellis_spec, population_pyramid_spec */ } from '../spec_examples';

import CodeEditor from './CodeEditor.vue';



const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

let view: View;

const code: Ref<string> = ref(JSON.stringify(bar_spec, null, 2));
// const spec: Ref<{}> = ref(bar_spec);

onMounted(() => {
  render(code.value);

  watchEffect(() => {
    render(code.value);
  });
})


function render(specStr: string) {
  view = new View(parse(JSON.parse(specStr)), {
    renderer:  'canvas',  // renderer (canvas or svg)
    container: "#" + props.id,   // parent DOM container
    hover:     true       // enable hover processing
  });
  return view.runAsync();
}
</script>

<template>
  <div>
    
    <CodeEditor v-model="code" />
  </div>
  <div v-bind:id="props.id"></div>
</template>
