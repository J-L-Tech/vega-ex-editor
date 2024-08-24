<script setup lang="ts">
"use strict";
import { onMounted, Ref, ref, watchEffect} from 'vue';
import { View, parse} from 'vega';
import { bar_spec, /*donut_spec, stacked_area_spec, barley_trellis_spec, population_pyramid_spec */ } from '../spec_examples';

import CodeEditor from './CodeEditor.vue';
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';

import { invoke } from '@tauri-apps/api';


const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

let view: View;
const editor = ref<InstanceType<typeof CodeEditor>>()

const code: Ref<string> = ref(JSON.stringify(bar_spec, null, 2));

const darkMode: Ref<boolean> = ref(false)

onMounted(() => {
  render(code.value);

  watchEffect(() => {
    render(code.value);
  });

  watchEffect(() => {
    const element = document.querySelector('html');
    element?.classList.toggle('my-app-dark', darkMode.value);
  });
})


async function saveFile() {
  console.log(await invoke<string>("save", { contents: editor.value?.getCurrentState(), fileExtension: ".json" }));
}

async function exportSvg() {
  invoke("save", {contents: await view.toSVG(), fileExtension: ".svg"}); 
}

// TODO
// async function exportPng() {
//   invoke("save", {contents: await view.toCanvas(), fileExtension: ".png"}); 
// }

async function openFile() {
  let fileContents = await invoke<string>("open")
    .then((contents) => { return contents;})
    .catch((error) => {console.log(error); return "";})
  console.log(fileContents);
  code.value = fileContents;
}

function newFile() {
  code.value = "{\n\n}";
}

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
    <Button icon="pi pi-file-plus"    aria-label="New File"   outlined @click="newFile()" />
    <Button icon="pi pi-folder-open"  aria-label="Open File"  outlined @click="openFile()" />
    <Button icon="pi pi-save"         aria-label="Save File"  outlined @click="saveFile()" />
    <Button icon="pi pi-file-export"  aria-label="Export Svg" outlined @click="exportSvg()" />
    <ToggleButton on-icon="pi pi-moon" off-icon="pi pi-sun" on-label="Dark Mode" off-label="Light Mode" v-model="darkMode" />
    <CodeEditor v-model:content="code" v-model:dark="darkMode" ref="editor" />
  </div>
  <div style="background-color: white; color: white">
    <div v-bind:id="props.id"></div>
  </div>
</template>
