<template>
  <panel title="YouTube Video">
    <youtube 
      :video-id="youtubeId"
      :player-width="800"
      :player-height="330"/>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
export default {
  props: [
    'youtubeId'
  ],
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
