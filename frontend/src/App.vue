<template>
    
    <screen-loading v-if="gameLoaded == false" />
    
    <screen-game v-if="gameLoaded == true" />

</template>

<script>
import ScreenGame from './components/ScreenGame.vue'
import ScreenLoading from './components/ScreenLoading.vue'

import { mapState, mapActions } from 'vuex'

export default {
    components: {
        
        'screen-game': ScreenGame,
        'screen-loading': ScreenLoading,
    },
    data() {
        return {
            
            gameLoaded: false,

            timeSinceAutoSave: 0,
        }
    },
    computed: {
    
        ...mapState([ 'locale', 'autoSaveDelay' ]),
    },
    created() {
        
        this.gameLoaded = false
        
        const self = this
        setTimeout(() => {
        
            self.init()
            self.load()
            
            self.$i18n.locale = self.locale
            
            self.mainLoop()
            
            self.mainInterval = setInterval(() => { self.mainLoop() }, 100)
            self.autoSaveInterval = setInterval(() => { self.autoSave() }, 1000)
            
            self.gameLoaded = true
        }, 1000)
    },
    methods: {
    
        ...mapActions([ 'init', 'load', 'save', 'mainLoop', ]),
        
        autoSave() {
            
            let timeLeft = this.autoSaveDelay - this.timeSinceAutoSave
            if (this.autoSaveDelay < 0) timeLeft = 1000
            if (timeLeft < 100) {

                this.save()
                this.timeSinceAutoSave = 0
            }
            else this.timeSinceAutoSave += 1000
        },
    },
    beforeUnmount() {

        clearInterval(this.mainInterval)
        clearInterval(this.autoSaveInterval)
    },
}
</script>