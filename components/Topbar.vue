<script setup>
            
    const menuItems = [
    
        { paneId:'statsPane', name:'menu-item-stats', icon:'/icons/stats.png' },
        { paneId:'optionsPane', name:'menu-item-options', icon:'/icons/options.png' },
        { paneId:'aboutPane', name:'menu-item-about', icon:'/icons/about.png' },
    ]

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { isMobile, activePane } = storeToRefs(store)
    
    const { setSidebarOpen, setActivePane } = store

</script>

<template>
    <div id="topbar" class="row row-cols-1 g-0 align-items-center" @mousewheel.prevent>
        <div class="p-2">
            <div class="row gx-0 align-items-center flex-nowrap">
                
                <div class="col text-truncate">
                    <div class="row gx-2 align-items-center">
                        
                        <div class="col-auto position-relative">
                            <img src="/whiteLogo.png" alt="Logo" width="32" height="32" class="align-bottom" />
                        </div>
                        
                        <div class="col text-truncate">
                            <span class="h5 text-light mb-0">{{ store.companyName }}</span>
                        </div>
                    
                    </div>
                </div>
                
                <div class="col-auto">
                    <a class="btn" href="https://discord.gg/3UkgeeT9CV" target="_blank">
                        <img src="/icons/discord.png" width="16" height="16" alt="Discord" />
                        <span class="ms-2 d-none d-lg-inline">Discord</span>
                    </a>
                </div>
                
                <div v-if="!isMobile" class="col-auto">
                    <button type="button" class="btn" :class="{ 'active':activePane == 'donatingPane' }" @click="setSidebarOpen(false); setActivePane('donatingPane');">
                        <img src="/icons/donating.png" width="16" height="16" :alt="menu-item-donating" />
                        <span class="ms-2 d-none d-lg-inline">{{ $t('menu-item-donating') }}</span>
                    </button>
                </div>
				
                <div v-for="item in menuItems" :key="item.id" class="col-auto">
                    <button type="button" class="btn" :class="{ 'active':activePane == item.paneId }" @click="setSidebarOpen(false); setActivePane(item.paneId);">
                        <img :src="item.icon" width="16" height="16" :alt="item.name" />
                        <span class="ms-2 d-none d-lg-inline">{{ $t(item.name) }}</span>
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style>
    #topbar {
        position: fixed; top: 0; right: 0; left: 0; height: 54px; z-index: 1000;
        background-color: #484f5c;
    }
</style>
