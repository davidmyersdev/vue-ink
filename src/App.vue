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
    <Ink ref="editor" v-model="markdown" :appearance="appearance" :settings="{ images: { enabled: true } }" class="editor" />
  </div>
</template>

<script>
import Ink from '@/components/Ink'

export default {
  name: 'App',
  components: { Ink },
  data() {
    return {
      /* eslint no-template-curly-in-string: "off" */
      markdown: '# Hello, World!\n\nThis editor supports [Markdown](https://en.wikipedia.org/wiki/Markdown) with dynamic syntax highlighting for code.\n\n```js\n// a snippet\nconst greet = (name) => {\n  return `Hello, ${name}!`\n}\n```',
      appearance: 'dark',
    }
  },
  watch: {
    appearance(value) {
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(value)
    },
  },
  mounted() {
    this.$refs.editor.focus()
  },
}
</script>
