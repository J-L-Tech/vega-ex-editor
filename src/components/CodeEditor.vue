<script setup lang="ts">

// Code Mirror 
import { autocompletion, closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { bracketMatching, defaultHighlightStyle, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting } from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { EditorState } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark';
import { crosshairCursor, drawSelection, dropCursor, EditorView, highlightActiveLine, highlightActiveLineGutter, highlightSpecialChars, keymap, lineNumbers, rectangularSelection } from '@codemirror/view'

// Vue
import { ModelRef, onMounted, onUnmounted, watchEffect} from "vue";

let editor: EditorView;
let content: ModelRef<string | undefined, string> = defineModel();

function pushChanges(event: KeyboardEvent) {
  if (event.key == "s" && event.ctrlKey) {
    content.value = editor.state.doc.toString();
  }
}

defineExpose({
  getCurrentState
})

function getCurrentState(): string {
  return editor.state.doc.toString();
}

onMounted(() => {
  const target = document.querySelector('#editor')!;
  editor = new EditorView({
    parent: target,
    state: EditorState.create({
      doc: content.value,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
          ...lintKeymap,
        ]),
        oneDark,
        javascript(),
      ],
    }),
  })
  
  watchEffect(() => {
    editor.dispatch({changes: {
      from: 0,
      to: editor.state.doc.length,
      insert: content.value
    }});
  });

  window.addEventListener("keyup", pushChanges);
});

onUnmounted(() => {
  window.removeEventListener("keyup", pushChanges);
})

</script>

<template>
  <div style="height: 400px; overflow:scroll;" id="editor"></div>
</template>
