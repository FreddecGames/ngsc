<template>
    <page-pane :id="id" :name="name" :icon="icon">
        
        <template v-slot:titleBar>
        
            <div class="col-auto pt-1">
                <item-prod :itemId="itemId" />
                <small class="text-normal ms-1">/s</small>
            </div>
        
            <div class="col-auto pt-1">
                <item-count :itemId="itemId" />
                <small v-if="storageUnlocked && storegable" class="text-normal ms-1">/<item-storage :itemId="itemId" /></small>
            </div>
            
        </template>
        
        <slot />
        
    </page-pane>
</template>

<script>
import ItemCount from './ItemCount.vue'
import ItemProd from './ItemProd.vue'
import ItemStorage from './ItemStorage.vue'

import PagePane from './PagePane.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'id', 'name', 'icon', 'itemId' ],
    components: {
        
        'item-count': ItemCount,
        'item-prod': ItemProd,
        'item-storage': ItemStorage,
        
        'page-pane': PagePane,
    },
    computed: {
    
        ...mapGetters([ 'isStoregable', 'getItemCount' ]),
        
        storegable: function() { return this.isStoregable(this.itemId) },
        storageUnlocked: function() { return this.getItemCount('missionStorage') >= 1 },
    },
}
</script>