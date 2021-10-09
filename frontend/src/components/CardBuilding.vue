<template>
    <card v-if="unlocked && !hidden" :id="id" :name="name" :icon="icon">
        <template v-slot:header>
        
            <div v-if="level" class="col-auto">
                <span class="badge">T{{ level }}</span>
            </div>
            
            <div v-if="max > 1" class="col-auto">
                <small class="me-1">x</small>
                <item-count :itemId="itemId" />
            </div>
            
            <div v-if="count >= max" class="col-auto">
                <small class="text-uppercase text-success">{{ $t('done') }}</small>
            </div>
            
        </template>
        <template v-slot:col-1>
        
            <block-desc :descs="descs" />
            
            <div v-if="destroyable" class="col">
                <div class="row g-1 align-items-center">
                
                    <div class="col-auto">
                        <button type="button" class="btn btn-danger" :class="{ 'disabled':!can }" @click="destroy({ id:itemId, count:1 })">
                            {{ $t('button-destroy') }}
                        </button>
                    </div>
                    
                    <div v-if="multi" class="col-auto">
                        <button type="button" class="btn btn-danger" :class="{ 'disabled':!canNuke }" @click="destroy({ id:itemId, count:count })">
                            {{ $t('button-nuke') }}
                        </button>
                    </div>
                    
                </div>
            </div>
            
        </template>
        <template v-slot:col-2>
            
            <block-desc v-if="descs2" :descs="descs2" />
            
            <block-build :itemId="itemId" :btnText="btnText" />
            
        </template>
    </card>
</template>

<script>
import BlockBuild from './BlockBuild.vue'
import BlockDesc from './BlockDesc.vue'

import Card from './Card.vue'

import ItemCount from './ItemCount.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
    props: [ 'id', 'name', 'level', 'descs', 'descs2', 'icon', 'itemId', 'btnText', 'toHide' ],
    components: {
        
        'block-build': BlockBuild,
        'block-desc': BlockDesc,
        
        'card': Card,
        
        'item-count': ItemCount,
    },
    computed: {
    
        ...mapGetters([ 'isUnlocked', 'isHidden', 'getItemCount', 'getItemMax', 'isDestroyable', 'canDestroy' ]),
        
        max: function() { return this.getItemMax(this.itemId) },
        count: function() { return this.getItemCount(this.itemId) },
        unlocked: function() { return this.isUnlocked(this.itemId) },
        
        can: function() { return this.canDestroy(this.itemId, 1) },
        canNuke: function() { return this.canDestroy(this.itemId, this.count) },
        destroyable: function() { return this.isDestroyable(this.itemId) },
        multi: function() { return this.getItemCount('dmUpgdMultiBuild') >= 1 },
        
        hidden: function() {
            if (!this.toHide) return false
            return this.isHidden(this.id)
        },
    },
    methods: {
    
        ...mapActions([ 'destroy' ]),
    },
}
</script>