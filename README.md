[![latest tag](https://img.shields.io/github/v/tag/writewithocto/vue-ink?color=blue&label=latest%20tag&sort=semver)](https://github.com/writewithocto/vue-ink/releases)
[![license](https://img.shields.io/github/license/writewithocto/vue-ink)](https://github.com/writewithocto/vue-ink/blob/master/LICENSE)
[![open issues](https://img.shields.io/github/issues-raw/writewithocto/vue-ink)](https://github.com/writewithocto/vue-ink/issues)

# vue-ink

The configurable, embeddable, extensible Vue markdown editor that powers [octo.app](https://octo.app). This package is a wrapper around [Ink](https://github.com/writewithocto/ink).

![screenshot](https://i.imgur.com/1tOS335.png)

Check out a quick demo [on YouTube](https://youtu.be/iyZiS0glaJE).

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
npm install --save @writewithocto/vue-ink
```

### Basic Usage

```vue
<template>
  <Ink v-model="markdown" />
</template>

<script>
import Ink from '@writewithocto/vue-ink'

export default {
  name: 'App',
  components: {
    Ink,
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

The optional `appearance` prop accepts a string of either `dark` (the default) or `light`.

```vue
<template>
  <input v-model="appearance" type="radio" value="dark"> dark
  <input v-model="appearance" type="radio" value="light"> light
  <Ink v-model="markdown" :appearance="appearance" />
</template>

<script>
import Ink from '@writewithocto/vue-ink'

export default {
  name: 'App',
  components: {
    Ink,
  },
  data() {
    return {
      appearance: 'light',
      markdown: '# Hello, World!',
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
