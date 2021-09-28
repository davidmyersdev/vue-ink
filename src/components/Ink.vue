<template>
  <div ref="ink"></div>
</template>

<script>
import ink from '@writewithocto/ink'

export default {
  name: 'Ink',
  
  emits: { 'update:modelValue': String },

  props: {
    appearance: {
      type: String,
      default: 'dark',
      validator(appearance) {
        return ['dark', 'light'].includes(appearance)
      },
    },
    attribution: {
      type: Boolean,
      default: true,
    },
    extensions: {
      type: Array,
      default: () => [],
    },
    images: {
      type: Boolean,
      default: false,
    },
    initialSelection: {
      type: Object,
    },
    spellcheck: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      instance: null,
    }
  },
  watch: {
    appearance(value) {
      this.instance.reconfigure({ appearance: value })
    },
    attribution(value) {
      this.instance.reconfigure({ attribution: value })
    },
    images(value) {
      this.instance.reconfigure({ images: value })
    },
    spellcheck(value) {
      this.instance.reconfigure({ spellcheck: value })
    },
    modelValue(value) {
      if (this.instance.doc() !== value) {
        this.instance.update(value)
      }
    },
  },
  methods: {
    focus() {
      this.instance.focus()
    },
    select(selection) {
      this.instance.select(selection)
    },
    selection() {
      return this.instance.selection()
    },
  },
  mounted() {
    this.instance = ink(this.$refs.ink, {
      appearance: this.appearance,
      attribution: this.attribution,
      doc: this.modelValue,
      extensions: this.extensions,
      images: this.images,
      selection: this.initialSelection,
      spellcheck: this.spellcheck,
      onChange: (doc) => {
        this.$emit('update:modelValue', doc)
      },
    })
  },
}
</script>
