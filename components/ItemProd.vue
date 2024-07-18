<script setup>

    const props = defineProps([ 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const count = computed(() => store.getItemProd(props.itemId).toPrecision(4))

</script>

<template>
    <span v-if="count < 0" class="text-danger"><format-number :value="count" /><small class="opacity-50"> /s</small></span>
    <span v-if="count == 0" class="text-normal"><format-number :value="count" /><small class="opacity-50"> /s</small></span>
    <span v-if="count > 0" class="text-success">+<format-number :value="count" /><small class="opacity-50"> /s</small></span>
</template>
