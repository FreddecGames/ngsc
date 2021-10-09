<template>
    <div id="game">
        <topbar />
        <sidebar />
        <page />
    </div>
</template>

<style>
    #game {
        width: 100%; min-height: 100%;
    }
</style>

<script>
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'
import Topbar from './Topbar.vue'

export default {
    components: {
        
        'page': Page,
        'sidebar': Sidebar,
        'topbar': Topbar,
    },
}
</script>