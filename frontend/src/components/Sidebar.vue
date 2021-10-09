<template>
    <div id="sidebar" :class="{ 'open':sidebarOpen }">
    
        <ul id="sidebar-tabs" class="nav nav-tabs" role="tablist">
            <sidebar-tab name="sidebar-tab-missions" icon="bullseye" paneId="missionsPane" />
            <sidebar-tab name="sidebar-tab-resources" icon="boxes" paneId="resourcesPane" :notifIds="[ 'energyPane', 'plasmaPane', 'meteoritePane', 'carbonPane', 'sciencePane', 'oilPane', 'fuelPane', 'metalPane', 'gemPane', 'woodPane', 'siliconPane', 'uraniumPane', 'lavaPane', 'lunaritePane', 'methanePane', 'titaniumPane', 'goldPane', 'silverPane', 'hydrogenPane', 'heliumPane', 'icePane', 'antimatterPane' ]" />
            <sidebar-tab v-if="!interstellarUnlocked" name="sidebar-tab-company" icon="tachometer-alt" paneId="empirePane" :notifIds="[ 'emcPane' ]">
                <template v-slot:extra>
                    <i v-if="hasConsumptionIssue" class="fas fa-fw fa-exclamation-triangle text-danger small ms-1"></i>
                </template>
            </sidebar-tab>
            <sidebar-tab v-if="interstellarUnlocked" name="sidebar-tab-stars" icon="crown" paneId="empirePane" :notifIds="[ 'radarPane', 'shipsPane', 'carnelianPane', 'prasnianPane', 'hyacinitePane', 'kitrinosPane', 'movitonPane' ]">
                <template v-slot:extra>
                    <i v-if="hasConsumptionIssue" class="fas fa-fw fa-exclamation-triangle text-danger small ms-1"></i>
                </template>
            </sidebar-tab>
            <sidebar-tab v-if="dysonUnlocked" name="sidebar-tab-prestige" icon="hat-wizard" paneId="prestigePane" :notifIds="[ 'dysonPane', 'darkmatterPane', 'dmUpgradesPane', 'dmBoostsPane', 'ultritePane', 'ulUpgradesPane', 'titansPane' ]" />
        </ul>
        
        <div class="h-100 tab-content">
        
            <sidebar-pane id="missionsPane">
            
                <sidebar-block>
                    <sidebar-header name="sidebar-header-roadmap" />
                    <sidebar-menu>
                        <sidebar-item-mission name="sidebar-item-earth" icon="earth.png" paneId="earthPane" :missions="['missionFirst', 'missionStorage', 'missionSolarPanel', 'missionEnergy', 'missionOil', 'missionTier2', 'missionDestruction', 'missionFuel']" />
                        <sidebar-item-mission name="sidebar-item-rocket" icon="rocket.png" paneId="rocketPane" :missions="['missionRocket1', 'missionRocket2']" />
                        <sidebar-item-mission name="sidebar-item-innerSolarSystem" icon="innerSolarSystem.png" paneId="innerSolarSystemPane" :missions="['missionMoon', 'missionMercury', 'missionVenus', 'missionMars', 'missionAsteroid', 'missionWonderStation']" />
                        <sidebar-item-mission name="sidebar-item-outerSolarSystem" icon="outerSolarSystem.png" paneId="outerSolarSystemPane" :missions="['missionJupiter', 'missionSaturn', 'missionUranus', 'missionNeptune', 'missionPluto', 'missionKuiper', 'missionSolCenter']" />
                        <sidebar-item-mission name="sidebar-item-alienTechnologies" icon="alien.png" paneId="alienTechnologiesPane" :missions="['missionPlasma', 'missionEmc', 'missionMeteorite', 'missionDyson']" />
                        <sidebar-item-mission name="sidebar-item-wonderStation1" icon="wonderStation.png" paneId="wonderStation1Pane" :missions="['missionWonderStation2', 'missionWonderPrecious', 'missionWonderEnergetic', 'missionWonderTechnological', 'missionWonderMeteorite']" />
                        <sidebar-item-mission name="sidebar-item-rebirth" icon="rebirth.png" paneId="rebirthPane" :missions="['missionRebirth', 'missionRebirth2']" />
                        <sidebar-item-mission name="sidebar-item-wonderStation2" icon="wonderStation.png" paneId="wonderStation2Pane" :missions="['missionWonderComm', 'missionWonderAntimatter', 'missionWonderPortal', 'missionWonderStargate']" />
                        <sidebar-item-mission name="sidebar-item-spaceship" icon="spaceship.png" paneId="spaceshipPane" :missions="['missionSpaceship', 'missionShield', 'missionEngine', 'missionAero']" />
                        <sidebar-item-mission name="sidebar-item-enlightenment" icon="enlightenment.png" paneId="enlightenmentPane" :missions="['missionEnlighten']" />
                        <sidebar-item-mission name="sidebar-item-overlord" icon="overlord.png" paneId="overlordPane" :missions="['missionOverlord']" />
                    </sidebar-menu>
                </sidebar-block>
                
            </sidebar-pane>
            
            <sidebar-pane id="resourcesPane">
            
                <sidebar-block data-simplebar>
                
                    <sidebar-header name="sidebar-header-fabricated" :unlockerIds="[ 'energy', 'plasma', 'meteorite', 'carbon' ]" />
                    <sidebar-menu :unlockerIds="[ 'energy', 'plasma', 'meteorite', 'carbon' ]">
                        <sidebar-item-resource name="energy" icon="energy.png" paneId="energyPane" itemId="energy" />
                        <sidebar-item-resource name="plasma" icon="plasma.png" paneId="plasmaPane" itemId="plasma" />
                        <sidebar-item-resource name="meteorite" icon="meteorite.png" paneId="meteoritePane" itemId="meteorite" />
                        <sidebar-item-resource name="carbon" icon="carbon.png" paneId="carbonPane" itemId="carbon" />
                        <sidebar-item-resource name="fuel" icon="fuel.png" paneId="fuelPane" itemId="fuel" />
                        <sidebar-item-resource name="antimatter" icon="antimatter.png" paneId="antimatterPane" itemId="antimatter" />
                    </sidebar-menu>
                    
                    <sidebar-header name="sidebar-header-earth" />
                    <sidebar-menu>
                        <sidebar-item-resource name="science" icon="science.png" paneId="sciencePane" itemId="science" />
                        <sidebar-item-resource name="oil" icon="oil.png" paneId="oilPane" itemId="oil" />
                        <sidebar-item-resource name="metal" icon="metal.png" paneId="metalPane" itemId="metal" />
                        <sidebar-item-resource name="gem" icon="gem.png" paneId="gemPane" itemId="gem" />
                        <sidebar-item-resource name="wood" icon="wood.png" paneId="woodPane" itemId="wood" />
                        <sidebar-item-resource name="silicon" icon="silicon.png" paneId="siliconPane" itemId="silicon" />
                        <sidebar-item-resource name="uranium" icon="uranium.png" paneId="uraniumPane" itemId="uranium" />
                        <sidebar-item-resource name="lava" icon="lava.png" paneId="lavaPane" itemId="lava" />
                    </sidebar-menu>
                    
                    <sidebar-header name="sidebar-header-innerPlanetary" :unlockerIds="[ 'lunarite', 'methane', 'titanium', 'gold', 'silver' ]" />
                    <sidebar-menu :unlockerIds="[ 'lunarite', 'methane', 'titanium', 'gold', 'silver' ]">
                        <sidebar-item-resource name="lunarite" icon="lunarite.png" paneId="lunaritePane" itemId="lunarite" />
                        <sidebar-item-resource name="methane" icon="methane.png" paneId="methanePane" itemId="methane" />
                        <sidebar-item-resource name="titanium" icon="titanium.png" paneId="titaniumPane" itemId="titanium" />
                        <sidebar-item-resource name="gold" icon="gold.png" paneId="goldPane" itemId="gold" />
                        <sidebar-item-resource name="silver" icon="silver.png" paneId="silverPane" itemId="silver" />
                    </sidebar-menu>
                    
                    <sidebar-header name="sidebar-header-outerPlanetary" :unlockerIds="[ 'hydrogen', 'helium', 'ice', 'antimatter' ]" />
                    <sidebar-menu :unlockerIds="[ 'hydrogen', 'helium', 'ice', 'antimatter' ]">
                        <sidebar-item-resource name="hydrogen" icon="hydrogen.png" paneId="hydrogenPane" itemId="hydrogen" />
                        <sidebar-item-resource name="helium" icon="helium.png" paneId="heliumPane" itemId="helium" />
                        <sidebar-item-resource name="ice" icon="ice.png" paneId="icePane" itemId="ice" />
                    </sidebar-menu>
                    
                </sidebar-block>
                
            </sidebar-pane>
            
            <sidebar-pane id="empirePane">
            
                <sidebar-block>
                    <sidebar-header name="sidebar-header-dashboards" />
                    <sidebar-menu>
                        <sidebar-item name="sidebar-item-consumption" icon="production.png" paneId="productionPane">
                            <template v-slot:extra>
                                <div v-if="hasConsumptionIssue" class="col-auto text-end small">
                                    <i class="fas fa-fw fa-exclamation-triangle text-danger"></i>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-achievements" icon="achievements.png" paneId="achievementsPane">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ getAchievementCount }}</span>
                                    <small class="text-normal ms-1">/{{ getAchievementMax }}</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item v-if="emcUnlocked" name="sidebar-item-emc" icon="emc.png" paneId="emcPane" />
                    </sidebar-menu>
                </sidebar-block>
                
                <sidebar-block :unlockerIds="[ 'radarT1', 'shipT1' ]">
                    <sidebar-header name="sidebar-header-interstellar" />
                    <sidebar-menu>
                    
                        <sidebar-item name="sidebar-item-radar" icon="radar.png" paneId="radarPane" :unlockerIds="[ 'radarT1' ]">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ getRadarRange }}</span>
                                    <small class="text-normal ms-1">LY</small>
                                </div>
                            </template>
                        </sidebar-item>
                        
                        <sidebar-item name="sidebar-item-ships" icon="ships.png" paneId="shipsPane" :unlockerIds="[ 'shipT1' ]">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light"><format-number :value="getFleetStats.power" /></span>
                                    <small class="text-normal ms-1">P</small>
                                </div>
                                <div class="col-auto text-end small">
                                    <span class="text-light"><format-number :value="getFleetStats.defense" /></span>
                                    <small class="text-normal ms-1">D</small>
                                </div>
                                <div class="col-auto text-end small">
                                    <span class="text-light"><format-number :value="getFleetStats.speed" /></span>
                                    <small class="text-normal ms-1">S</small>
                                </div>
                            </template>
                        </sidebar-item>
                        
                        <sidebar-item-faction name="sidebar-item-carnelian" icon="carnelian.png" paneId="carnelianPane" faction="carnelian" />
                        <sidebar-item-faction name="sidebar-item-prasnian" icon="prasnian.png" paneId="prasnianPane" faction="prasnian" />
                        <sidebar-item-faction name="sidebar-item-hyacinite" icon="hyacinite.png" paneId="hyacinitePane" faction="hyacinite" />
                        <sidebar-item-faction name="sidebar-item-kitrinos" icon="kitrinos.png" paneId="kitrinosPane" faction="kitrinos" />
                        <sidebar-item-faction name="sidebar-item-moviton" icon="moviton.png" paneId="movitonPane" faction="moviton" />
                        
                    </sidebar-menu>
                </sidebar-block>
                
            </sidebar-pane>
            
            <sidebar-pane id="prestigePane">
            
                <sidebar-block>
                    <sidebar-header name="sidebar-header-rebirth" />
                    <sidebar-menu>
                        <sidebar-item name="sidebar-item-dyson" icon="dyson.png" paneId="dysonPane">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ segments }}</span>
                                    <small class="text-normal ms-1">Sg</small>
                                </div>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ rings }}</span>
                                    <small class="text-normal ms-1">Rg</small>
                                </div>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ swarms }}</span>
                                    <small class="text-normal ms-1">Sw</small>
                                </div>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ spheres }}</span>
                                    <small class="text-normal ms-1">Sp</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-darkMatter" icon="darkmatter.png" paneId="darkmatterPane" :unlockerIds="[ 'darkmatter' ]">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ darkmatter }}</span>
                                    <small class="text-normal ms-1">({{ getDMPotential }})</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-dmUpgrades" icon="upgrades.png" paneId="dmUpgradesPane" :unlockerIds="[ 'darkmatter' ]">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ getDMUpgradesCount }}</span>
                                    <small class="text-normal ms-1">/{{ getDMUpgradesMax }}</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-dmBoosts" icon="boosts.png" paneId="dmBoostsPane" :unlockerIds="[ 'darkmatter' ]" />
                    </sidebar-menu>
                </sidebar-block>
                
                <sidebar-block :unlockerIds="[ 'ultrite' ]">
                    <sidebar-header name="sidebar-header-enlightenment" />
                    <sidebar-menu>
                        <sidebar-item name="sidebar-item-ultrite" icon="ultrite.png" paneId="ultritePane">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ ultrite }}</span>
                                    <small class="text-normal ms-1">({{ getULPotential }})</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-ulUpgrades" icon="upgrades.png" paneId="ulUpgradesPane">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ getULUpgradesCount }}</span>
                                    <small class="text-normal ms-1">/{{ getULUpgradesMax }}</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-titans" icon="titans.png" paneId="titansPane">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ getTitanCount }}</span>
                                    <small class="text-normal ms-1">/{{ getTitanMax }}</small>
                                </div>
                            </template>
                        </sidebar-item>
                    </sidebar-menu>
                </sidebar-block>
                
            </sidebar-pane>
            
        </div>
        
    </div>
