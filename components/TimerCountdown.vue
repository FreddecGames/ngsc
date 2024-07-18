<script setup>

    const props = defineProps([ 'itemId', 'target' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const prod = computed(() => { return store.getItemProd(props.itemId) })
    const count = computed(() => { return store.getItemCount(props.itemId) })
    
    const value = computed(() => {
        
        let val = 0
        if (prod.value && count.value < props.target) val = (props.target - count.value) / prod.value
        if (prod.value < 0) return Infinity
        else if (prod.value == 0) return -2
        
        if (val > 0 && val < 1) val = Math.floor(val * 1000) + ' ms'
        else if (val > 0 && val < (3600 * 24 * 2)) {
        
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
    })
        
</script>

<template>
    <span v-if="value == -3" class="text-warning">> 48h</span>
    <span v-if="value == -2">---</span>
    <span v-if="value == -1">---</span>
    <span v-if="value == 0" class="text-success"><font-awesome-icon icon="fa-fw fa-check" /></span>
    <span v-if="value != -3 && value != -2 && value != -1 && value != 0" class="text-timer">{{ value }}</span>
</template>
