<script setup>

    const props = defineProps([ 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const count = computed(() => { return store.getItemUpgrade(props.itemId) })

</script>

<template>
    <span class="text-light"><format-number :value="count" /></span>
</template>
