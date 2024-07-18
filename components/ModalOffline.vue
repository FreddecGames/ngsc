<script setup>

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const { offlineGains } = storeToRefs(store)
    
    const production = computed(() => {
    
        let ret = []
        
        let resourceIds = [
            'energy', 'plasma', 'meteorite', 'carbon', 'fuel', 'antimatter',
            'science', 'oil', 'metal', 'gem', 'wood', 'silicon', 'uranium', 'lava',
            'lunarite', 'methane', 'titanium', 'gold', 'silver',
            'hydrogen', 'helium', 'ice', 'antimatter'
        ]
        resourceIds.forEach(resourceId => {
            
            let gain = offlineGains.value.after[resourceId] - offlineGains.value.before[resourceId]
            if (gain != 0) {
                
                let item = store.getItem(resourceId)
                
                ret.push({
                
                    id: resourceId,
                    count: gain,
                })
            }
        })
        
        return ret
    })
    
    const close = function() {
    
        store.offlineGains = null
        store.offlineModal = false
    }
    
</script>

<template>
    <div id="modalOffline" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div v-if="offlineGains" class="modal-body">
                    <div class="row row-cols-1 g-2 justify-content-center">
                        <div class="col-12">
                            <span class="fs-6 text-white">{{ $t('modalOffline_title') }}</span>
                        </div>
                        <div class="col-12 text-center small">
                            <span class="text-normal">{{ $t('modalOffline_text') }}</span>
                        </div>
                        <div class="col-12 text-center small">
                            <span class="text-white">{{ $t('modalOffline_info') }} <timer-count :count="offlineGains.time" /></span>
                        </div>
                        <div class="col-5">
                            <div class="row g-1">
                                <div v-for="prod in production" :key="prod.id" class="col-12 small">
                                    <div class="row gx-2 align-items-center">
                                        <div class="col">
                                            <img :src="'/icons/' + prod.id + '.png'" width="16" height="16" :alt="prod.id" />
                                            <span class="ms-2">{{ $t(prod.id) }}</span>
                                        </div>
                                        <div class="col-auto text-white">
                                            <format-number :value="prod.count" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col d-flex justify-content-end">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="close();">
                                {{ $t('modalOffline_close') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>