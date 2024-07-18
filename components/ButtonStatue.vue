<script setup>

    const props = defineProps([ 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { statue } = store

    const can = computed(() => { return store.canStatue(props.itemId) })

</script>

<template>
    <button type="button" class="btn btn-primary d-flex align-items-center" :class="{ 'disabled text-danger':can != 0 }" @click="statue(itemId)">
        <img class="me-1" src="/icons/statue.png" width="12" height="12" :alt="$t('statue')" />
        <span v-if="can == 0">{{ $t('button-build') }}</span>
        <span v-if="can == -1">{{ $t('not-enough-resource') }}</span>
        <span v-if="[-2, -3, -4].includes(can)">{{ $t('error') }}</span>
    </button>
</template>
