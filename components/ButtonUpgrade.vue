<script setup>

    const props = defineProps([ 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const { upgrade } = store
    
    const can = computed(() => { return store.canUpgrade(props.itemId) })

</script>

<template>
    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 }" @click="upgrade({ id:itemId, count:count })">
        <span v-if="can == 0">{{ $t('button-upgrade') }}</span>
        <span v-else-if="can == -1">{{ $t('not-enough-resource') }}</span>
        <span v-else-if="can == -4">{{ $t('max') }}</span>
        <span v-else>{{ $t('error') }}</span>
    </button>
</template>
