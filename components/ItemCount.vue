<script setup>

    const props = defineProps([ 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const count = computed(() => store.getItemCount(props.itemId))
    const storage = computed(() => store.getItemStorage(props.itemId))

</script>

<template>
    <span v-if="storage" :class="{ 'text-light':count < storage, 'text-danger':count >= storage }"><format-number :value="count" /></span>
    <span v-if="!storage" class="text-light"><format-number :value="count" /></span>
</template>
