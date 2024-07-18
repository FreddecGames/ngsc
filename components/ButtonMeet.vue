<script setup>
        
    import { Modal } from 'bootstrap'

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { meet } = store
    
    const can = computed(() => { return store.getItemCount('statue') >= 150 })

    const meetModalShow = function() {
        
        let element = document.getElementById('meetModal')
        let meetModal = new Modal(element)
        meetModal.show()
    }

</script>

<template>

    <button type="button" class="btn btn-primary" :class="{ 'disabled':!can }" @click="meet(); meetModalShow();">
        {{ $t('button-meet') }}
    </button>
    
</template>
