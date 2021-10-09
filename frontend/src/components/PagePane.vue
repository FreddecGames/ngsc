<template>
    <div class="tab-pane" :class="{ 'active':activePane == id }" :id="id" role="tabpanel" :aria-labelledby="id + '-tab'">
        
        <div class="titleBar">
            <div class="container py-3 px-2">
                <div class="row gx-2 gy-1 align-items-center">
                
                    <div class="col-auto d-md-none">
                        <button @click="setSidebarOpen(true);">
                            <i class="h5 fas fa-fw fa-arrow-alt-circle-left"></i>
                        </button>
                    </div>
                    
                    <div class="col-auto d-flex align-items-center">
                        <img :src="require(`../assets/icons/${icon}`)" width="19" height="19" :alt="name" />
                    </div>
                    
                    <div class="col text-truncate">
                        <h5 class="text-light mb-0" role="heading">{{ $t(name) }}</h5>
                    </div>
                    
                    <slot name="titleBar" />
                    
                </div>
            </div>
        </div>
        
        <div class="content" data-simplebar>
            <div class="container px-2">
                <div class="row row-cols-1 gx-1 gy-3">
                
                    <slot />
                    
                </div>
            </div>
        </div>
        
    </div>
</template>

<style>
    .titleBar {
        position: fixed; top: 50px; left: 0; z-index: 5;
        width: 100%;
    }
    @media (min-width: 768px) { .titleBar { padding-left: 320px; } }
    
    .content {
        position: fixed; top: 106px; bottom: 32px; left: 0; z-index: 5;
        width: 100%;
    }
    @media (min-width: 768px) { .content { padding-left: 320px; } }
    
    @media (min-width: 992px) { .container { max-width: 720px; } }
    @media (min-width: 1200px) { .container { max-width: 720px; } }
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: [ 'id', 'name', 'icon' ],
    computed: {
    
        ...mapState([ 'activePane' ]),
    },
    methods: {
    
        ...mapActions([ 'setSidebarOpen' ]),
    },
}
</script>