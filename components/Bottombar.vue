<script setup>
    
    import LZString from 'lz-string'
    
    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { sidebarOpen, paused } = storeToRefs(store)
    
    const { setSidebarOpen, pause, resume } = store

    const toggleSidebar = function() {
    
        if (sidebarOpen.value == true) setSidebarOpen(false)
        else setSidebarOpen(true)
    }

    const save = function() {
    
        let savedData = store.getSavedData

        let text = JSON.stringify(savedData)
        let compressed = LZString.compressToBase64(text)
        localStorage.setItem('ngsc', compressed)
        
        store.showToast('toastManualSave')
    }

</script>

<template>
    <div id="bottombar" class="row row-cols-1 g-0 align-items-center" @mousewheel.prevent>
        <div class="p-2">
            <div class="row gx-2 align-items-center flex-nowrap">
                
                <div class="col">
                    <button class="d-sm-none btn btn-primary" @click="toggleSidebar();">
                        <font-awesome-icon icon="fa-fw fa-bars" fixed-width />
                    </button>
                </div>
                
                <div class="col-auto">
                    <button v-if="paused" class="btn btn-danger" @click="resume();">
                        <font-awesome-icon icon="fa-fw fa-play" fixed-width />
                        <span class="d-none d-sm-inline ms-2">{{ $t('resume') }}</span>
                    </button>
                    <button v-else class="btn btn-primary" @click="pause();">
                        <font-awesome-icon icon="fa-fw fa-pause" fixed-width />
                        <span class="d-none d-sm-inline ms-2">{{ $t('pause') }}</span>
                    </button>
                </div>
                
                <div class="col-auto">
                    <button class="btn btn-primary" @click="save();">
                        <font-awesome-icon icon="fa-fw fa-save" fixed-width />
                        <span class="d-none d-sm-inline ms-2">{{ $t('manual-save') }}</span>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style>
    #bottombar {
        position: fixed; bottom: 0; right: 0; left: 0; height: 54px; z-index: 1000;
        background-color: #232a35;
        border-top: 1px solid #484f5c;
    }
</style>
