<script setup>

    const props = defineProps([ 'name', 'icon', 'itemId' ])

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { dmBoostCount } = storeToRefs(store)    
    
    const { boost } = store
    
    const count = computed(() => { return store.getItemCount(props.itemId) })
    const dmCount = computed(() => { return store.getItemCount('darkmatter') })

</script>

<template>
    <div class="col-4 col-sm-4 col-lg-2">
        <div class="card card-body border-0 p-2">
            <div class="row row-cols-1 g-2">
    
                <div class="col text-center text-truncate">
                    <img class="me-1" :src="icon" width="14" height="14" :alt="$t(name)" />
                    <span class="text-uppercase text-steelblue">{{ $t(name) }}</span>
                </div>
                
                <div class="col text-center">
                    <span class="h5" :class="{ 'text-muted':count <= 0, 'text-success':count > 0 }">+<format-number :value="count" />%</span>
                </div>
                
                <div class="col">
                    <button type="button" class="w-100 btn btn-primary small px-0" :class="{ 'disabled':dmCount < dmBoostCount }" @click="boost({ id:itemId, count:parseInt(dmBoostCount) })">
                        <div class="w-100 row gx-1 align-items-center justify-content-center small lh-1">
                        
                            <div class="col-auto d-flex">
                                <img src="/icons/darkmatter.png" width="10" height="10" :alt="$t('darkmatter')" />
                            </div>
                            
                            <div class="col-auto">
                                {{ dmBoostCount }}
                            </div>
                            
                            <div class="col-auto">
                                <i class="text-normal fas fa-fw fa-long-arrow-alt-right small"></i>
                            </div>
                            
                            <div class="col-auto d-flex align-items-center">
                                +{{ dmBoostCount }}%
                            </div>
                            
                        </div>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>
