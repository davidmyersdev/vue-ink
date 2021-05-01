<template>
  <codemirror class="editor" :class="{ dark: (theme === 'dark'), light: (theme === 'light') }" :options="options" :value="value" @input="onInput" @ready="onReady" />
</template>

<script>
import deepmerge from 'deepmerge'
import Vue from 'vue'
import { codemirror } from 'vue-codemirror'

// import codemirror dependencies
import 'codemirror/addon/mode/overlay'
import 'codemirror/addon/mode/simple'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/markdown/markdown'
import '@/assets/one-mixed.css'

import { isVimLoaded, loadMode, loadVim } from '@/common/codemirror/codemirror'
import Markdown from '@/common/markdown/markdown'
import MarkdownEditorImage from '@/components/MarkdownEditorImage'

const GenerateImage = () => (Vue.extend(MarkdownEditorImage))

export default {
  name: 'MarkdownEditor',
  components: {
    codemirror,
  },
  props: {
    initialCursor: {
      type: Object,
      default: () => ({
        character: 0,
        line: 0,
      }),
      validator: (cursor) => (
        Object.prototype.hasOwnProperty.call(cursor, 'character') && Object.prototype.hasOwnProperty.call(cursor, 'line')
      ),
    },
    initialVimMode: {
      type: String,
    },
    settings: {
      type: Object,
      default: () => ({
        // nothing yet
      }),
    },
    theme: {
      type: String,
      default: 'dark',
    },
    value: String,
  },
  data() {
    return {
      defaultConfig: {
        images: {
          enabled: false,
          showCaptions: false,
        },
        keyMap: 'default',
        mode: 'gfm',
        tabSize: 2,
        theme: 'one-mixed',
      },
      editor: null,
      isInitialVimModeSet: false,
      isVimLoaded: false,
      text: '',
      widgets: [],
    }
  },
  watch: {
    settings() {
      this.maybeLoadVim()
    },
  },
  computed: {
    codeblocks() {
      return this.markdown.codeblocks()
    },
    config() {
      return deepmerge(this.defaultConfig, this.settings)
    },
    images() {
      return this.markdown.images()
    },
    keyMap() {
      if (this.config.keyMap === 'vim' && !this.isVimLoaded) return 'default'

      return this.config.keyMap
    },
    markdown() {
      return new Markdown(this.text)
    },
    options() {
      return {
        addModeClass: true,
        extraKeys: {
          // use spaces instead of tabs
          // https://github.com/codemirror/CodeMirror/issues/988#issuecomment-14921785
          'Shift-Tab': (instance) => {
            instance.indentSelection('subtract')
          },
          Tab: (instance) => {
            if (instance.somethingSelected()) {
              instance.indentSelection('add')
            } else {
              instance.replaceSelection(Array(instance.getOption('tabSize') + 1).join(' '), 'end', '+input')
            }
          },
        },
        indentUnit: this.config.tabSize,
        indentWithTabs: false,
        keyMap: this.keyMap,
        lineWrapping: true,
        mode: {
          name: this.config.mode,
          // fencedCodeBlockDefaultMode: 'html',
          highlightFormatting: true,
        },
        singleCursorHeightPerLine: true,
        tabSize: this.config.tabSize,
        theme: this.config.theme,
      }
    },
  },
  methods: {
    focus() {
      this.editor.focus()
    },
    focusEnd() {
      this.editor.setCursor({ line: this.editor.lineCount(), ch: 0 })
    },
    focusStart() {
      this.editor.setCursor({ line: 0, ch: 0 })
    },
    loadImages() {
      // clear all line widgets
      // TODO: only clear the ones that change
      this.widgets.forEach((widget) => this.editor.removeLineWidget(widget))

      if (this.config.images.enabled) {
        this.images.forEach((image) => {
          let lineWidget

          const ImageInstance = GenerateImage()

          const component = new ImageInstance({
            propsData: {
              alt: image.alt,
              onError: () => lineWidget.changed(),
              onLoad: () => lineWidget.changed(),
              showCaptions: this.config.images.showCaptions,
              source: image.url,
            },
          })

          lineWidget = this.editor.addLineWidget(image.line, component.$mount().$el, { above: true })

          this.widgets.push(lineWidget)
        })
      }
    },
    loadModes() {
      this.codeblocks.forEach((codeblock) => {
        if (codeblock.language) {
          // language specified
          loadMode(codeblock.language, {
            onload: this.refresh,
          })
        }
      })
    },
    maybeLoadVim() {
      if (this.settings.keyMap === 'vim' && !this.isVimLoaded) {
        loadVim({
          onload: () => { this.isVimLoaded = true },
        })
      }
    },
    maybeSetVimMode() {
      if (this.initialVimMode && !this.isInitialVimModeSet && this.keyMap === 'vim') {
        this.editor.setOption('keyMap', this.initialVimMode || this.keyMap)

        if (this.initialVimMode === 'vim-insert') {
          this.editor.state.vim.insertMode = true
          this.editor.setOption('disableInput', false)
          window.CodeMirror.signal(this.editor, 'vim-mode-change', { mode: 'insert' })
        }

        this.isInitialVimModeSet = true
      }
    },
    onInput(text) {
      this.text = text

      if (text !== this.value) {
        // prevent CM input events on :value changes
        this.$emit('input', text)
      }

      this.loadImages()
      this.loadModes()
    },
    onReady(instance) {
      this.editor = instance
      this.text = this.editor.getValue()

      this.maybeLoadVim()
      this.maybeSetVimMode()

      this.editor.setCursor({
        ch: this.initialCursor.character,
        line: this.initialCursor.line,
      })

      this.$emit('ready', instance)
      this.loadImages()
      this.loadModes()
    },
    refresh() {
      // get current cursor position
      const cursor = this.editor.getCursor()

      // refresh editor
      this.editor.setValue(this.editor.getValue())

      // set cursor position back to where it was
      this.editor.setCursor(cursor)
    },
  },
  created() {
    this.isVimLoaded = isVimLoaded()
  },
}
</script>

<style scoped>
.editor >>> .CodeMirror.cm-s-one-mixed {
  background-color: transparent !important;
}

.editor >>> .CodeMirror .cm-m-markdown:not(.cm-comment) {
  font-family: helvetica, sans-serif;
  font-size: 1em;
}

.editor >>> .CodeMirror {
  min-height: 100%;
  height: auto;
}

.editor >>> .CodeMirror {
  position: relative;
  font-size: 1em;
  line-height: 2.25em;
}

.editor >>> .CodeMirror .CodeMirror-line,
.editor >>> .CodeMirror .CodeMirror-line-like {
  font-family: 'Courier New', monospace;
  font-size: 1em;
  padding: 0;
}

.editor >>> .CodeMirror .cm-header-1 {
  font-size: 1.6em !important;
}

.editor >>> .CodeMirror .cm-header-2 {
  font-size: 1.5em !important;
}

.editor >>> .CodeMirror .cm-header-3 {
  font-size: 1.4em !important;
}

.editor >>> .CodeMirror .cm-header-4 {
  font-size: 1.3em !important;
}

.editor >>> .CodeMirror .cm-header-5 {
  font-size: 1.2em !important;
}

.editor >>> .CodeMirror .cm-header-6 {
  font-size: 1.1em !important;
}

.editor >>> .CodeMirror-scroll {
  overflow-y: hidden !important;
}

.light.editor >>> .caption {
  color: #444;
}
</style>
