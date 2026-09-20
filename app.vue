<template>

    <screen-loading v-if="(isMobile == false || app == 'android') && error == false && gameLoaded == false && page == null" />
    <screen-mobile v-if="isMobile == true && app != 'android' && error == false && page == null" />
    <screen-game v-if="(isMobile == false || app == 'android') && error == false && gameLoaded == true && page == null" />
    
    <screen-error v-if="error == true && page == null" />
    <screen-privacy v-if="page == 'privacy'" />
    
    <div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-2">
        <toast-export />
        <toast-manual-save />
        <toast-import-empty />
        <toast-import-corrupted />
    </div>
    
    <modal-offline />
    
</template>

<script>
//---
import LZString from 'lz-string'
//---
import { useGameStore } from '~/store/game.js'
//---
export default {
    //---
    data() {
        return {
            //---            
            app: null,
            error: false,
            isMobile: false,
            gameLoaded: false,
            page: null,
        }
    },
    //---
    created() {
        //---
        let uri = window.location.search.substring(1)
        let params = new URLSearchParams(uri)
        this.app = params.get('app')
        this.page = params.get('page')
        //---
        let txt = navigator.userAgent || navigator.vendor || window.opera
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(txt)) {
            this.isMobile = true
        }
        //---
        if ((this.isMobile == true && this.app == 'android') || this.isMobile == false || this.page == null) {
            //---
            const self = this
            setTimeout(() => {
                //---
                const store = useGameStore()
                //---
				store.isMobile = (this.isMobile == true && this.app == 'android')
                //---
                try {
                    //---
                    store.init()
                    //---
                    let loadedData = localStorage.getItem('ngsc')
                    if (loadedData && loadedData !== null && loadedData.length % 4 == 0) {
                        //---
                        let text = LZString.decompressFromBase64(loadedData)
                        if (!text) return console.warn('Load failed')
                        loadedData = JSON.parse(text)
                        //---
                        if (loadedData.version || loadedData.versionNumber) return console.warn('Save data incompatible')
                        else self.loadData(loadedData)
                        //---
                        self.$i18n.locale = store.locale
                    }
                    //---
                    store.refreshProd()
                    //---
                    self.mainLoop()
                    self.autoSaveInterval = setInterval(() => { self.autoSave() }, 30000)
                    //---
                    window.onbeforeunload = function() { self.beforeUnmount() }
                    //---
                    self.gameLoaded = true
                }
                catch (error) {
                    //---
                    self.error = true
                    console.error(error)
                }
            }, 2000)
        }
    },
    //---
    methods: {
        //---
        loadData(data) {
            //---
            const store = useGameStore()
            //---
            store.locale = data.locale || 'en'
            store.paused = data.paused != null ? data.paused : false
            store.companyName = data.companyName || 'NG Space Company'
            //---
            store.activeTab = data.activeTab || 'missionsPane'
            store.activePane = data.activePane || 'earthPane'
            //---
            if (data.sidebarOpen) store.sidebarOpen = data.sidebarOpen
            //---
            let currentTime = new Date().getTime()
            //---
            store.lastFrameTimeMs = data.lastFrameTimeMs || currentTime
            store.lastConversionTimeMs = data.lastConversionTimeMs || currentTime
            store.lastUpgradeTimeMs = data.lastUpgradeTimeMs || currentTime
            //---
            if (data.autoConversionId) store.autoConversionId = data.autoConversionId
            if (data.autoStorageId) store.autoStorageIds.push(data.autoStorageId)
            if (data.autoStorageIds) store.autoStorageIds = data.autoStorageIds
            //---
            store.collapsed = data.collapsed || []
            store.notified = data.notified || []
            //---
            store.statsStartDate = data.statsStartDate || currentTime
            store.statsLastRebirth = data.statsLastRebirth || currentTime
            store.statsLastEnlighten = data.statsLastEnlighten || currentTime
            store.statsTotalRebirths = data.statsTotalRebirths || 0
            store.statsTotalEnlightens = data.statsTotalEnlightens || 0
            store.statsTotalConquests = data.statsTotalConquests || 0
            store.statsTotalStatues = data.statsTotalStatues || 0
            //---
            if (data.items) {
                data.items.forEach(item => {
                    //---
                    if (store.items[item.id]) {                    
                        if ('count' in item) store.items[item.id].count = item.count
                        if ('unlocked' in item) store.items[item.id].unlocked = item.unlocked
                        if ('upgrade' in item) store.items[item.id].upgrade = item.upgrade
                        if ('status' in item) store.items[item.id].status = item.status
                        if ('progress' in item) store.items[item.id].progress = item.progress
                        if ('toggle' in item) store.items[item.id].toggle = item.toggle                        
                        if ('auto' in item) store.items[item.id].auto = item.auto                        
                    }
                    //---
                    if (store.items[item.id].max == 1 && store.items[item.id].count == 1) store.items[item.id].unlocked = true
                })
            }
            //---
            store.onLoad()
        },
        //---
        mainLoop() {
            //---
            this.rafHandle = requestAnimationFrame(this.mainLoop)
            //---
            const store = useGameStore()
            //---
            if (store.paused) return
            //---
            let currentTimeMs = new Date().getTime()
            //---
            let prodDelay = currentTimeMs - store.lastFrameTimeMs            
            if (prodDelay <= 0) {
                //---
                store.lastFrameTimeMs = currentTimeMs
                return 
            }            
            //---
            let stepDuration = 1000 / 60
            if (prodDelay < stepDuration) return
            //---
            prodDelay /= 1000
            store.lastFrameTimeMs = currentTimeMs
            //---
            let temp = {}
            store.resources.forEach(resource => { temp[resource.id] = { rawProd:0, rawConsu:0, count:resource.count } })
            //---
            if (prodDelay > 15 * 60 && !store.offlineModal) {
                //---
                store.offlineGains = {
                    //---
                    time: prodDelay,
                    //---
                    before: {},
                    after: {},
                }
                //---
                store.resources.forEach(resource => { store.offlineGains.before[resource.id] = resource.count })
            }

            //--- Resource production
            //---
            store.resources.forEach(resource => {
                //---
                temp[resource.id].count += resource.prod * prodDelay
                if (temp[resource.id].count < 0) temp[resource.id].count = 0
            })
            
            //--- Automatic conversion
            //---
            let convertDelay = currentTimeMs - store.lastConversionTimeMs
            if (convertDelay > 1000 && store.autoConversionId) {
                //---
                convertDelay /= 1000
                store.lastConversionTimeMs = currentTimeMs
                //---
                for (let i = 0; i < Math.floor(convertDelay); i++) {
                    //---
                    let count = store.getConversionMaxCount(store.autoConversionId)
                    //---
                    let can = true
                    //---
                    let cost = store.getConversionCost(store.autoConversionId, count)
                    if (temp[cost.id].count - cost.count < 0) can = false
                    //---
                    if (can && count > 0) {
                        temp[store.autoConversionId].count += count
                        temp[cost.id].count -= cost.count
                    }
                    else break
                }
            }
            
            //--- Automatic storage
            //---
            let storageDelay = currentTimeMs - store.lastUpgradeTimeMs
            if (storageDelay > 1000 && store.autoStorageIds.length > 0) {
                
                storageDelay /= 1000
                store.lastUpgradeTimeMs = currentTimeMs
                
                store.autoStorageIds.forEach(autoStorageId => {
                    let item = store.items[autoStorageId]
                    for (let i = 0; i < Math.floor(storageDelay); i++) {
                        
                        let can = true
                        
                        if (item.upgrade >= item.storage.max) return
                        
                        let costs = store.getUpgradeCosts(autoStorageId)
                        costs.forEach(cost => {
                            if (temp[cost.id].count - cost.count < 0) {
                                can = false
                                return
                            }
                        })
                        
                        if (can) {
                            
                            item.upgrade += 1                            
                            costs.forEach(cost => { temp[cost.id].count -= cost.count })
                        }
                        else return
                    }
                })
            }
            
            //--- Resource storage limitation
            //---
            store.resources.forEach(resource => {                
                if ('storage' in resource) temp[resource.id].count = Math.min(temp[resource.id].count, store.getItemStorage(resource.id))
                if (temp[resource.id].count != resource.count) resource.count = temp[resource.id].count
            })
            
            //--- Automatic dyson parts
            //---
            let dysonDelay = currentTimeMs - store.lastAutoDysonTimeMs
            if (dysonDelay > 1000 && store.getItemCount('ulUpgdAutoDyson') > 0) {
                
                dysonDelay /= 1000
                store.lastAutoDysonTimeMs = currentTimeMs
                
                let dysonT1 = store.getItem('dysonT1')
                let dysonT2 = store.getItem('dysonT2')
                
                for (let i = 0; i < Math.floor(dysonDelay); i++) {
                                        
                    if (dysonT1.auto == true) store.buildDysonPart({ id:'dysonT1', count:50 })
                    else if (dysonT2.auto == true) store.buildDysonPart({ id:'dysonT2', count:100 })
                }
            }
            
            //--- Achievement refresh
            //---
            store.achIds.forEach(id => {
                
                let item = store.items[id]
                if (item.unlocked && item.count < item.brackets.length) {
                
                    let limit = item.brackets[item.count]
                    let progress = 100 * store.items[item.data].count / limit
                    
                    if (progress >= 100) {
                        item.count += 1
                        progress -= 100
                    }
                    
                    if (progress != item.progress) item.progress = progress
                }
            })

            //--- Offline gains modal
            //---
            if (prodDelay > 15 * 60 && !store.offlineModal) {
                //---
                store.resources.forEach(resource => { store.offlineGains.after[resource.id] = resource.count })
                //---
                store.offlineModal = true
                store.showModal('modalOffline')
            }
        },
        //---
        autoSave() {
            //---
            const store = useGameStore()
            //---
            let savedData = store.getSavedData
            //---
            let text = JSON.stringify(savedData)
            let compressed = LZString.compressToBase64(text)
            localStorage.setItem('ngsc', compressed)
        },
        //---
        beforeUnmount() {
            //---
            const store = useGameStore()
            //---
            if (!store.resetInProgress) this.autoSave()
            //---
            if (this.rafHandle) cancelAnimationFrame(this.rafHandle)
            if (this.autoSaveInterval) clearInterval(this.autoSaveInterval)
        },
    },
}
</script>
