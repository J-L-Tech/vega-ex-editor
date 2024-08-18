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
import { ModelRef, onMounted, onUnmounted} from "vue";

let editor: EditorView;
let content: ModelRef<string | undefined, string> = defineModel();
// let content: Ref<string> = ref("");

function saveChanges(event: KeyboardEvent) {
  if (event.key == "s" && event.ctrlKey) {
    content.value = editor.state.doc.toString();
  }
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

  window.addEventListener("keyup", saveChanges);
});

onUnmounted(() => {
  window.removeEventListener("keyup", saveChanges);
})

</script>

<template>
  <div id="editor"></div>
</template>
