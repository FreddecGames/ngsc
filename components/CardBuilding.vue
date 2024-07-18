<script setup>

    const props = defineProps([ 'id', 'name', 'level', 'descs', 'descs2', 'icon', 'itemId', 'btnText', 'toHide' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { destroy } = store
    
    const max = computed(() => { return store.getItemMax(props.itemId) })
    const count = computed(() => { return store.getItemCount(props.itemId) })
    const toggle = computed(() => { return store.getItemToggle(props.itemId) })
    const unlocked = computed(() => { return store.isUnlocked(props.itemId) })
    
    const can = computed(() => { return store.canDestroy(props.itemId, 1) })
    const canNuke = computed(() => { return store.canDestroy(props.itemId, count) })
    const destroyable = computed(() => { return store.isDestroyable(props.itemId) })
    const multi = computed(() => { return store.getItemCount('dmUpgdMultiBuild') >= 1 })
    
    const hidden = computed(() => {
    
        if (!props.toHide) return false
        return store.isHidden(props.id)
    })
    
    const canToggle = function() {
        
        let check = true
        
        let item = store.getItem(props.itemId)
        item.outputs.forEach(output => {
            
            let outputProd = store.getItemProd(output.id)
            let producerProd = store.getItemProduction(props.itemId, output.id)
            if (item.toggle == true && producerProd > outputProd) check = false
        })
        
        return check
    }
    
    const doToggle = function() {
        
        if (canToggle() == true) {
        
            let item = store.getItem(props.itemId)
            item.toggle = !item.toggle
            
            store.refreshProd()
        }
    }
    
</script>

<template>
    <card v-if="unlocked && !hidden" :id="id" :name="name" :icon="icon">
        <template v-slot:header>
        
            <div v-if="level" class="col-auto lh-1">
                <span class="badge">T{{ level }}</span>
            </div>
            
            <div v-if="!max || (max && max > 1 && count < max)" class="col-auto small">
                <small class="me-1">x</small>
                <item-count :itemId="itemId" />
                <small v-if="max > 1" class="ms-1 text-normal">/{{ max }}</small>
            </div>
            
            <div v-if="max && count >= max" class="col-auto">
                <small class="text-uppercase text-success">{{ $t('done') }}</small>
            </div>

            <div v-if="toggle != null" class="col-auto small">
                <div class="form-check form-switch" :class="{ 'opacity-25':canToggle() == false }">
                    <input class="form-check-input" :class="{ 'bg-danger border-danger':toggle == false }" type="checkbox" role="switch" :id="id + 'switch'" v-model="toggle" @click="doToggle();">
                    <label class="form-check-label" :for="id + 'switch'">
                        <span v-if="toggle == true" class="text-steelblue">ON</span>
                        <span v-else class="text-danger">OFF</span>
                    </label>
                </div>
            </div>
            
        </template>
        <template v-slot:col-1>
        
            <block-desc :descs="descs" />
            
            <div v-if="destroyable" class="col">
                <div class="row g-2 align-items-center">
                
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
            
            <block-build :itemId="itemId" :btnText="btnText">
                <slot />
            </block-build>
            
        </template>
    </card>
</template>
