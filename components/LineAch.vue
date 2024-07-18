<script setup>

    const props = defineProps([ 'name', 'icon', 'itemId' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const ach = computed(() => { return store.getItem(props.itemId) })
    const unlocked = computed(() => { return store.isUnlocked(props.itemId) })

</script>

<template>
    <div v-if="unlocked" class="col">
        <div class="lh-1 row g-2 align-items-center">
        
            <div class="col-2">
                <span v-if="name" class="badge p-2 text-uppercase w-100 text-center">{{ $t(name) }}</span>
                <span v-if="icon" class="badge p-2 w-100 text-center"><font-awesome-icon icon="fas fa-fw fa-boxes" /></span>
            </div>
            
            <div v-for="(bracket, index) in ach.brackets" :key="bracket" class="col-2">
                <small class="text-uppercase">
                    <small v-if="ach.count > index" class="text-success"><format-number :value="bracket" /></small>
                    <small v-if="ach.count == index && ach.progress > 0" class="text-timer"><format-number :value="bracket" /></small>
                    <small v-if="ach.count == index && ach.progress <= 0" class="text-muted"><format-number :value="bracket" /></small>
                    <small v-if="ach.count < index && ach.progress <= 0" class="text-muted"><format-number :value="bracket" /></small>
                    <small v-if="ach.count < index && ach.progress > 0" class="text-muted"><format-number :value="bracket" /></small>
                </small>
                <div class="progress" style="margin-top:2px; height:3px">
                    <div v-if="ach.count > index" class="progress-bar bg-success" style="width:100%"></div>
                    <div v-if="ach.count == index" class="progress-bar bg-timer" :style="'width:' + ach.progress + '%'"></div>
                </div>
            </div>
            
        </div>
    </div>
</template>
