<script setup>

    const props = defineProps([ 'id', 'icon', 'name', 'body' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const collapsed = computed(() => { return store.collapsed.includes(props.id) })

</script>

<template>
    <div class="col">
        <div class="card">
        
            <div class="card-header">
                <div class="row g-2 align-items-center">
                
                    <div class="col text-truncate">
                        <button class="w-100 text-truncate text-start d-flex align-items-center small" :class="{ 'collapsed':collapsed }" @click="store.toggleCollapsed(id)">
                            <span class="text-steelblue card-toggler me-2"><font-awesome-icon icon="fa-fw fa-chevron-down" /></span>
                            <span v-if="icon" class="me-2"><img :src="icon" width="16" height="16" /></span>
                            <span class="text-truncate text-uppercase text-steelblue">{{ $t(name) }}</span>
                        </button>
                    </div>
                    
                    <slot name="header" />
                    
                </div>
            </div>
            
            <div :id="id" class="collapse" :class="{ 'show':!collapsed }">
                <div class="card-body">
                    <div class="row gy-2 gx-3">
                    
                        <div v-if="body" class="col-12">
                            <div class="row row-cols-1 g-2">
                                <slot name="body" />
                            </div>
                        </div>
                        
                        <div v-if="!body" class="col-12 col-lg-6">
                            <div class="row row-cols-1 g-2">
                                <slot name="col-1" />
                            </div>
                        </div>
                        
                        <div v-if="!body" class="col-12 col-lg-6">
                            <div class="row row-cols-1 g-2 justify-content-end">
                                <slot name="col-2" />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

