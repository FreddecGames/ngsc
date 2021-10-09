<template>
    {{ value }}
</template>

<script>
export default {
    props: [ 'time' ],
    computed: {
        
        value: function() {
        
            let val = this.time
            
            if (val > 0) {
            
                let d = Math.floor(val / (3600 * 24))
                
                let h = Math.floor(Math.floor(val / (3600 * 24)) % 3600)
                if (h < 10) { h = '0' + h }
                
                let m = Math.floor(Math.floor(val / 60) % 60)
                if (m < 10) { m = '0' + m }
                
                let s = Math.floor(val % 60)
                if (s < 10) { s = '0' + s }
                
                if (d > 0) val = d + this.$t('days') + ' ' + h + ':' + m + ':' + s
                else val = h + ':' + m + ':' + s
            }
            
            return val
        },
    },
}
</script>