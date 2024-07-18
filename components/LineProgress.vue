<script setup>

    const props = defineProps([ 'itemId', 'target' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const count = computed(() => { return store.getItemCount(props.itemId) })

    const percentage = computed(() => {
        
        let ret = 0
        if (count.value < props.target) ret = 100 * (count.value / props.target)
        else ret = 100
            
        return ret
    })

</script>

<template>
    <div class="progress" style="height: 3px; margin-top: 5px">
        
        <div class="progress-bar bg-success" role="progressbar" :style="'width:' + percentage +'%'" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100" />
    </div>
</template>
