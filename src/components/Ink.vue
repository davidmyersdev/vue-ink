<template>
  <div ref="ink"></div>
</template>

<script lang="ts">
import ink from '@writewithocto/ink'
import { defineComponent } from 'vue'

import type * as Ink from '@writewithocto/ink'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'Ink',
  emits: ['input', 'update:modelValue'],
  props: {
    options: {
      type: Object as PropType<Ink.DeepPartial<Ink.Options>>,
    },
    modelValue: {
      type: String,
    },
    value: {
      type: String,
    },
    version: {
      type: Number,
      default: () => 3,
      validator: (value: number) => (
        [2, 3].includes(value)
      ),
    },
  },
  data() {
    return { instance: undefined } as { instance?: Ink.Instance }
  },
  watch: {
    options: {
      deep: true,
      handler(newValue, _oldValue) {
        this.instance?.reconfigure(newValue)
      },
    },
    modelValue(value) {
      if (this.instance?.doc() !== value) {
        this.instance?.update(value)
      }
    },
    value(value) { // Vue 2 support
      if (this.instance?.doc() !== value) {
        this.instance?.update(value)
      }
    },
  },
  computed: {
    doc() {
      return (this.version === 3 ? this.modelValue : this.value) || ''
    },
  },
  methods: {
    focus() {
      this.instance?.focus()
    },
    select(selections: Ink.Editor.Selection[]) {
      this.instance?.select(selections)
    },
    selections() {
      return this.instance?.selections()
    },
  },
  mounted() {
    this.instance = ink(this.$refs.ink as HTMLElement, {
      ...this.options,
      doc: this.doc,
      hooks: {
        ...this.options?.hooks,
        afterUpdate: (doc: string) => {
          if (this.version === 3) {
            this.$emit('update:modelValue', doc)
          } else {
            this.$emit('input', doc) // Vue 2 support
          }

          if (this.options?.hooks?.afterUpdate) {
            this.options.hooks.afterUpdate(doc)
          }
        },
      },
    })

    // @ts-ignore
    this.$refs.ink.addEventListener('input', (event: InputEvent) => {
      event.stopPropagation()
    })

    this.instance.focus()
  },
})
</script>
