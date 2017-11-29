<template>
	<audio id="myaudio" ref="audio" @ended="musicEnded"></audio>
</template>
<script>
	
	export default {
		methods: {
			musicEnded () {
				store.dispatch('play_Ended')
			}
		},
		mounted () {
			this.$emit('audiocreate', this.$refs.audio)
		}
	}
</script>
