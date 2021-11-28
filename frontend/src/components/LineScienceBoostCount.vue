<template>
    <div class="col-auto">
        <div class="row g-2 align-items-center">
            <div class="col-auto">
                <input type="radio" class="btn-check" id="boost-count-1" autocomplete="off" value="1" v-model="selectedCount" @click="setScienceBoostCount(1)" />
                <label class="btn btn-badge px-1" for="boost-count-1">+1</label>
            </div>
            <div class="col-auto">
                <input type="radio" class="btn-check" id="boost-count-10" autocomplete="off" value="10" v-model="selectedCount" @click="setScienceBoostCount(10)" />
                <label class="btn btn-badge px-1" for="boost-count-10">+10</label>
            </div>
            <div class="col-auto">
                <input type="radio" class="btn-check" id="boost-count-100" autocomplete="off" value="100" v-model="selectedCount" @click="setScienceBoostCount(100)" />
                <label class="btn btn-badge px-1" for="boost-count-100">+100</label>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
        
            selectedCount: 1,
        }
    },
    computed: {
        
        ...mapState([ 'scienceBoostCount' ]),
    },
    methods: {
    
        ...mapActions([ 'setScienceBoostCount' ]),
    },
}
</script>