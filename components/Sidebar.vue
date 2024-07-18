<script setup>

    import { storeToRefs } from 'pinia'
    import { useGameStore } from '~/store/game.js'
    
    const store = useGameStore()
    
    const { getTitanCount, getTitanMax, getULUpgradesMax, getULUpgradesCount, getULPotential, sidebarOpen, hasConsumptionIssue, getAchievementCount, getRadarRange, getAchievementMax, getDMPotential, getDMUpgradesCount, getDMUpgradesMax, getFleetStats } = storeToRefs(store)
    
    const emcUnlocked = computed(() => store.getItemCount('missionEmc') >= 1)    
    const dysonUnlocked = computed(() => store.isUnlocked('segment'))
    const scienceUnlocked = computed(() => store.isUnlocked('science'))
    const interstellarUnlocked = computed(() => store.isUnlocked('radarT1') || store.isUnlocked('shipT1'))
    
    const segments = computed(() => store.getItemCount('segment'))
    const rings = computed(() => store.getItemCount('dysonT1'))
    const swarms = computed(() => store.getItemCount('dysonT2'))
    const spheres = computed(() => store.getItemCount('dysonT3'))
    
    const ultrite = computed(() => store.getItemCount('ultrite'))
    const darkmatter = computed(() => store.getItemCount('darkmatter'))
    
</script>

