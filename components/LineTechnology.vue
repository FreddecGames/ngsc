<script setup>

    const props = defineProps([ 'itemId', 'level', 'name' ])
    
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const done = computed(() => { return store.getItemCount(props.itemId) >= 1 })
    const unlocked = computed(() => { return store.isUnlocked(props.itemId) })
    
    const cost = computed(() => { return store.getBuildCosts(props.itemId, 1)[0] })

</script>

<template>
    <div v-if="unlocked && !done" class="col">
        <div class="row align-items-center gx-2">
            <div class="col text-truncate">
                <span class="badge text-uppercase text-center me-1">{{ $t(level) }}</span>
                <span>{{ $t(name) }}</span>
            </div>
            <div class="col-4">
                <line-cost v-if="cost" :cost="cost" />
            </div>
            <div class="col-auto">
                <button-build :itemId="itemId" count="1" btnText="button-research" class="lh-1" />
            </div>
        </div>
    </div>
</template>
