<template>
  <div>
    <nuxt />
    <modal />
    <page-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PageFooter from '~/components/Footer.vue'
import Modal from '~/components/Modal.vue'
export default Vue.extend({
  name: 'Default',
  components: {
    PageFooter,
    Modal
  }
})
</script>
