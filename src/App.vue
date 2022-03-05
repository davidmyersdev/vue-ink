<template>
  <div class="app">
    <div class="toggle">
      <label>
        <input v-model="appearance" type="radio" value="dark">
        <span>dark</span>
      </label>
      <label>
        <input v-model="appearance" type="radio" value="light">
        <span>light</span>
      </label>
    </div>
    <Ink ref="editor" v-model="doc" :options="options" class="editor" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Ink from '/src/components/Ink.vue'

import type { DeepPartial, Options, Values } from '@writewithocto/ink'

export default defineComponent({
  components: {
    Ink,
  },
  data() {
    return {
      editor: undefined,
      doc: [
        '# Hello, World!',
        '',
        'This editor supports [Markdown](https://en.wikipedia.org/wiki/Markdown) with dynamic syntax highlighting for code.',
        '',
        '```js',
        '// a snippet',
        'const greet = (name) => {',
        '  return `Hello, \${name}!`',
        '}',
        '```',
      ].join('\n'),
      options: {
        files: {
          dragAndDrop: true,
          handler: this.onFiles,
        },
        interface: {
          appearance: 'dark',
          images: true,
        },
      } as DeepPartial<Options>,
    }
  },
  computed: {
    appearance: {
      get() {
        // @ts-ignore
        return this.options.interface.appearance
      },
      set(value: Values.Appearance) {
        if (this.options?.interface?.appearance) {
          this.options.interface.appearance = value
        }

        document.documentElement.classList.remove('dark', 'light')
        document.documentElement.classList.add(value)
      },
    },
  },
  methods: {
    onFiles(files: FileList) {
      console.log({ files })
    },
  },
})
</script>
