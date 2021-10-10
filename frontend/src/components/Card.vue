<template>
    <div class="col">
        <div class="card">
        
            <div class="card-header">
                <div class="row g-2 align-items-center">
                
                    <div class="col">
                        <button class="w-100 text-start d-flex align-items-center" :class="{ 'collapsed':initCollapsed }" data-bs-toggle="collapse" :data-bs-target="'#' + id" :aria-expanded="initCollapsed" :aria-controls="id" @click="toggleCollapsed(id)">
                            <i class="text-steelblue card-toggler fas fa-fw fa-chevron-down me-1"></i>
                            <img v-if="icon" class="me-2" :src="require(`../assets/icons/${icon}`).default" width="12" height="12" :alt="$t(name)" />
                            <span class="text-uppercase text-steelblue">{{ $t(name) }}</span>
                        </button>
                    </div>
                    
                    <slot name="header" />
                    
                </div>
            </div>
            
            <div :id="id" class="collapse" :class="{ 'show':!initCollapsed }">
                <div class="card-body">
                    <div class="row g-3">
                    
                        <div v-if="body" class="col-12">
                            <div class="row row-cols-1 g-3">
                                <slot name="body" />
                            </div>
                        </div>
                        
                        <div v-if="!body" class="col-12 col-lg-6">
                            <div class="row row-cols-1 g-3">
                                <slot name="col-1" />
                            </div>
                        </div>
                        
                        <div v-if="!body" class="col-12 col-lg-6">
                            <div class="row row-cols-1 g-3">
                                <slot name="col-2" />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: [ 'id', 'name', 'icon', 'body' ],
    computed: {
    
        ...mapState([ 'collapsed' ]),
        
        initCollapsed: function() { return this.collapsed.includes(this.id) },
    },
    methods: {
    
        ...mapActions([ 'toggleCollapsed' ]),
    },
}
</script>