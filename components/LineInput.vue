<script setup>

    const props = defineProps([ 'input' ])
    
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const prod = computed(() => { return store.getItemProd(props.input.id) })

</script>

<template>
    <div class="col-auto d-flex align-items-center justify-content-end flex-wrap" :title="$t(input.id)">
        <img class="me-1" :src="'/icons/' + input.id + '.png'" width="14" height="14" :alt="$t(input.id)" />
        <small :class="{ 'text-warning':input.count <= prod, 'text-danger':input.count > prod }">-<format-number :value="input.count" /><small class="opacity-50"> /s</small></small>
        <span v-if="input.count > prod" class="ms-1 text-danger"><font-awesome-icon icon="fa-fw fa-exclamation-triangle" /></span>
    </div>
</template>
