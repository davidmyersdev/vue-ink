<template>
  <div class="container">
    <figure class="figure">
      <img :src="source" @load="onLoad" @error="onError" :alt="alt">
      <figcaption v-if="showCaptions && alt" class="caption sans-serif"><small>{{ alt }}</small></figcaption>
    </figure>
  </div>
</template>

<script>
export default {
  name: 'MarkdownEditorImage',
  props: {
    alt: String,
    onError: Function,
    onLoad: Function,
    showCaptions: Boolean,
    source: String,
  },
}
</script>

<style scoped>
.container {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.25rem !important;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  margin-bottom: 0.5rem;
  max-width: 100%;
}

.container img {
  display: block;
  max-height: 20rem;
  max-width: 100%;
}

.container .figure {
  margin: 0;
}

.container .caption {
  text-align: center;
  margin-top: 1rem;
}
</style>
