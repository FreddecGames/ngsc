<script setup>

    const props = defineProps([ 'id', 'descs', 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const timer = computed(() => { return store.getTimer(props.itemId, store.getItemStorage(props.itemId)) })
    
    const unlocked = computed(() => { return store.isUnlocked(props.itemId) })
    const storageUnlocked = computed(() => { return store.getItemCount('missionStorage') >= 1 })

</script>

<template>
    <card v-if="unlocked && storageUnlocked" :id="id" name="card-title-upgrade">
        <template v-slot:header>
        
            <div class="col-auto small">
                <small class="me-1">x</small>
                <item-upgrade :itemId="itemId" />
            </div>
            
        </template>
        <template v-slot:col-1>
        
            <block-desc :descs="descs" />
        
            <div class="col">
                <div class="row gx-2">
                
                    <div class="col-auto small">
                        <span>{{ $t('value-full-storage') }}</span>
                    </div>
                    
                    <div class="col-auto small">
                        <timer-count :count="timer" />
                    </div>
                    
                </div>
            </div>
        
        </template>
        <template v-slot:col-2>
        
            <block-upgrade :itemId="itemId" />

        </template>
    </card>
</template>
