<template>
  <div>
    <v-layout>
      <v-flex xs6>
        <song-metadata :song="song" />
      </v-flex>

      <v-flex 
        xs6 
        class="ml-2">
        <you-tube :youtubeId="song.youtubeId" />
      </v-flex>

    </v-layout>
    
    <v-layout class="mt-2">
      <v-flex xs6>
        <tab :song="song"/>
      </v-flex>
      <v-flex 
        xs6 
        class="ml-2">
        <lyrics :song="song"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import SongMetadata from './SongMetadata'
import Tab from './Tab'
import Lyrics from './Lyrics'
import YouTube from './YouTube'
import SongService from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      song: {}
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId
    this.song = (await SongService.show(songId)).data
  },
  components: {
    Panel,
    SongMetadata,
    YouTube,
    Lyrics,
    Tab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
