<template>
    <div v-if="unlocked" class="col">
        <div class="row g-1 align-items-center">
        
            <div class="col-2">
                <span v-if="name" class="badge text-uppercase w-100 text-center">{{ $t(name) }}</span>
                <span v-if="icon" class="badge w-100 text-center"><i class="fas fa-fw fa-boxes"></i></span>
            </div>
            
            <div v-for="(bracket, index) in ach.brackets" :key="bracket" class="col-2">
                <small class="text-uppercase">
                    <span v-if="ach.count > index" class="text-success"><format-number :value="bracket" /></span>
                    <span v-if="ach.count == index && ach.progress > 0" class="text-timer"><format-number :value="bracket" /></span>
                    <span v-if="ach.count == index && ach.progress <= 0" class="text-muted"><format-number :value="bracket" /></span>
                    <span v-if="ach.count < index && ach.progress <= 0" class="text-muted"><format-number :value="bracket" /></span>
                    <span v-if="ach.count < index && ach.progress > 0" class="text-muted"><format-number :value="bracket" /></span>
                </small>
                <div class="progress" style="height:1px">
                    <div v-if="ach.count > index" class="progress-bar bg-success" style="width:100%"></div>
                    <div v-if="ach.count == index" class="progress-bar bg-timer" :style="'width:' + ach.progress + '%'"></div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import FormatNumber from './FormatNumber.vue'

import { mapGetters } from 'vuex'

export default {
    props: [ 'name', 'icon', 'itemId' ],
    components: {
        
        'format-number': FormatNumber,
    },
    computed: {
    
        ...mapGetters([ 'isUnlocked', 'getItem' ]),
        
        ach: function() { return this.getItem(this.itemId) },
        unlocked: function() { return this.isUnlocked(this.itemId) },
    },
}
</script>