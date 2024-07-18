<script setup>

    const props = defineProps([ 'resId', 'itemId', 'level' ])
    
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const { build } = store
    
    const can = computed(() => { return store.canBuild(props.itemId, 1) })
    const count = computed(() => { return store.getItemCount(props.itemId) })
    const unlocked = computed(() => { return store.isUnlocked(props.itemId) })
    const production = computed(() => { return store.getItemProduction(props.itemId, props.resId) })

</script>

<template>
    <div v-if="unlocked" class="col small">
        <div class="row gx-2 align-items-center">
            <div class="col text-truncate">
                <span class="badge text-uppercase text-center p-2 me-2">{{ $t(level) }}</span>
                <span class="me-1" :class="{ 'text-light':count > 0 }"><small class="opacity-50">x</small> <format-number :value="count" /></span>
                <span class="text-normal">{{ $t(itemId) }}</span>
            </div>
            <div class="col-auto">
                <span :class="{ 'text-success':production != 0 }"><span v-if="production > 0">+</span><format-number :value="production" /></span>
                <small class="text-normal ms-1">/s</small>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-success lh-1" :class="{ 'disabled':can != 0 && can != -5 }" @click="build({ id:itemId, count:1 })">
                    <small><font-awesome-icon icon="fa-plus-circle" /></small>
                </button>
            </div>
        </div>
    </div>
</template>
