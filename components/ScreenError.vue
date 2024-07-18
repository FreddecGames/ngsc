<script setup>
            
    const confirmReset = ref(false)

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { getLocalData } = storeToRefs(store)
    
    const { exportSave, downloadSave } = store
    
    const reset = function() {
    
        store.resetInProgress = true

        localStorage.removeItem('ngsc')
        
        window.location.reload()
    }
    
</script>

<template>
    <div id="error">
		<div class="col-12">
            <div class="px-3 my-3">
                <div class="card">
                    <div class="card-body text-center border-0">
                        <div class="row g-3 justify-content-center">
                            <div class="col-12 text-center">
                                <img src="/whiteLogo.png" alt="Logo" width="64" height="64" class="d-inline-block align-text-top">
                                <h5 class="text-light">NG Space Company</h5>
                            </div>
                            <div class="col-12 text-center text-danger h6">{{ $t('errorText1') }}</div>
                            <div class="col-12 text-center small">{{ $t('errorText2') }}</div>
                            <div class="col-5 col-lg-3 text-center">
                                <a href="https://discord.gg/ZXrggavUpv" target="_blank" class="w-100 btn btn-primary justify-content-center">
                                    <img src="/icons/discord.png" width="16" height="16" alt="Discord" />
                                    <span class="ms-2">Discord</span>
                                </a>
                            </div>
                            <div class="col-12 text-center">
                                <textarea spellcheck="false" rows="3" class="form-control" disabled readonly>{{ getLocalData }}</textarea>
                            </div>
                            <div class="col-6 col-lg-4">
                                <button type="button" class="w-100 btn btn-primary justify-content-center" @click="exportSave()">
                                    {{ $t('button-export') }}
                                </button>
                            </div>
                            <div class="col-6 col-lg-4">
                                <button type="button" class="w-100 btn btn btn-primary justify-content-center" @click="downloadSave()">
                                    {{ $t('button-download') }}
                                </button>
                            </div>
                            <div class="col-12 text-center">
                                <span class="text-normal small">{{ $t('errorText3') }}</span>
                            </div>
                            <div class="col-5 col-lg-3">
                                <button v-if="!confirmReset" class="w-100 btn btn-danger justify-content-center" @click="confirmReset = true">
                                    {{ $t('button-reset') }}
                                </button>
                                <button v-if="confirmReset" class="w-100 btn btn-danger justify-content-center" @click="reset()">
                                    {{ $t('button-reset') }}
                                </button>
                            </div>
                            <div v-if="confirmReset" class="col-12 small">
                                <span class="text-danger">{{ $t('reset-confirm') }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
    </div>
</template>

<style>
    #error {
        width: 100%; height: 100%; padding: 1rem 0; max-width:512px;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
    }    
</style>