<template>
    <div id="sidebar" :class="{ 'open':sidebarOpen }">
    
        <ul id="sidebar-tabs" class="nav nav-tabs" role="tablist" @mousewheel.prevent>
            <sidebar-tab name="sidebar-tab-missions" icon="bullseye" paneId="missionsPane" />
            <sidebar-tab name="sidebar-tab-resources" icon="boxes" paneId="resourcesPane" :notifIds="[ 'energyPane', 'plasmaPane', 'meteoritePane', 'carbonPane', 'sciencePane', 'oilPane', 'fuelPane', 'metalPane', 'gemPane', 'woodPane', 'siliconPane', 'uraniumPane', 'lavaPane', 'lunaritePane', 'methanePane', 'titaniumPane', 'goldPane', 'silverPane', 'hydrogenPane', 'heliumPane', 'icePane', 'antimatterPane' ]" />
            <sidebar-tab v-if="!interstellarUnlocked" name="sidebar-tab-company" icon="tachometer-alt" paneId="empirePane" :notifIds="[ 'technologiesPane', 'emcPane' ]">
                <template v-slot:extra>
                    <small v-if="hasConsumptionIssue" class="text-danger ms-1"><font-awesome-icon icon="fa-exclamation-triangle" /></small>
                </template>
            </sidebar-tab>
            <sidebar-tab v-if="interstellarUnlocked" name="sidebar-tab-stars" icon="crown" paneId="empirePane" :notifIds="[ 'radarPane', 'shipsPane', 'carnelianPane', 'prasnianPane', 'hyacinitePane', 'kitrinosPane', 'movitonPane' ]">
                <template v-slot:extra>
                    <small v-if="hasConsumptionIssue" class="text-danger ms-1"><font-awesome-icon icon="fa-exclamation-triangle" /></small>
                </template>
            </sidebar-tab>
            <sidebar-tab v-if="dysonUnlocked" name="sidebar-tab-prestige" icon="hat-wizard" paneId="prestigePane" :notifIds="[ 'dysonPane', 'darkmatterPane', 'dmUpgradesPane', 'dmBoostsPane', 'ultritePane', 'ulUpgradesPane', 'titansPane' ]" />
        </ul>
        
        <div class="tab-content scrollbar" style="height:calc(100% - 60px);" @mousewheel.stop>
        
            <sidebar-pane id="missionsPane">
            
                <sidebar-block>
                    <sidebar-header name="sidebar-header-roadmap" />
                    <sidebar-menu>
                        <sidebar-item-mission name="sidebar-item-earth" icon="\icons\earth.png" paneId="earthPane" :missions="['missionFirst', 'missionStorage', 'missionSolarPanel', 'missionEnergy', 'missionOil', 'missionTier2', 'missionDestruction', 'missionFuel']" />
                        <sidebar-item-mission name="sidebar-item-rocket" icon="\icons\rocket.png" paneId="rocketPane" :missions="['missionRocket1', 'missionRocket2']" />
                        <sidebar-item-mission name="sidebar-item-innerSolarSystem" icon="\icons\innerSolarSystem.png" paneId="innerSolarSystemPane" :missions="['missionMoon', 'missionMercury', 'missionVenus', 'missionMars', 'missionAsteroid', 'missionWonderStation']" />
                        <sidebar-item-mission name="sidebar-item-outerSolarSystem" icon="\icons\outerSolarSystem.png" paneId="outerSolarSystemPane" :missions="['missionJupiter', 'missionSaturn', 'missionUranus', 'missionNeptune', 'missionPluto', 'missionKuiper', 'missionSolCenter']" />
                        <sidebar-item-mission name="sidebar-item-alienTechnologies" icon="\icons\alien.png" paneId="alienTechnologiesPane" :missions="['missionPlasma', 'missionEmc', 'missionMeteorite', 'missionDyson']" />
                        <sidebar-item-mission name="sidebar-item-wonderStation1" icon="\icons\wonderStation.png" paneId="wonderStation1Pane" :missions="['missionWonderStation2', 'missionWonderPrecious', 'missionWonderEnergetic', 'missionWonderTechnological', 'missionWonderMeteorite']" />
                        <sidebar-item-mission name="sidebar-item-rebirth" icon="\icons\rebirth.png" paneId="rebirthPane" :missions="['missionRebirth', 'missionRebirth2']" />
                        <sidebar-item-mission name="sidebar-item-wonderStation2" icon="\icons\wonderStation.png" paneId="wonderStation2Pane" :missions="['missionWonderComm', 'missionWonderAntimatter', 'missionWonderPortal', 'missionWonderStargate']" />
                        <sidebar-item-mission name="sidebar-item-spaceship" icon="\icons\spaceship.png" paneId="spaceshipPane" :missions="['missionSpaceship', 'missionShield', 'missionEngine', 'missionAero']" />
                        <sidebar-item-mission name="sidebar-item-enlightenment" icon="\icons\enlightenment.png" paneId="enlightenmentPane" :missions="['missionEnlighten']" />
                        <sidebar-item-mission name="sidebar-item-overlord" icon="\icons\overlord.png" paneId="overlordPane" :missions="['missionOverlord']" />
                    </sidebar-menu>
                </sidebar-block>
                
            </sidebar-pane>
            
            <sidebar-pane id="resourcesPane">
            
                <sidebar-block>
                
                    <sidebar-header name="sidebar-header-fabricated" :unlockerIds="[ 'energy', 'plasma', 'meteorite', 'carbon' ]" />
                    <sidebar-menu :unlockerIds="[ 'energy', 'plasma', 'meteorite', 'carbon', 'fuel', 'antimatter' ]">
                        <sidebar-item-resource name="energy" icon="\icons\energy.png" paneId="energyPane" itemId="energy" />
                        <sidebar-item-resource name="plasma" icon="\icons\plasma.png" paneId="plasmaPane" itemId="plasma" />
                        <sidebar-item-resource name="meteorite" icon="\icons\meteorite.png" paneId="meteoritePane" itemId="meteorite" />
                        <sidebar-item-resource name="carbon" icon="\icons\carbon.png" paneId="carbonPane" itemId="carbon" />
                        <sidebar-item-resource name="fuel" icon="\icons\fuel.png" paneId="fuelPane" itemId="fuel" />
                        <sidebar-item-resource name="antimatter" icon="\icons\antimatter.png" paneId="antimatterPane" itemId="antimatter" />
                    </sidebar-menu>
                    
                    <sidebar-header name="sidebar-header-earth" />
                    <sidebar-menu>
                        <sidebar-item-resource name="science" icon="\icons\science.png" paneId="sciencePane" itemId="science" />
                        <sidebar-item-resource name="oil" icon="\icons\oil.png" paneId="oilPane" itemId="oil" />
                        <sidebar-item-resource name="metal" icon="\icons\metal.png" paneId="metalPane" itemId="metal" />
                        <sidebar-item-resource name="gem" icon="\icons\gem.png" paneId="gemPane" itemId="gem" />
                        <sidebar-item-resource name="wood" icon="\icons\wood.png" paneId="woodPane" itemId="wood" />
                        <sidebar-item-resource name="silicon" icon="\icons\silicon.png" paneId="siliconPane" itemId="silicon" />
                        <sidebar-item-resource name="uranium" icon="\icons\uranium.png" paneId="uraniumPane" itemId="uranium" />
                        <sidebar-item-resource name="lava" icon="\icons\lava.png" paneId="lavaPane" itemId="lava" />
                    </sidebar-menu>
                    
                    <sidebar-header name="sidebar-header-innerPlanetary" :unlockerIds="[ 'lunarite', 'methane', 'titanium', 'gold', 'silver' ]" />
                    <sidebar-menu :unlockerIds="[ 'lunarite', 'methane', 'titanium', 'gold', 'silver' ]">
                        <sidebar-item-resource name="lunarite" icon="\icons\lunarite.png" paneId="lunaritePane" itemId="lunarite" />
                        <sidebar-item-resource name="methane" icon="\icons\methane.png" paneId="methanePane" itemId="methane" />
                        <sidebar-item-resource name="titanium" icon="\icons\titanium.png" paneId="titaniumPane" itemId="titanium" />
                        <sidebar-item-resource name="gold" icon="\icons\gold.png" paneId="goldPane" itemId="gold" />
                        <sidebar-item-resource name="silver" icon="\icons\silver.png" paneId="silverPane" itemId="silver" />
                    </sidebar-menu>
                    
                    <sidebar-header name="sidebar-header-outerPlanetary" :unlockerIds="[ 'hydrogen', 'helium', 'ice', 'antimatter' ]" />
                    <sidebar-menu :unlockerIds="[ 'hydrogen', 'helium', 'ice' ]">
                        <sidebar-item-resource name="hydrogen" icon="\icons\hydrogen.png" paneId="hydrogenPane" itemId="hydrogen" />
                        <sidebar-item-resource name="helium" icon="\icons\helium.png" paneId="heliumPane" itemId="helium" />
                        <sidebar-item-resource name="ice" icon="\icons\ice.png" paneId="icePane" itemId="ice" />
                    </sidebar-menu>
                    
                </sidebar-block>
                
            </sidebar-pane>
            
            <sidebar-pane id="empirePane">
            
                <sidebar-block>
                    <sidebar-header name="sidebar-header-dashboards" />
                    <sidebar-menu>
                        <sidebar-item name="sidebar-item-achievements" icon="\icons\achievements.png" paneId="achievementsPane">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ getAchievementCount }}</span>
                                    <small class="text-normal ms-1">/{{ getAchievementMax }}</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-consumption" icon="\icons\production.png" paneId="productionPane">
                            <template v-slot:extra>
                                <div v-if="hasConsumptionIssue" class="col-auto text-end small text-danger">
                                    <font-awesome-icon icon="fa-exclamation-triangle" />
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item v-if="scienceUnlocked" name="sidebar-item-technologies" icon="\icons\technologies.png" paneId="technologiesPane" />
                        <sidebar-item v-if="emcUnlocked" name="sidebar-item-emc" icon="\icons\emc.png" paneId="emcPane" />
                    </sidebar-menu>
                </sidebar-block>
                
                <sidebar-block :unlockerIds="[ 'radarT1', 'shipT1' ]">
                    <sidebar-header name="sidebar-header-interstellar" />
                    <sidebar-menu>
                    
                        <sidebar-item name="sidebar-item-radar" icon="\icons\radar.png" paneId="radarPane" :unlockerIds="[ 'radarT1' ]">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ getRadarRange }}</span>
                                    <small class="text-normal ms-1">LY</small>
                                </div>
                            </template>
                        </sidebar-item>
                        
                        <sidebar-item name="sidebar-item-ships" icon="\icons\ships.png" paneId="shipsPane" :unlockerIds="[ 'shipT1' ]">
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
                        
                        <sidebar-item-faction name="sidebar-item-carnelian" icon="\icons\carnelian.png" paneId="carnelianPane" faction="carnelian" />
                        <sidebar-item-faction name="sidebar-item-prasnian" icon="\icons\prasnian.png" paneId="prasnianPane" faction="prasnian" />
                        <sidebar-item-faction name="sidebar-item-hyacinite" icon="\icons\hyacinite.png" paneId="hyacinitePane" faction="hyacinite" />
                        <sidebar-item-faction name="sidebar-item-kitrinos" icon="\icons\kitrinos.png" paneId="kitrinosPane" faction="kitrinos" />
                        <sidebar-item-faction name="sidebar-item-moviton" icon="\icons\moviton.png" paneId="movitonPane" faction="moviton" />
                        
                    </sidebar-menu>
                </sidebar-block>
                
            </sidebar-pane>
            
            <sidebar-pane id="prestigePane">
            
                <sidebar-block>
                    <sidebar-header name="sidebar-header-rebirth" />
                    <sidebar-menu>
                        <sidebar-item name="sidebar-item-dyson" icon="\icons\dyson.png" paneId="dysonPane">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light"><format-number :value="segments" /></span>
                                    <small class="text-normal ms-1">Sg</small>
                                </div>
                                <div class="col-auto text-end small">
                                    <span class="text-light"><format-number :value="rings" /></span>
                                    <small class="text-normal ms-1">Rg</small>
                                </div>
                                <div class="col-auto text-end small">
                                    <span class="text-light"><format-number :value="swarms" /></span>
                                    <small class="text-normal ms-1">Sw</small>
                                </div>
                                <div class="col-auto text-end small">
                                    <span class="text-light"><format-number :value="spheres" /></span>
                                    <small class="text-normal ms-1">Sp</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-darkMatter" icon="\icons\darkmatter.png" paneId="darkmatterPane" :unlockerIds="[ 'darkmatter' ]">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light"><format-number :value="darkmatter" /></span>
                                    <small class="text-normal ms-1">(<format-number :value="getDMPotential" />)</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-dmUpgrades" icon="\icons\upgrades.png" paneId="dmUpgradesPane" :unlockerIds="[ 'darkmatter' ]">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ getDMUpgradesCount }}</span>
                                    <small class="text-normal ms-1">/{{ getDMUpgradesMax }}</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-dmBoosts" icon="\icons\boosts.png" paneId="dmBoostsPane" :unlockerIds="[ 'darkmatter' ]" />
                    </sidebar-menu>
                </sidebar-block>
                
                <sidebar-block :unlockerIds="[ 'ultrite' ]">
                    <sidebar-header name="sidebar-header-enlightenment" />
                    <sidebar-menu>
                        <sidebar-item name="sidebar-item-ultrite" icon="\icons\ultrite.png" paneId="ultritePane">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ ultrite }}</span>
                                    <small class="text-normal ms-1">(<format-number :value="getULPotential" />)</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-ulUpgrades" icon="\icons\upgrades.png" paneId="ulUpgradesPane">
                            <template v-slot:extra>
                                <div class="col-auto text-end small">
                                    <span class="text-light">{{ getULUpgradesCount }}</span>
                                    <small class="text-normal ms-1">/{{ getULUpgradesMax }}</small>
                                </div>
                            </template>
                        </sidebar-item>
                        <sidebar-item name="sidebar-item-titans" icon="\icons\titans.png" paneId="titansPane">
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
        position: fixed; top: 54px; bottom: 54px; left: 0; z-index: 10;
        width: 100%;
        background-color: #232a35;
        transform: translateX(-100%) translateY(0) translateZ(0);
        transition: transform .28s ease-out;
    }
    @media (max-width: 767.98px) { #sidebar.open { transform: translateX(0) translateY(0) translateZ(0); } }
    @media (min-width: 768px) { #sidebar { width: 320px; transform: translateX(0) translateY(0) translateZ(0); } }
</style>
