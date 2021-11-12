<template>
    <span v-if="value == -3" class="text-warning">> 48h</span>
    <span v-if="value == -2">---</span>
    <span v-if="value == -1">---</span>
    <i v-if="value == 0" class="text-success fas fa-fw fa-check"></i>
    <span v-if="value != -3 && value != -2 && value != -1 && value != 0" class="text-timer">{{ value }}</span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: [ 'count' ],
    computed: {
    
        ...mapGetters([ 'getTimer' ]),
        
        value: function() {
            
            let val = this.count
            
            if (val > 0 && val < (3600 * 24 * 2)) {
            
                let h = Math.floor(val / 3600)
                if (h < 10) { h = '0' + h }
                
                let m = Math.floor(Math.floor(val / 60) % 60)
                if (m < 10) { m = '0' + m }
                
                let s = Math.floor(val % 60)
                if (s < 10) { s = '0' + s }
                
                val = h + ':' + m + ':' + s
            }
            else if (val > 0) val = -3
            
            return val
        },
    },
}
</script>