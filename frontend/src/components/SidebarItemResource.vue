<template>
    <sidebar-item v-if="unlocked" :name="name" :icon="icon" :paneId="paneId">
        <template v-slot:extra>
            
            <div class="col-auto text-end small">
                <small><item-prod :itemId="itemId" /></small>
                <small class="text-normal ms-1">/s</small>
            </div>
            
            <div class="col-auto text-end small" style="width:90px;">
                <small><item-count :itemId="itemId" /></small>
                <small v-if="storageUnlocked && storegable" class="text-normal ms-1">/<item-storage :itemId="itemId" /></small>
            </div>
            
        </template>
        <template v-if="storageUnlocked" v-slot:buttons>
        
            <button v-if="storegable" type="button" class="btn small" :class="{ 'active':activePane == paneId, 'disabled':can != 0 }" @click="upgrade({ id:itemId, count:1 })">
                <i class="fas fa-fw fa-arrow-alt-circle-up"></i>
            </button>
            
            <button v-if="!storegable" class="btn small disabled" :class="{ 'active':activePane == paneId }" style="width:30px"></button>

        </template>
    </sidebar-item>
</template>

<script>
import SidebarItem from './SidebarItem.vue'

import ItemCount from './ItemCount.vue'
import ItemProd from './ItemProd.vue'
import ItemStorage from './ItemStorage.vue'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'name', 'icon', 'paneId', 'itemId' ],
    components: {
        
        'sidebar-item': SidebarItem,
        
        'item-count': ItemCount,
        'item-prod': ItemProd,
        'item-storage': ItemStorage,
    },
    computed: {
    
        ...mapState([ 'activePane' ]),
        
        ...mapGetters([ 'isUnlocked', 'isStoregable', 'canUpgrade', 'getItemCount' ]),
        
        can: function() { return this.canUpgrade(this.itemId, 1) },
        unlocked: function() { return this.isUnlocked(this.itemId) },
        storegable: function() { return this.isStoregable(this.itemId) },
        storageUnlocked: function() { return this.getItemCount('missionStorage') >= 1 },
    },
    methods: {
    
        ...mapActions([ 'upgrade' ]),
    },
}
</script>