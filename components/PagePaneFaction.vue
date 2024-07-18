<script setup>

    const props = defineProps([ 'id', 'name', 'icon', 'faction', 'descs1', 'descs2' ])

    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()

    const stars = computed(() => { return store.getStarCount(props.faction) })
    const conquered = computed(() => { return store.getConqueredStarCount(props.faction) })
    const statues = computed(() => { return store.getStatueStarCount(props.faction) })

</script>

<template>
    <page-pane :id="id" :name="name" :icon="icon">
        
        <template v-slot:titleBar>
        
            <div class="col-auto text-end">
                <div class="card">
                    <div class="card-body small text-end p-2 border-0">
                        <img class="me-2" src="/icons/conquest.png" width="14" height="14" :alt="$t('statue')" />
                        <span class="text-light">{{ conquered }}</span>
                        <small class="text-normal ms-1">/{{ stars }}</small>
                    </div>
                </div>
            </div>
            
            <div class="col-auto text-end">
                <div class="card">
                    <div class="card-body small text-end p-2 border-0">
                        <img class="me-2" src="/icons/statue.png" width="14" height="14" :alt="$t('statue')" />
                        <span class="text-light">{{ statues }}</span>
                        <small class="text-normal ms-1">/{{ stars }}</small>
                    </div>
                </div>
            </div>

        </template>
        
        <card id="carnelianDescCard" name="description">
            <template v-slot:col-1>
                <block-desc :descs="descs1" />
            </template>
            <template v-slot:col-2>
                <block-desc :descs="descs2" />
            </template>
        </card>
        
        <slot />
        
    </page-pane>
</template>
