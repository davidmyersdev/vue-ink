[![latest tag](https://img.shields.io/github/v/tag/voraciousdev/vue-markdown-editor?color=blue&label=latest%20tag&sort=semver)](https://github.com/voraciousdev/vue-markdown-editor/releases)
[![license](https://img.shields.io/github/license/voraciousdev/vue-markdown-editor)](https://github.com/voraciousdev/vue-markdown-editor/blob/master/LICENSE)
[![open issues](https://img.shields.io/github/issues-raw/voraciousdev/vue-markdown-editor)](https://github.com/voraciousdev/vue-markdown-editor/issues)

# vue-markdown-editor

A Markdown editor component for Vue that renders in place without the need for a preview pane. This is the component that powers [Octo](https://github.com/voraciousdev/octo).

![screenshot](https://i.imgur.com/H5NZj8Q.gif)

Check out a quick demo [on YouTube](https://youtu.be/LfhkoCAK6aA).

## Features

### Dark and Light Themes

Dark theme by default. Dynamic theme switching. 😎

### Inline Markdown Rendering

All Markdown formatting is rendered in place. This eliminates the need for a preview pane while keeping your document in plain text. Feel free to copy and paste your Markdown into or out of this editor!

### Automatic Syntax Highlighting

Code blocks are automatically highlighted based on the tagged language.

## Install and Use

### Install

```shell
npm install --save @voraciousdev/vue-markdown-editor
```

### Basic Usage

```vue
<template>
  <MarkdownEditor v-model="markdown" />
</template>

<script>
import MarkdownEditor from '@voraciousdev/vue-markdown-editor'

export default {
  name: 'App',
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      markdown: '# Hello, World!'
    }
  },
}
</script>
```

### Change Themes

The optional `theme` field accepts a string of either `dark` or `light`.

```vue
<template>
  <input v-model="theme" type="radio" value="light"> light
  <input v-model="theme" type="radio" value="dark"> dark
  <MarkdownEditor v-model="markdown" :theme="theme" />
</template>

<script>
import MarkdownEditor from '@voraciousdev/vue-markdown-editor'

export default {
  name: 'App',
  components: {
    MarkdownEditor,
  },
  data() {
    return {
      markdown: '# Hello, World!',
      theme: 'light',
    }
  },
}
</script>
```

## Contribute

This library uses `yarn`.

### Install dependencies

```shell
yarn install
```

### Compile and hot-reload for development

```shell
yarn serve
```

### Compile for production

```shell
yarn build
```

### Run the unit tests

```shell
yarn test:unit
```

### Lint and fix files

```shell
yarn lint
```
