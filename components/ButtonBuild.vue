<script setup>

    const props = defineProps([ 'itemId', 'count', 'btnText' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const { build } = store

    const can = computed(() => { return store.canBuild(props.itemId, props.count) })
	
</script>

<template>
    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':can != 0 && can != -5 }" @click="build({ id:itemId, count:count })">
        <span v-if="can == 0 || can == -5">{{ $t(btnText) }}</span>
        <span v-if="can == -1">{{ $t('not-enough-resource') }}</span>
        <span v-if="can == -2">{{ $t('not-enough-consumption') }}</span>
        <span v-if="[-3, -4].includes(can)">{{ $t('error') }} {{ can }}</span>
        <span v-if="can == -6">{{ $t('full') }}</span>
        <span v-if="can == -7">{{ $t('too-many') }}</span>
    </button>
</template>
