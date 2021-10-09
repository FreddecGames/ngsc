<template>
    <div v-if="unlocked" class="col-12 col-sm-6 col-lg-4">
        <div class="card">
        
            <div class="card-header">
                <div class="row g-2 align-items-center">
                
                    <div class="col d-flex align-items-center">
                        <img class="me-1" :src="require(`../assets/icons/${icon}`)" width="12" height="12" :alt="$t(name)" />
                        <span class="text-uppercase text-steelblue">{{ $t(name) }}</span>
                    </div>
                    
                    <div class="col-auto small">
                        <item-count :itemId="itemId" />
                        <small class="text-normal ms-1">/<item-storage :itemId="itemId" /></small>
                    </div>
                    
                </div>
            </div>
            
            <div class="card-body">
                <div class="row row-cols-1 g-2">
                
                    <block-convert :itemId="itemId" />

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import ItemCount from './ItemCount.vue'
import ItemStorage from './ItemStorage.vue'

import BlockConvert from './BlockConvert.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'name', 'icon', 'itemId' ],
    components: {
        
        'item-count': ItemCount,
        'item-storage': ItemStorage,
        
        'block-convert': BlockConvert,
    },
    computed: {
    
        ...mapGetters([ 'isUnlocked' ]),

        unlocked: function() { return this.isUnlocked(this.itemId) },
    },
}
</script>