</template>

<style>
    #sidebar {
        position: fixed; top: 50px; bottom: 0; left: 0; z-index: 10;
        width: 100%;
        background-color: #232a35;
        transform: translateX(-100%) translateY(0) translateZ(0);
        transition: transform .28s ease-out;
    }
    @media (max-width: 767.98px) { #sidebar.open { transform: translateX(0) translateY(0) translateZ(0); } }
    @media (min-width: 768px) { #sidebar { width: 320px; transform: translateX(0) translateY(0) translateZ(0); } }
</style>

<script>
import FormatNumber from './FormatNumber.vue'

import SidebarBlock from './SidebarBlock.vue'
import SidebarHeader from './SidebarHeader.vue'
import SidebarItem from './SidebarItem.vue'
import SidebarItemMission from './SidebarItemMission.vue'
import SidebarItemResource from './SidebarItemResource.vue'
import SidebarItemFaction from './SidebarItemFaction.vue'
import SidebarMenu from './SidebarMenu.vue'
import SidebarPane from './SidebarPane.vue'
import SidebarTab from './SidebarTab.vue'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    components: {
        
        'format-number': FormatNumber,
        
        'sidebar-block': SidebarBlock,
        'sidebar-header': SidebarHeader,
        'sidebar-item': SidebarItem,
        'sidebar-item-mission': SidebarItemMission,
        'sidebar-item-resource': SidebarItemResource,
        'sidebar-item-faction': SidebarItemFaction,
        'sidebar-menu': SidebarMenu,
        'sidebar-pane': SidebarPane,
        'sidebar-tab': SidebarTab,
    },
    computed: {
    
        ...mapState([ 'sidebarOpen', 'activeTab', 'activePane' ]),
        
        ...mapGetters([ 'isPinned', 'isUnlocked', 'getAchievementMax', 'getAchievementCount', 'getRadarRange', 'getFleetStats', 'getItemCount', 'getDMPotential', 'getDMUpgradesCount', 'getDMUpgradesMax', 'getULPotential', 'getULUpgradesMax', 'getULUpgradesCount', 'getTitanMax', 'getTitanCount', 'hasConsumptionIssue' ]),
        
        emcUnlocked: function() { return this.getItemCount('missionEmc') >= 1 },
        dysonUnlocked: function() { return this.isUnlocked('segment') },
        interstellarUnlocked: function() { return this.isUnlocked('radarT1') || this.isUnlocked('shipT1') },
        
        segments: function() { return this.getItemCount('segment') },
        rings: function() { return this.getItemCount('dysonT1') },
        swarms: function() { return this.getItemCount('dysonT2') },
        spheres: function() { return this.getItemCount('dysonT3') },
        
        ultrite: function() { return this.getItemCount('ultrite') },
        darkmatter: function() { return this.getItemCount('darkmatter') },
    },
    methods: {
    
        ...mapActions([ 'setActiveTab' ]),
    },
}
</script>