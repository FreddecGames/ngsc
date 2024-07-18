<script setup>

    const props = defineProps([ 'name', 'icon', 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { build } = store
    
    const count = computed(() => { return store.getItemCount(props.itemId) })
    const ulCount = computed(() => { return store.getItemCount('ultrite') })
    
</script>

<template>
    <div class="col-4 col-sm-4 col-lg-2">
        <div class="card card-body border-0 p-2">
            <div class="row row-cols-1 g-2">
    
                <div class="col text-truncate text-center small">
                    <span class=" text-steelblue text-uppercase">{{ $t(name) }}</span>
                </div>
                
                <div class="col text-center">
                    <img class="me-1" :src="icon" width="24" height="24" :alt="$t(name)" />
                </div>
                
                <div v-if="count < 1" class="col">
                    <button type="button" class="w-100 btn btn-primary px-1" :class="{ 'disabled':ulCount < 10 }" @click="build({ id:itemId, count:1 })">
                        <div class="w-100 row gx-1 align-items-center justify-content-center">
                        
                            <div class="col-auto d-flex align-items-center">
                                <img src="/icons/ultrite.png" width="12" height="12" :alt="$t('ultrite')" />
                                <span class="ms-1">10</span>
                            </div>
                            
                            <div class="col-auto d-flex align-items-center">
                                {{ $t('button-activate') }}
                            </div>
                            
                        </div>
                    </button>
                </div>
                
                <div v-if="count > 0" class="col text-center">
                    <small class="text-success text-uppercase">{{ $t('activated') }}</small>
                </div>
                
            </div>
        </div>
    </div>
</template>
