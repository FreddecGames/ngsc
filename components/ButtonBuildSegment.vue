<script setup>

    const props = defineProps([ 'itemId', 'count', 'btnText' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const can = computed(() => { return store.canBuildDysonPart(props.itemId, props.count) })

    const onBuild = function() { store.buildDysonPart({ id:props.itemId, count:props.count }) }
        
</script>

<template>
    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 }" @click="onBuild()">
        <span>{{ $t(btnText) }}</span>
    </button>
</template>
