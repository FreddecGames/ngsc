<script setup>

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const { scienceBoostCount } = storeToRefs(store) 

    const { setScienceBoostCount } = store

</script>

<template>
    <div class="col-auto">
        <div class="row g-2 align-items-center">
            <div class="col-auto">
                <input type="radio" class="btn-check" id="boost-count-1" autocomplete="off" value="1" v-model="scienceBoostCount" @click="setScienceBoostCount(1)" />
                <label class="btn btn-badge" for="boost-count-1">+1</label>
            </div>
            <div class="col-auto">
                <input type="radio" class="btn-check" id="boost-count-10" autocomplete="off" value="10" v-model="scienceBoostCount" @click="setScienceBoostCount(10)" />
                <label class="btn btn-badge" for="boost-count-10">+10</label>
            </div>
            <div class="col-auto">
                <input type="radio" class="btn-check" id="boost-count-100" autocomplete="off" value="100" v-model="scienceBoostCount" @click="setScienceBoostCount(100)" />
                <label class="btn btn-badge" for="boost-count-100">+100</label>
            </div>
        </div>
    </div>
</template>
