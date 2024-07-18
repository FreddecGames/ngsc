<script setup>

    const props = defineProps([ 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const count = computed(() => { return store.getItemStorage(props.itemId).toPrecision(4) })

</script>

<template>
    <format-number :value="count" />
</template>
