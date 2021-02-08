<template>
  <div class="app">
    <h1>vue-markdown-editor</h1>
    <p>A Markdown editor component for Vue that renders in place without the need for a preview pane. This is the component that powers <a href="https://github.com/voraciousdev/octo">Octo</a>.</p>
    <MarkdownEditor ref="editor" v-model="markdown" :theme="theme" :settings="{ images: { enabled: true } }" class="editor" />
    <div class="toggle">
      <label>
        <input v-model="theme" type="radio" value="light">
        <span>light</span>
      </label>
      <label>
        <input v-model="theme" type="radio" value="dark">
        <span>dark</span>
      </label>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  name: 'App',
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      /* eslint no-template-curly-in-string: "off" */
      markdown: '# Hello, World!\n\nThis editor supports [Markdown](https://en.wikipedia.org/wiki/Markdown) with dynamic syntax highlighting for code.\n\n```js\n// a snippet\nconst greet = (name) => {\n  return `Hello, ${name}!`\n}\n```',
      theme: 'dark',
    }
  },
  watch: {
    theme(value) {
      document.body.classList.remove('dark', 'light')
      document.body.classList.add(value)
    },
  },
  mounted() {
    this.$refs.editor.focus()
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  height: -webkit-fill-available;
}

body {
  font-family: sans-serif;
  height: 100vh;
  height: -webkit-fill-available;

  display: flex;
  flex-direction: column;
}

a {
  font-weight: bold;
}

.app {
  margin: auto;
  max-width: 70rem;
  width: 100%;
}

.toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
}

.editor {
  border-radius: 0.25em;
  padding: 1em;
}

.dark {
  background-color: #111;
  color: #aaa;
}

.dark a {
  color: #aaa;
}

.dark .editor {
  background-color: #050505;
}

.light a {
  color: #000;
}

.light .editor {
  background-color: #fafafa;
}
</style>
