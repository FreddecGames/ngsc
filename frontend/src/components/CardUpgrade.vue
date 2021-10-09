<template>
    <card v-if="unlocked && storageUnlocked" :id="id" name="card-title-upgrade">
        <template v-slot:header>
        
            <div class="col-auto">
                <small class="me-1">x</small>
                <item-upgrade :itemId="itemId" />
            </div>
            
        </template>
        <template v-slot:col-1>
        
            <block-desc :descs="descs" />
        
            <div class="col">
                <div class="row g-1">
                
                    <div class="col small">
                        <span>{{ $t('value-full-storage') }}</span>
                    </div>
                    
                    <div class="col-auto small">
                        <timer-count :itemId="itemId" :count="storage" />
                    </div>
                    
                </div>
            </div>
        
        </template>
        <template v-slot:col-2>
        
            <block-upgrade :itemId="itemId" />

        </template>
    </card>
</template>

<script>
import BlockDesc from './BlockDesc.vue'
import BlockUpgrade from './BlockUpgrade.vue'

import Card from './Card.vue'

import ItemUpgrade from './ItemUpgrade.vue'

import TimerCount from './TimerCount.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'id', 'descs', 'itemId' ],
    components: {
        
        'block-desc': BlockDesc,
        'block-upgrade': BlockUpgrade,

        'card': Card,
        
        'item-upgrade': ItemUpgrade,
        
        'timer-count': TimerCount,
    },
    computed: {
    
        ...mapGetters([ 'getItemStorage', 'getItemCount', 'isUnlocked' ]),
        
        storage: function() { return this.getItemStorage(this.itemId) },
        
        unlocked: function() { return this.isUnlocked(this.itemId) },
        storageUnlocked: function() { return this.getItemCount('missionStorage') >= 1 },
    },
}
</script>