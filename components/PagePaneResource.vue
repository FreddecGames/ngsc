<script setup>

    const props = defineProps([ 'id', 'name', 'icon', 'itemId' ])
    
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const storegable = computed(() => { return store.isStoregable(props.itemId) })
    const storageUnlocked = computed(() => { return store.getItemCount('missionStorage') >= 1 })
    
</script>

<template>
    <page-pane :id="id" :name="name" :icon="icon">
        
        <template v-slot:titleBar>
            <div class="col-auto">
                <div class="row g-2 align-items-center justify-content-end">
                    <div class="col-auto">
                        <div class="card">
                            <div class="card-body small text-end flex-nowrap text-end p-2 border-0">
                                <item-count :itemId="itemId" />
                                <small v-if="storageUnlocked && storegable" class="text-normal ms-1">/<item-storage :itemId="itemId" /></small>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="card card-body small text-end p-2 border-0">
                            <item-prod :itemId="itemId" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        
        <slot />
        
    </page-pane>
</template>
