<template>
    
    <screen-loading v-if="isMobile() == false && gameLoaded == false" />
    <screen-game v-if="isMobile() == false && gameLoaded == true" />

    <screen-mobile v-if="isMobile() == true" />
	
</template>

<script>
import ScreenGame from './components/ScreenGame.vue'
import ScreenMobile from './components/ScreenMobile.vue'
import ScreenLoading from './components/ScreenLoading.vue'

import { mapState, mapActions } from 'vuex'

export default {
    components: {
        
        'screen-game': ScreenGame,
        'screen-mobile': ScreenMobile,
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
        
        
        isMobile: function() {
            
            let txt = navigator.userAgent || navigator.vendor || window.opera
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(txt))
				return true
            else
				return false
		},
		
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