<template>
    <div id="topbar" class="row row-cols-1 g-0 align-items-center">
        <div class="py-1 px-2">
            <div class="row gx-3 align-items-center">
                
                <div class="col">
                    <div class="row gx-2 align-items-center">
                        
                        <div class="col-auto position-relative">
                            <img src="../assets/whiteLogo.png" alt="Logo" width="32" height="32" class="align-bottom" />
                        </div>
                        
                        <div class="col text-truncate">
                            <span class="h5 text-light mb-0">{{ companyName }}</span>
                        </div>
                    
                    </div>
                </div>
                
                <!-- div class="col-auto mt-1 mt-lg-0">
                    <button id="dropdownLanguage" class="btn" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Language">
                        
                        <span v-if="locale == 'en'">
                            <span class="flag-icon flag-icon-gb rounded" />
                            <span class="ms-2 d-none d-lg-inline">English</span>
                        </span>
                        
                        <span v-if="locale == 'fr'">
                            <span class="flag-icon flag-icon-fr rounded" />
                            <span class="ms-2 d-none d-lg-inline">Français</span>
                        </span>
                        
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownLanguage">
                        
                        <li>
                            <button class="dropdown-item" @click="changeLocale('en')">
                                <span class="flag-icon flag-icon-gb rounded me-2"></span>
                                English
                            </button>
                        </li>
                        
                        <li>
                            <button class="dropdown-item" @click="changeLocale('fr')">
                                <span class="flag-icon flag-icon-fr rounded me-2"></span>
                                Français
                            </button>
                        </li>
                        
                    </ul>
                </div -->
                
                <div class="d-none d-lg-block col-auto">
                    <a class="btn" href="https://discord.gg/3UkgeeT9CV" target="_blank">
                        <img src="../assets/icons/discord.png" width="16" height="16" alt="Discord" />
                        <span class="ms-2 d-none d-lg-inline">Discord</span>
                    </a>
                </div>
                
                <div v-for="item in menuItems" :key="item.id" class="d-none d-lg-block col-auto">
                    <button type="button" class="btn" @click="setActivePane(item.paneId);">
                        <img :src="require(`@/assets/icons/${item.icon}`).default" width="16" height="16" :alt="item.name" />
                        <span class="ms-2 d-none d-lg-inline">{{ $t(item.name) }}</span>
                    </button>
                </div>
                
                <div class="d-lg-none col-auto mt-1">
                
                    <button id="dropdownMenu" class="btn" data-bs-toggle="dropdown" data-bs-auto-close="inside" aria-expanded="false" aria-label="Menu">
                        <i class="fas fa-fw fa-ellipsis-v"></i>
                    </button>
                    
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenu">
                        
                        <li>
                            <a class="dropdown-item" href="https://discord.gg/3UkgeeT9CV" target="_blank">
                                <img class="me-2" src="../assets/icons/discord.png" width="16" height="16" alt="Discord" />
                                <span>Discord</span>
                            </a>
                        </li>
                        
                        <li v-for="item in menuItems" :key="item.id">
                            <button type="button" class="dropdown-item" @click="setSidebarOpen(false); setActivePane(item.paneId);">
                                <img class="me-2" :src="require(`@/assets/icons/${item.icon}`).default" width="16" height="16" :alt="item.name" />
                                <span>{{ $t(item.name) }}</span>
                            </button>
                        </li>
                        
                    </ul>
                    
                </div>
                
            </div>
        </div>
    </div>
</template>

<style>
    #topbar {
        position: fixed; top: 0; right: 0; left: 0; height: 50px; z-index: 1000;
        background-color: #484f5c;
    }
</style>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            
            menuItems:[
                { paneId:'donatingPane', name:'menu-item-donating', icon:'donating.png' },
                { paneId:'statsPane', name:'menu-item-stats', icon:'stats.png' },
                { paneId:'optionsPane', name:'menu-item-options', icon:'options.png' },
                { paneId:'aboutPane', name:'menu-item-about', icon:'about.png' },
            ],
        }
    },
    computed: {
    
        ...mapState([ 'locale', 'companyName' ]),
    },
    methods: {
    
        ...mapActions([ 'setLocale', 'setSidebarOpen', 'setActivePane' ]),
        
        changeLocale(lang) {
        
            if (this.$i18n.locale !== lang) {
                this.setLocale(lang)
                this.$i18n.locale = lang
            }
        },
    },
}
</script>