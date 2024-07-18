<script setup>

    const props = defineProps([ 'id', 'name', 'icon' ])

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { activePane } = storeToRefs(store)

</script>

<template>
    <div v-if="activePane == id" class="tab-pane active" :id="id" role="tabpanel" :aria-labelledby="id + '-tab'">
        
        <div class="titleBar" @mousewheel.prevent>
            <div class="container p-2">
                <div class="row gx-2 align-items-center">
                
                    <div class="col-auto">
                        <img :src="icon" width="19" height="19" :alt="name" />
                    </div>
                    
                    <div class="col text-truncate">
                        <span class="fs-5 text-light" role="heading">{{ $t(name) }}</span>
                    </div>
                    
                    <slot name="titleBar" />
                    
                </div>
            </div>
        </div>
        
        <div class="content scrollbar" @mousewheel.stop>
            <div class="container px-2 pb-2">
                <div class="row row-cols-1 g-2">
                
                    <slot />
                    
                </div>
            </div>
        </div>
        
    </div>
</template>

<style>
    .titleBar {
        position: fixed; top: 54px; left: 0; z-index: 5;
        width: 100%;
    }
    @media (min-width: 768px) { .titleBar { padding-left: 320px; } }
    
    .content {
        position: fixed; top: 102px; bottom: 54px; left: 0; z-index: 5;
        width: 100%;
    }
    @media (min-width: 768px) { .content { padding-left: 320px; } }
    
    @media (min-width: 992px) { .container { max-width: 720px; } }
    @media (min-width: 1200px) { .container { max-width: 720px; } }
</style>
