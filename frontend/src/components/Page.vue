<template>
    <div id="page">
        <div class="tab-content">
        
            <page-pane id="donatingPane" name="menu-item-donating" icon="donating.png">
                <card id="donatingCard" name="donatingCardTitle">
                    <template v-slot:col-1>
                        <block-desc :descs="[ 'donatingCardText1', 'donatingCardText2' ]" />
                    </template>
                    <template v-slot:col-2>
                        <div class="col">
                            <div class="row g-1 row-cols-1">
                                <div class="col text-end">
                                    <small>{{ $t('donatingCardText3') }}</small>
                                </div>
                                <div class="col text-end">
                                    <small>{{ $t('donatingCardText6') }}</small>
                                </div>
                                <div class="col text-end">
                                    <small>{{ $t('donatingCardText7') }}</small>
                                </div>
                                <form class="d-flex justify-content-end" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                                    <input type="hidden" name="cmd" value="_s-xclick">
                                    <input type="hidden" name="hosted_button_id" value="7XYD7SJFKQ8M4">
                                    <button type="submit" class="btn btn-primary" style="width: 95px">
                                        <div class="row gx-2 align-items-center">
                                            <div class="col-auto d-flex align-items-center"><img src="../assets/icons/paypal.png" width="16" height="16" /></div>
                                            <div class="col-auto">Paypal</div>
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row g-1 row-cols-1">
                                <div class="col text-end">
                                    <small>{{ $t('donatingCardText4') }}</small>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <a href="https://www.patreon.com/bePatron?u=61283131" class="btn btn-primary" style="width: 95px" target="_blank">
                                        <div class="row gx-2 align-items-center">
                                            <div class="col-auto d-flex align-items-center"><img src="../assets/icons/patreon.png" width="16" height="16" /></div>
                                            <div class="col-auto">Patreon</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row g-1 row-cols-1">
                                <div class="col text-end">
                                    <small>{{ $t('donatingCardText5') }}</small>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <a href="https://ko-fi.com/freddecgames" class="btn btn-primary" style="width: 95px" target="_blank">
                                        <div class="row gx-2 align-items-center">
                                            <div class="col-auto d-flex align-items-center"><img src="../assets/icons/kofi.svg" width="16" height="16" /></div>
                                            <div class="col-auto">Ko-fi</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                </card>
            </page-pane>
            
            <page-pane id="statsPane" name="menu-item-stats" icon="stats.png">
                <card id="statsCard" name="statsCardTitle" body="true">
                    <template v-slot:body>
                        <div class="col">
                            <div class="row g-2">
                                <div class="col-6">
                                    <div class="small">{{ $t('statsStartDate') }}</div>
                                    <div class="text-light"><format-time :time="getTimeSinceStartDate" /></div>
                                </div>
                                <div class="col-6">
                                    <div class="small">{{ $t('statsTotal') }}</div>
                                    <div class="text-light">
                                        <img class="me-1" :src="require(`../assets/icons/conquest.png`).default" width="12" height="12" :alt="$t('statue')" />
                                        <span class="text-light me-3">{{ statsTotalConquests }}</span>
                                        <img class="me-1" :src="require(`../assets/icons/statue.png`).default" width="12" height="12" :alt="$t('statue')" />
                                        <span class="text-light">{{ statsTotalStatues }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="small">{{ $t('statsLastRebirth') }}</div>
                                    <div v-if="statsTotalRebirths > 0" class="text-light"><format-time :time="getTimeSinceLastRebirth" /></div>
                                    <div v-if="statsTotalRebirths <= 0" class="text-normal">---</div>
                                </div>
                                <div class="col-6">
                                    <div class="small">{{ $t('statsTotalRebirths') }}</div>
                                    <div class="text-light">{{ statsTotalRebirths }}</div>
                                </div>
                                <div class="col-6">
                                    <div class="small">{{ $t('statsLastEnlighten') }}</div>
                                    <div v-if="statsTotalEnlightens > 0" class="text-light"><format-time :time="getTimeSinceLastEnlighten" /></div>
                                    <div v-if="statsTotalEnlightens <= 0" class="text-normal">---</div>
                                </div>
                                <div class="col-6">
                                    <div class="small">{{ $t('statsTotalEnlightens') }}</div>
                                    <div class="text-light">{{ statsTotalEnlightens }}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </card>
            </page-pane>

            <page-pane id="optionsPane" name="menu-item-options" icon="options.png">
                <card id="companyNameCard" name="companyNameCardTitle" body="true">
                    <template v-slot:body>
                        <div class="col">
                            <div class="row g-1">
                            
                                <div class="col">
                                    <input type="text" class="form-control" v-model="newCompanyName" />
                                </div>
                                
                                <div class="col-auto">
                                    <button class="btn btn-primary" @click="setCompanyName(newCompanyName)">
                                        {{ $t('button-change') }}
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    </template>
                </card>
                <card id="savedDataCard" name="savedDataCardTitle" body="true">
                    <template v-slot:body>
                        <div class="col">
                            <div class="row g-2 row-cols-1">
                                <div class="col">
                                    <div class="row g-1">
                                    
                                        <div class="col-auto">
                                            <button class="btn btn-primary" @click="exportData()">{{ $t('button-export') }}</button>
                                        </div>
                                        
                                        <div class="col-auto">
                                            <button class="btn btn-primary" @click="importData()">{{ $t('button-import') }}</button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="alert alert-warning">
                                        <span>{{ $t('importWarning') }}</span>
                                        <div class="text-end"><a href="https://discord.gg/3UkgeeT9CV" target="_blank">Discord</a></div>
                                    </div>
                                </div>
                                <div class="col">
                                    <textarea class="form-control" style="height:100px;" v-model="compressed"></textarea>
                                </div>
                                <div class="col small">
                                    <span>{{ $t('savedDataCardText1') }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="mb-1">
                                <small>{{ $t('autoSavingDuration') }}</small>
                            </div>
                            <div>
                                <select class="form-control" v-model="newAutoSaveDelay" @change="setAutoSaveDelay(newAutoSaveDelay)">
                                    <option value="30000">{{ $t('30seconds') }}</option>
                                    <option value="120000">{{ $t('2minutes') }}</option>
                                    <option value="600000">{{ $t('10minutes') }}</option>
                                    <option value="-1">{{ $t('off') }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row g-1">
                                <div v-if="!confirmReset" class="col text-end">
                                    <button class="btn btn-danger" @click="confirmReset = true">
                                        {{ $t('button-reset') }}
                                    </button>
                                </div>
                                <div v-if="confirmReset" class="col text-end">
                                    <div class="row g-1 align-items-center">
                                        <div class="col-auto">
                                            <button class="btn btn-danger" @click="reset()">
                                                {{ $t('button-reset') }}
                                            </button>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-danger">{{ $t('reset-confirm') }}</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <button class="btn btn-primary" @click="save()">
                                        {{ $t('button-manualSave') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </card>
            </page-pane>
            
            <page-pane id="aboutPane" name="menu-item-about" icon="about.png">
                <card id="infoCard" name="infoCardTitle" body="true">
                    <template v-slot:body>
                        <div class="col">
                            <div class="row g-2 row-cols-1">
                                <div class="col"><small>{{ $t('infoCardText1') }}</small></div>
                                <div class="col">
                                    <small class="me-2">{{ $t('infoCardText2') }}</small>
                                    <a class="small" href="https://sparticle999.github.io/SpaceCompany/" target="_blank">https://sparticle999.github.io/SpaceCompany/</a>
                                </div>
                                <div class="col"><h6 class="text-light">{{ $t('infoCardText3') }}</h6></div>
                                <div class="col"><h6 class="text-light">{{ $t('infoCardText4') }}</h6></div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row g-2 justify-content-end">
                                <div class="col-auto">
                                    <a class="btn btn-primary" href="https://freddecgames.com" target="_blank">
                                        <img src="../assets/freddec.png" width="16" height="16" class="rounded" alt="Discord" />
										<span class="ms-2">Freddec Games</span>
                                    </a>
                                </div>
                                <div class="col-auto">
                                    <a class="btn btn-primary" href="https://discord.gg/3UkgeeT9CV" target="_blank">
                                        <img src="../assets/icons/discord.png" width="16" height="16" alt="Discord" />
                                        <span class="ms-2">Discord</span>
                                    </a>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-primary" @click="setActivePane('donatingPane');">
                                        <img src="../assets/icons/donating.png" width="16" height="16" :alt="$t('menu-item-donating')" />
                                        <span class="ms-2">{{ $t('menu-item-donating') }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </card>
                <card id="changelogCard" name="changelogCardTitle">
                    <template v-slot:col-1>
                        <div class="col">
                            <small class="me-2">{{ $t('lastestVersion') }}</small>
                            <small class="text-light">v2.7.2 - 2021-12-14</small>
                            <ul class="small mt-2 mb-0">
                                <li>FIX: statue progress on Overlord mission</li>
                            </ul>
                        </div>
                    </template>
                    <template v-slot:col-2>
                        <div class="col">
                            <small class="me-2">{{ $t('previousVersion') }}</small>
                            <small class="text-light">v2.7.1 - 2021-12-05</small>
                            <ul class="small mt-2 mb-0">
                                <li>FIX: V1 import of energy T1/T2 machines</li>
                                <li>FIX: typo on science T5 machine</li>
                                <li>FIX: meteorite T2 achievement not reset after rebirth/enlightenment</li>
                            </ul>
                        </div>
                        <div class="col">
                            <div class="row g-2 justify-content-end">
                                <div class="col-auto">
                                    <a class="btn btn-primary" href="https://github.com/FreddecGames/ngsc" target="_blank">
                                        <img src="../assets/icons/github.png" width="16" height="16" alt="Github" />
                                        <span class="ms-2">Github</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>
                </card>
            </page-pane>
            
            <page-pane id="earthPane" name="sidebar-item-earth" icon="earth.png">
                <card-building id="missionFirstCard" name="missionFirst" :descs="[ 'missionFirst-desc1', 'missionFirst-desc2' ]" itemId="missionFirst" btnText="button-next" />
                <card-building id="missionStorageCard" name="missionStorage" :descs="[ 'missionStorage-desc1' ]" itemId="missionStorage" btnText="button-research" />
                <card-building id="missionSolarPanelCard" name="missionSolarPanel" :descs="[ 'missionSolarPanel-desc1' ]" itemId="missionSolarPanel" btnText="button-research" />
                <card-building id="missionEnergyCard" name="missionEnergy" :descs="[ 'missionEnergy-desc1' ]" itemId="missionEnergy" btnText="button-research" />
                <card-building id="missionOilCard" name="missionOil" :descs="[ 'missionOil-desc1' ]" itemId="missionOil" btnText="button-research" />
                <card-building id="missionTier2Card" name="missionTier2" :descs="[ 'missionTier2-desc1' ]" itemId="missionTier2" btnText="button-research" />
                <card-building id="missionDestructionCard" name="missionDestruction" :descs="[ 'missionDestruction-desc1' ]" itemId="missionDestruction" btnText="button-research" />
                <card-building id="missionFuelCard" name="missionFuel" :descs="[ 'missionFuel-desc1' ]" itemId="missionFuel" btnText="button-research" />
            </page-pane>
            
            <page-pane id="rocketPane" name="sidebar-item-rocket" icon="rocket.png">
                <card-building id="missionRocket1Card" name="missionRocket1" :descs="[ 'missionRocket1-desc1', 'missionRocket1-desc2' ]" itemId="missionRocket1" btnText="button-build" />
                <card-building id="missionRocket2Card" name="missionRocket2" :descs="[ 'missionRocket2-desc1' ]" itemId="missionRocket2" btnText="button-launch" />
            </page-pane>
            
            <page-pane id="innerSolarSystemPane" name="sidebar-item-innerSolarSystem" icon="innerSolarSystem.png">
                <card-building id="missionMoonCard" name="missionMoon" :descs="[ 'missionMoon-desc1' ]" itemId="missionMoon" btnText="button-explore" />
                <card-building id="missionMercuryCard" name="missionMercury" :descs="[ 'missionMercury-desc1' ]" itemId="missionMercury" btnText="button-gotit" />
                <card-building id="missionMarsCard" name="missionMars" :descs="[ 'missionMars-desc1' ]" itemId="missionMars" btnText="button-explore" />
                <card-building id="missionVenusCard" name="missionVenus" :descs="[ 'missionVenus-desc1' ]" itemId="missionVenus" btnText="button-explore" />
                <card-building id="missionAsteroidCard" name="missionAsteroid" :descs="[ 'missionAsteroid-desc1' ]" itemId="missionAsteroid" btnText="button-explore" />
                <card-building id="missionWonderStationCard" name="missionWonderStation" :descs="[ 'missionWonderStation-desc1' ]" itemId="missionWonderStation" btnText="button-explore" />
            </page-pane>
            
            <page-pane id="outerSolarSystemPane" name="sidebar-item-outerSolarSystem" icon="outerSolarSystem.png">
                <card-building id="missionJupiterCard" name="missionJupiter" :descs="[ 'missionJupiter-desc1' ]" itemId="missionJupiter" btnText="button-explore" />
                <card-building id="missionSaturnCard" name="missionSaturn" :descs="[ 'missionSaturn-desc1' ]" itemId="missionSaturn" btnText="button-explore" />
                <card-building id="missionUranusCard" name="missionUranus" :descs="[ 'missionUranus-desc1' ]" :descs2="[ 'missionUranus-desc2' ]" itemId="missionUranus" btnText="button-gotit" />
                <card-building id="missionNeptuneCard" name="missionNeptune" :descs="[ 'missionNeptune-desc1' ]" :descs2="[ 'missionNeptune-desc2' ]" itemId="missionNeptune" btnText="button-gotit" />
                <card-building id="missionPlutoCard" name="missionPluto" :descs="[ 'missionPluto-desc1' ]" itemId="missionPluto" btnText="button-explore" />
                <card-building id="missionKuiperCard" name="missionKuiper" :descs="[ 'missionKuiper-desc1' ]" itemId="missionKuiper" btnText="button-explore" />
                <card-building id="missionSolCenterCard" name="missionSolCenter" :descs="[ 'missionSolCenter-desc1' ]" itemId="missionSolCenter" btnText="button-explore" />
            </page-pane>
            
            <page-pane id="wonderStation1Pane" name="sidebar-item-wonderStation1" icon="wonderStation.png">
                <card-building id="missionWonderStation2Card" name="missionWonderStation2" :descs="[ 'missionWonderStation2-desc1' ]" :descs2="[ 'missionWonderStation2-desc2' ]" itemId="missionWonderStation2" btnText="button-next" />
                <card-building id="missionWonderPreciousCard" name="missionWonderPrecious" :descs="[ 'missionWonderPrecious-desc1', 'missionWonderPrecious-desc2' ]" itemId="missionWonderPrecious" btnText="button-activate" />
                <card-building id="missionWonderTechnologicalCard" name="missionWonderTechnological" :descs="[ 'missionWonderTechnological-desc1', 'missionWonderTechnological-desc2' ]" itemId="missionWonderTechnological" btnText="button-activate" />
                <card-building id="missionWonderEnergeticCard" name="missionWonderEnergetic" :descs="[ 'missionWonderEnergetic-desc1', 'missionWonderEnergetic-desc2' ]" itemId="missionWonderEnergetic" btnText="button-activate" />
                <card-building id="missionWonderMeteoriteCard" name="missionWonderMeteorite" :descs="[ 'missionWonderMeteorite-desc1', 'missionWonderMeteorite-desc2' ]" itemId="missionWonderMeteorite" btnText="button-activate" />
            </page-pane>
            
            <page-pane id="alienTechnologiesPane" name="sidebar-item-alienTechnologies" icon="alien.png">
                <card-building id="missionPlasmaCard" name="missionPlasma" :descs="[ 'missionPlasma-desc1' ]" itemId="missionPlasma" btnText="button-research" />
                <card-building id="missionEmcCard" name="missionEmc" :descs="[ 'missionEmc-desc1' ]" itemId="missionEmc" btnText="button-research" />
                <card-building id="missionMeteoriteCard" name="missionMeteorite" :descs="[ 'missionMeteorite-desc1' ]" itemId="missionMeteorite" btnText="button-research" />
                <card-building id="missionDysonCard" name="missionDyson" :descs="[ 'missionDyson-desc1' ]" itemId="missionDyson" btnText="button-research" />
            </page-pane>
            
            <page-pane id="rebirthPane" name="sidebar-item-rebirth" icon="rebirth.png">
                <card-building id="missionRebirthCard" name="missionRebirth" :descs="[ 'missionRebirth-desc1', 'missionRebirth-desc2', 'missionRebirth-desc3' ]" :descs2="[ 'missionRebirth-desc4', 'missionRebirth-desc5' ]" itemId="missionRebirth" btnText="button-unlock" />
                <card-building id="missionRebirth2Card" name="missionRebirth2" :descs="[ 'missionRebirth2-desc1' ]" itemId="missionRebirth2" btnText="button-unlock" />
            </page-pane>
            
            <page-pane id="wonderStation2Pane" name="sidebar-item-wonderStation2" icon="wonderStation.png">
                <card-building id="missionWonderCommCard" name="missionWonderComm" :descs="[ 'missionWonderComm-desc1', 'missionWonderComm-desc2' ]" :descs2="[ 'missionWonderComm-desc3' ]" itemId="missionWonderComm" btnText="button-activate" />
                <card-building id="missionWonderAntimatterCard" name="missionWonderAntimatter" :descs="[ 'missionWonderAntimatter-desc1', 'missionWonderAntimatter-desc2' ]" :descs2="[ 'missionWonderAntimatter-desc3' ]" itemId="missionWonderAntimatter" btnText="button-activate" />
                <card-building id="missionWonderPortalCard" name="missionWonderPortal" :descs="[ 'missionWonderPortal-desc1', 'missionWonderPortal-desc2' ]" :descs2="[ 'missionWonderPortal-desc3' ]" itemId="missionWonderPortal" btnText="button-activate" />
                <card-building id="missionWonderStargateCard" name="missionWonderStargate" :descs="[ 'missionWonderStargate-desc1', 'missionWonderStargate-desc2' ]" itemId="missionWonderStargate" btnText="button-activate" />
            </page-pane>
            
            <page-pane id="spaceshipPane" name="sidebar-item-spaceship" icon="spaceship.png">
                <card-building id="missionSpaceshipCard" name="missionSpaceship" :descs="[ 'missionSpaceship-desc1' ]" :descs2="[ 'missionSpaceship-desc2' ]" itemId="missionSpaceship" btnText="button-launch" />
                <card-building id="missionShieldCard" name="missionShield" :descs="[ 'missionShield-desc1' ]" icon="shield.png" itemId="missionShield" btnText="button-build" />
                <card-building id="missionEngineCard" name="missionEngine" :descs="[ 'missionEngine-desc1' ]" icon="engine.png" itemId="missionEngine" btnText="button-build" />
                <card-building id="missionAeroCard" name="missionAero" :descs="[ 'missionAero-desc1' ]" icon="aero.png" itemId="missionAero" btnText="button-build" />
            </page-pane>
            
            <page-pane id="enlightenmentPane" name="sidebar-item-enlightenment" icon="enlightenment.png">
                <card-building id="missionEnlightenCard" name="missionEnlighten" :descs="[ 'missionEnlighten-desc1', 'missionEnlighten-desc2' ]" :descs2="[ 'missionEnlighten-desc3', 'missionEnlighten-desc4', 'missionEnlighten-desc5' ]" itemId="missionEnlighten" btnText="button-unlock" />
            </page-pane>
            
            <page-pane id="overlordPane" name="sidebar-item-overlord" icon="overlord.png">
                <card id="missionOverlordCard" name="missionOverlord">
                    <template v-slot:col-1>
                    
                        <block-desc :descs="[ 'missionOverlord-desc1' ]" />
                        
                    </template>
                    <template v-slot:col-2>
                        
                        <div class="col">
                            <div class="d-flex align-items-center">
                                <img class="me-1" :src="require(`../assets/icons/statue.png`).default" width="12" height="12" :alt="$t('statue')" />
                                <small>150</small>
                            </div>
                            <line-progress :progress="statueProgress" count="150" />
                            <div class="pt-2 d-flex justify-content-end">
                                <button-meet />
                            </div>
                        </div>
        
                    </template>
                </card>
            </page-pane>
            
            <page-pane-resource id="energyPane" name="energy" icon="energy.png" itemId="energy">
                <card-upgrade id="energyUpgradeCard" :descs="[ 'energyUpgrade-desc1' ]" itemId="energy" />
                <card-building id="energyT1Card" name="energyT1" level="1" :descs="[ 'energyT1-desc1' ]" itemId="energyT1" btnText="button-build" />
                <card-building id="energyT2Card" name="energyT2" level="2" :descs="[ 'energyT2-desc1' ]" itemId="energyT2" btnText="button-build" />
                <card-building id="energyT3Card" name="energyT3" level="3" :descs="[ 'energyT3-desc1' ]" itemId="energyT3" btnText="button-build" />
                <card-building id="energyT4Card" name="energyT4" level="4" :descs="[ 'energyT4-desc1' ]" itemId="energyT4" btnText="button-build" />
                <card-building id="energyT5Card" name="energyT5" level="5" :descs="[ 'energyT5-desc1' ]" itemId="energyT5" btnText="button-build" />
                <card-building id="energyT6Card" name="energyT6" level="6" :descs="[ 'energyT6-desc1' ]" itemId="energyT6" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="plasmaPane" name="plasma" icon="plasma.png" itemId="plasma">
                <card-gain id="plasmaGainCard" :descs="[ 'plasmaGain-desc1' ]" itemId="plasma" />
                <card-upgrade id="plasmaUpgradeCard" :descs="[ 'plasmaUpgrade-desc1' ]" itemId="plasma" />
                <card-building id="plasmaT1Card" name="plasmaT1" level="1" :descs="[ 'plasmaT1-desc1' ]" itemId="plasmaT1" btnText="button-build" />
                <card-building id="techPlasmaT2Card" name="techPlasmaT2" :descs="[ 'techPlasmaT2-desc1' ]" itemId="techPlasmaT2" btnText="button-research" toHide="true" />
                <card-building id="plasmaT2Card" name="plasmaT2" level="2" :descs="[ 'plasmaT2-desc1' ]" itemId="plasmaT2" btnText="button-build" />
                <card-building id="techPlasmaT3Card" name="techPlasmaT3" :descs="[ 'techPlasmaT3-desc1' ]" itemId="techPlasmaT3" btnText="button-research" toHide="true" />
                <card-building id="plasmaT3Card" name="plasmaT3" level="3" :descs="[ 'plasmaT3-desc1' ]" itemId="plasmaT3" btnText="button-build" />
                <card-building id="techPlasmaT4Card" name="techPlasmaT4" :descs="[ 'techPlasmaT4-desc1' ]" itemId="techPlasmaT4" btnText="button-research" toHide="true" />
                <card-building id="plasmaT4Card" name="plasmaT4" level="4" :descs="[ 'plasmaT4-desc1' ]" itemId="plasmaT4" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="meteoritePane" name="meteorite" icon="meteorite.png" itemId="meteorite">
                <card-gain id="meteoriteGainCard" :descs="[ 'meteoriteGain-desc1' ]" itemId="meteorite" />
                <card-convert id="meteoriteConvertCard" :descs="[ 'meteoriteConvert-desc1' ]" itemId="meteorite" />
                <card-upgrade id="meteoriteUpgradeCard" :descs="[ 'meteoriteUpgrade-desc1' ]" itemId="meteorite" />
                <card-building id="meteoriteT1Card" name="meteoriteT1" level="1" :descs="[ 'meteoriteT1-desc1' ]" itemId="meteoriteT1" btnText="button-build" />
                <card-building id="techMeteoriteT2Card" name="techMeteoriteT2" :descs="[ 'techMeteoriteT2-desc1' ]" itemId="techMeteoriteT2" btnText="button-research" toHide="true" />
                <card-building id="meteoriteT2Card" name="meteoriteT2" level="2" :descs="[ 'meteoriteT2-desc1' ]" itemId="meteoriteT2" btnText="button-build" />
                <card-building id="techMeteoriteT3Card" name="techMeteoriteT3" :descs="[ 'techMeteoriteT3-desc1' ]" itemId="techMeteoriteT3" btnText="button-research" toHide="true" />
                <card-building id="meteoriteT3Card" name="meteoriteT3" level="3" :descs="[ 'meteoriteT3-desc1' ]" itemId="meteoriteT3" btnText="button-build" />
                <card-building id="techMeteoriteT4Card" name="techMeteoriteT4" :descs="[ 'techMeteoriteT4-desc1' ]" itemId="techMeteoriteT4" btnText="button-research" toHide="true" />
                <card-building id="meteoriteT4Card" name="meteoriteT4" level="4" :descs="[ 'meteoriteT4-desc1' ]" itemId="meteoriteT4" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="carbonPane" name="carbon" icon="carbon.png" itemId="carbon">
                <card-gain id="carbonGainCard" :descs="[ 'carbonGain-desc1' ]" itemId="carbon" />
                <card-convert id="carbonConvertCard" :descs="[ 'carbonConvert-desc1' ]" itemId="carbon" />
                <card-upgrade id="carbonUpgradeCard" :descs="[ 'carbonUpgrade-desc1' ]" itemId="carbon" />
                <card-building id="carbonT1Card" name="carbonT1" level="1" :descs="[ 'carbonT1-desc1' ]" itemId="carbonT1" btnText="button-build" />
                <card-building id="techCarbonT2Card" name="techCarbonT2" :descs="[ 'techCarbonT2-desc1' ]" itemId="techCarbonT2" btnText="button-research" toHide="true" />
                <card-building id="carbonT2Card" name="carbonT2" level="2" :descs="[ 'carbonT2-desc1' ]" itemId="carbonT2" btnText="button-build" />
                <card-building id="techCarbonT3Card" name="techCarbonT3" :descs="[ 'techCarbonT3-desc1' ]" itemId="techCarbonT3" btnText="button-research" toHide="true" />
                <card-building id="carbonT3Card" name="carbonT3" level="3" :descs="[ 'carbonT3-desc1' ]" itemId="carbonT3" btnText="button-build" />
                <card-building id="techCarbonT4Card" name="techCarbonT4" :descs="[ 'techCarbonT4-desc1' ]" itemId="techCarbonT4" btnText="button-research" toHide="true" />
                <card-building id="carbonT4Card" name="carbonT4" level="4" :descs="[ 'carbonT4-desc1' ]" itemId="carbonT4" btnText="button-build" />
                <card-building id="techCarbonT5Card" name="techCarbonT5" :descs="[ 'techCarbonT5-desc1' ]" itemId="techCarbonT5" btnText="button-research" toHide="true" />
                <card-building id="carbonT5Card" name="carbonT5" level="5" :descs="[ 'carbonT5-desc1' ]" itemId="carbonT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="sciencePane" name="science" icon="science.png" itemId="science">
                <card-building id="scienceT1Card" name="scienceT1" level="1" :descs="[ 'scienceT1-desc1' ]" itemId="scienceT1" btnText="button-build" />
                <card-building id="techScienceT2Card" name="techScienceT2" :descs="[ 'techScienceT2-desc1' ]" itemId="techScienceT2" btnText="button-research" toHide="true" />
                <card-building id="scienceT2Card" name="scienceT2" level="2" :descs="[ 'scienceT2-desc1' ]" itemId="scienceT2" btnText="button-build" />
                <card-building id="techScienceT3Card" name="techScienceT3" :descs="[ 'techScienceT3-desc1' ]" itemId="techScienceT3" btnText="button-research" toHide="true" />
                <card-building id="scienceT3Card" name="scienceT3" level="3" :descs="[ 'scienceT3-desc1' ]" itemId="scienceT3" btnText="button-build" />
                <card-building id="techScienceT4Card" name="techScienceT4" :descs="[ 'techScienceT4-desc1' ]" itemId="techScienceT4" btnText="button-research" toHide="true" />
                <card-building id="scienceT4Card" name="scienceT4" level="4" :descs="[ 'scienceT4-desc1' ]" itemId="scienceT4" btnText="button-build" />
                <card-building id="techScienceT5Card" name="techScienceT5" :descs="[ 'techScienceT5-desc1' ]" itemId="techScienceT5" btnText="button-research" toHide="true" />
                <card-building id="scienceT5Card" name="scienceT5" level="5" :descs="[ 'scienceT5-desc1' ]" itemId="scienceT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="oilPane" name="oil" icon="oil.png" itemId="oil">
                <card-gain id="oilGainCard" :descs="[ 'oilGain-desc1' ]" itemId="oil" />
                <card-convert id="oilConvertCard" :descs="[ 'oilConvert-desc1' ]" itemId="oil" />
                <card-upgrade id="oilUpgradeCard" :descs="[ 'oilUpgrade-desc1' ]" itemId="oil" />
                <card-building id="oilT1Card" name="oilT1" level="1" :descs="[ 'oilT1-desc1' ]" itemId="oilT1" btnText="button-build" />
                <card-building id="techOilT2Card" name="techOilT2" :descs="[ 'techOilT2-desc1' ]" itemId="techOilT2" btnText="button-research" toHide="true" />
                <card-building id="oilT2Card" name="oilT2" level="2" :descs="[ 'oilT2-desc1' ]" itemId="oilT2" btnText="button-build" />
                <card-building id="techOilT3Card" name="techOilT3" :descs="[ 'techOilT3-desc1' ]" itemId="techOilT3" btnText="button-research" toHide="true" />
                <card-building id="oilT3Card" name="oilT3" level="3" :descs="[ 'oilT3-desc1' ]" itemId="oilT3" btnText="button-build" />
                <card-building id="techOilT4Card" name="techOilT4" :descs="[ 'techOilT4-desc1' ]" itemId="techOilT4" btnText="button-research" toHide="true" />
                <card-building id="oilT4Card" name="oilT4" level="4" :descs="[ 'oilT4-desc1' ]" itemId="oilT4" btnText="button-build" />
                <card-building id="techOilT5Card" name="techOilT5" :descs="[ 'techOilT5-desc1' ]" itemId="techOilT5" btnText="button-research" toHide="true" />
                <card-building id="oilT5Card" name="oilT5" level="5" :descs="[ 'oilT5-desc1' ]" itemId="oilT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="fuelPane" name="fuel" icon="fuel.png" itemId="fuel">
                <card-upgrade id="fuelUpgradeCard" :descs="[ 'fuelUpgrade-desc1' ]" itemId="fuel" />
                <card-building id="fuelT1Card" name="fuelT1" level="1" :descs="[ 'fuelT1-desc1' ]" itemId="fuelT1" btnText="button-build" />
                <card-building id="techFuelT2Card" name="techFuelT2" :descs="[ 'techFuelT2-desc1' ]" itemId="techFuelT2" btnText="button-research" toHide="true" />
                <card-building id="fuelT2Card" name="fuelT2" level="2" :descs="[ 'fuelT2-desc1' ]" itemId="fuelT2" btnText="button-build" />
                <card-building id="techFuelT3Card" name="techFuelT3" :descs="[ 'techFuelT3-desc1' ]" itemId="techFuelT3" btnText="button-research" toHide="true" />
                <card-building id="fuelT3Card" name="fuelT3" level="3" :descs="[ 'fuelT3-desc1' ]" itemId="fuelT3" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="metalPane" name="metal" icon="metal.png" itemId="metal">
                <card-gain id="metalGainCard" :descs="[ 'metalGain-desc1' ]" itemId="metal" />
                <card-convert id="metalConvertCard" :descs="[ 'metalConvert-desc1' ]" itemId="metal" />
                <card-upgrade id="metalUpgradeCard" :descs="[ 'metalUpgrade-desc1' ]" itemId="metal" />
                <card-building id="metalT1Card" name="metalT1" level="1" :descs="[ 'metalT1-desc1' ]" itemId="metalT1" btnText="button-build" />
                <card-building id="techMetalT2Card" name="techMetalT2" :descs="[ 'techMetalT2-desc1' ]" itemId="techMetalT2" btnText="button-research" toHide="true" />
                <card-building id="metalT2Card" name="metalT2" level="2" :descs="[ 'metalT2-desc1' ]" itemId="metalT2" btnText="button-build" />
                <card-building id="techMetalT3Card" name="techMetalT3" :descs="[ 'techMetalT3-desc1' ]" itemId="techMetalT3" btnText="button-research" toHide="true" />
                <card-building id="metalT3Card" name="metalT3" level="3" :descs="[ 'metalT3-desc1' ]" itemId="metalT3" btnText="button-build" />
                <card-building id="techMetalT4Card" name="techMetalT4" :descs="[ 'techMetalT4-desc1' ]" itemId="techMetalT4" btnText="button-research" toHide="true" />
                <card-building id="metalT4Card" name="metalT4" level="4" :descs="[ 'metalT4-desc1' ]" itemId="metalT4" btnText="button-build" />
                <card-building id="techMetalT5Card" name="techMetalT5" :descs="[ 'techMetalT5-desc1' ]" itemId="techMetalT5" btnText="button-research" toHide="true" />
                <card-building id="metalT5Card" name="metalT5" level="5" :descs="[ 'metalT5-desc1' ]" itemId="metalT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="gemPane" name="gem" icon="gem.png" itemId="gem">
                <card-gain id="gemGainCard" :descs="[ 'gemGain-desc1' ]" itemId="gem" />
                <card-convert id="gemConvertCard" :descs="[ 'gemConvert-desc1' ]" itemId="gem" />
                <card-upgrade id="gemUpgradeCard" :descs="[ 'gemUpgrade-desc1' ]" itemId="gem" />
                <card-building id="gemT1Card" name="gemT1" level="1" :descs="[ 'gemT1-desc1' ]" itemId="gemT1" btnText="button-build" />
                <card-building id="techGemT2Card" name="techGemT2" :descs="[ 'techGemT2-desc1' ]" itemId="techGemT2" btnText="button-research" toHide="true" />
                <card-building id="gemT2Card" name="gemT2" level="2" :descs="[ 'gemT2-desc1' ]" itemId="gemT2" btnText="button-build" />
                <card-building id="techGemT3Card" name="techGemT3" :descs="[ 'techGemT3-desc1' ]" itemId="techGemT3" btnText="button-research" toHide="true" />
                <card-building id="gemT3Card" name="gemT3" level="3" :descs="[ 'gemT3-desc1' ]" itemId="gemT3" btnText="button-build" />
                <card-building id="techGemT4Card" name="techGemT4" :descs="[ 'techGemT4-desc1' ]" itemId="techGemT4" btnText="button-research" toHide="true" />
                <card-building id="gemT4Card" name="gemT4" level="4" :descs="[ 'gemT4-desc1' ]" itemId="gemT4" btnText="button-build" />
                <card-building id="techGemT5Card" name="techGemT5" :descs="[ 'techGemT5-desc1' ]" itemId="techGemT5" btnText="button-research" toHide="true" />
                <card-building id="gemT5Card" name="gemT5" level="5" :descs="[ 'gemT5-desc1' ]" itemId="gemT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="woodPane" name="wood" icon="wood.png" itemId="wood">
                <card-gain id="woodGainCard" :descs="[ 'woodGain-desc1' ]" itemId="wood" />
                <card-convert id="woodConvertCard" :descs="[ 'woodConvert-desc1' ]" itemId="wood" />
                <card-upgrade id="woodUpgradeCard" :descs="[ 'woodUpgrade-desc1' ]" itemId="wood" />
                <card-building id="woodT1Card" name="woodT1" level="1" :descs="[ 'woodT1-desc1' ]" itemId="woodT1" btnText="button-build" />
                <card-building id="techWoodT2Card" name="techWoodT2" :descs="[ 'techWoodT2-desc1' ]" itemId="techWoodT2" btnText="button-research" toHide="true" />
                <card-building id="woodT2Card" name="woodT2" level="2" :descs="[ 'woodT2-desc1' ]" itemId="woodT2" btnText="button-build" />
                <card-building id="techWoodT3Card" name="techWoodT3" :descs="[ 'techWoodT3-desc1' ]" itemId="techWoodT3" btnText="button-research" toHide="true" />
                <card-building id="woodT3Card" name="woodT3" level="3" :descs="[ 'woodT3-desc1' ]" itemId="woodT3" btnText="button-build" />
                <card-building id="techWoodT4Card" name="techWoodT4" :descs="[ 'techWoodT4-desc1' ]" itemId="techWoodT4" btnText="button-research" toHide="true" />
                <card-building id="woodT4Card" name="woodT4" level="4" :descs="[ 'woodT4-desc1' ]" itemId="woodT4" btnText="button-build" />
                <card-building id="techWoodT5Card" name="techWoodT5" :descs="[ 'techWoodT5-desc1' ]" itemId="techWoodT5" btnText="button-research" toHide="true" />
                <card-building id="woodT5Card" name="woodT5" level="5" :descs="[ 'woodT5-desc1' ]" itemId="woodT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="siliconPane" name="silicon" icon="silicon.png" itemId="silicon">
                <card-gain id="siliconGainCard" :descs="[ 'siliconGain-desc1' ]" itemId="silicon" />
                <card-convert id="siliconConvertCard" :descs="[ 'siliconConvert-desc1' ]" itemId="silicon" />
                <card-upgrade id="siliconUpgradeCard" :descs="[ 'siliconUpgrade-desc1' ]" itemId="silicon" />
                <card-building id="siliconT1Card" name="siliconT1" level="1" :descs="[ 'siliconT1-desc1' ]" itemId="siliconT1" btnText="button-build" />
                <card-building id="techSiliconT2Card" name="techSiliconT2" :descs="[ 'techSiliconT2-desc1' ]" itemId="techSiliconT2" btnText="button-research" toHide="true" />
                <card-building id="siliconT2Card" name="siliconT2" level="2" :descs="[ 'siliconT2-desc1' ]" itemId="siliconT2" btnText="button-build" />
                <card-building id="techSiliconT3Card" name="techSiliconT3" :descs="[ 'techSiliconT3-desc1' ]" itemId="techSiliconT3" btnText="button-research" toHide="true" />
                <card-building id="siliconT3Card" name="siliconT3" level="3" :descs="[ 'siliconT3-desc1' ]" itemId="siliconT3" btnText="button-build" />
                <card-building id="techSiliconT4Card" name="techSiliconT4" :descs="[ 'techSiliconT4-desc1' ]" itemId="techSiliconT4" btnText="button-research" toHide="true" />
                <card-building id="siliconT4Card" name="siliconT4" level="4" :descs="[ 'siliconT4-desc1' ]" itemId="siliconT4" btnText="button-build" />
                <card-building id="techSiliconT5Card" name="techSiliconT5" :descs="[ 'techSiliconT5-desc1' ]" itemId="techSiliconT5" btnText="button-research" toHide="true" />
                <card-building id="siliconT5Card" name="siliconT5" level="5" :descs="[ 'siliconT5-desc1' ]" itemId="siliconT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="uraniumPane" name="uranium" icon="uranium.png" itemId="uranium">
                <card-gain id="uraniumGainCard" :descs="[ 'uraniumGain-desc1' ]" itemId="uranium" />
                <card-convert id="uraniumConvertCard" :descs="[ 'uraniumConvert-desc1' ]" itemId="uranium" />
                <card-upgrade id="uraniumUpgradeCard" :descs="[ 'uraniumUpgrade-desc1' ]" itemId="uranium" />
                <card-building id="uraniumT1Card" name="uraniumT1" level="1" :descs="[ 'uraniumT1-desc1' ]" itemId="uraniumT1" btnText="button-build" />
                <card-building id="techUraniumT2Card" name="techUraniumT2" :descs="[ 'techUraniumT2-desc1' ]" itemId="techUraniumT2" btnText="button-research" toHide="true" />
                <card-building id="uraniumT2Card" name="uraniumT2" level="2" :descs="[ 'uraniumT2-desc1' ]" itemId="uraniumT2" btnText="button-build" />
                <card-building id="techUraniumT3Card" name="techUraniumT3" :descs="[ 'techUraniumT3-desc1' ]" itemId="techUraniumT3" btnText="button-research" toHide="true" />
                <card-building id="uraniumT3Card" name="uraniumT3" level="3" :descs="[ 'uraniumT3-desc1' ]" itemId="uraniumT3" btnText="button-build" />
                <card-building id="techUraniumT4Card" name="techUraniumT4" :descs="[ 'techUraniumT4-desc1' ]" itemId="techUraniumT4" btnText="button-research" toHide="true" />
                <card-building id="uraniumT4Card" name="uraniumT4" level="4" :descs="[ 'uraniumT4-desc1' ]" itemId="uraniumT4" btnText="button-build" />
                <card-building id="techUraniumT5Card" name="techUraniumT5" :descs="[ 'techUraniumT5-desc1' ]" itemId="techUraniumT5" btnText="button-research" toHide="true" />
                <card-building id="uraniumT5Card" name="uraniumT5" level="5" :descs="[ 'uraniumT5-desc1' ]" itemId="uraniumT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="lavaPane" name="lava" icon="lava.png" itemId="lava">
                <card-gain id="lavaGainCard" :descs="[ 'lavaGain-desc1' ]" itemId="lava" />
                <card-convert id="lavaConvertCard" :descs="[ 'lavaConvert-desc1' ]" itemId="lava" />
                <card-upgrade id="lavaUpgradeCard" :descs="[ 'lavaUpgrade-desc1' ]" itemId="lava" />
                <card-building id="lavaT1Card" name="lavaT1" level="1" :descs="[ 'lavaT1-desc1' ]" itemId="lavaT1" btnText="button-build" />
                <card-building id="techLavaT2Card" name="techLavaT2" :descs="[ 'techLavaT2-desc1' ]" itemId="techLavaT2" btnText="button-research" toHide="true" />
                <card-building id="lavaT2Card" name="lavaT2" level="2" :descs="[ 'lavaT2-desc1' ]" itemId="lavaT2" btnText="button-build" />
                <card-building id="techLavaT3Card" name="techLavaT3" :descs="[ 'techLavaT3-desc1' ]" itemId="techLavaT3" btnText="button-research" toHide="true" />
                <card-building id="lavaT3Card" name="lavaT3" level="3" :descs="[ 'lavaT3-desc1' ]" itemId="lavaT3" btnText="button-build" />
                <card-building id="techLavaT4Card" name="techLavaT4" :descs="[ 'techLavaT4-desc1' ]" itemId="techLavaT4" btnText="button-research" toHide="true" />
                <card-building id="lavaT4Card" name="lavaT4" level="4" :descs="[ 'lavaT4-desc1' ]" itemId="lavaT4" btnText="button-build" />
                <card-building id="techLavaT5Card" name="techLavaT5" :descs="[ 'techLavaT5-desc1' ]" itemId="techLavaT5" btnText="button-research" toHide="true" />
                <card-building id="lavaT5Card" name="lavaT5" level="5" :descs="[ 'lavaT5-desc1' ]" itemId="lavaT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="lunaritePane" name="lunarite" icon="lunarite.png" itemId="lunarite">
                <card-gain id="lunariteGainCard" :descs="[ 'lunariteGain-desc1' ]" itemId="lunarite" />
                <card-convert id="lunariteConvertCard" :descs="[ 'lunariteConvert-desc1' ]" itemId="lunarite" />
                <card-upgrade id="lunariteUpgradeCard" :descs="[ 'lunariteUpgrade-desc1' ]" itemId="lunarite" />
                <card-building id="lunariteT1Card" name="lunariteT1" level="1" :descs="[ 'lunariteT1-desc1' ]" itemId="lunariteT1" btnText="button-build" />
                <card-building id="techLunariteT2Card" name="techLunariteT2" :descs="[ 'techLunariteT2-desc1' ]" itemId="techLunariteT2" btnText="button-research" toHide="true" />
                <card-building id="lunariteT2Card" name="lunariteT2" level="2" :descs="[ 'lunariteT2-desc1' ]" itemId="lunariteT2" btnText="button-build" />
                <card-building id="techLunariteT3Card" name="techLunariteT3" :descs="[ 'techLunariteT3-desc1' ]" itemId="techLunariteT3" btnText="button-research" toHide="true" />
                <card-building id="lunariteT3Card" name="lunariteT3" level="3" :descs="[ 'lunariteT3-desc1' ]" itemId="lunariteT3" btnText="button-build" />
                <card-building id="techLunariteT4Card" name="techLunariteT4" :descs="[ 'techLunariteT4-desc1' ]" itemId="techLunariteT4" btnText="button-research" toHide="true" />
                <card-building id="lunariteT4Card" name="lunariteT4" level="4" :descs="[ 'lunariteT4-desc1' ]" itemId="lunariteT4" btnText="button-build" />
                <card-building id="techLunariteT5Card" name="techLunariteT5" :descs="[ 'techLunariteT5-desc1' ]" itemId="techLunariteT5" btnText="button-research" toHide="true" />
                <card-building id="lunariteT5Card" name="lunariteT5" level="5" :descs="[ 'lunariteT5-desc1' ]" itemId="lunariteT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="methanePane" name="methane" icon="methane.png" itemId="methane">
                <card-gain id="methaneGainCard" :descs="[ 'methaneGain-desc1' ]" itemId="methane" />
                <card-convert id="methaneConvertCard" :descs="[ 'methaneConvert-desc1' ]" itemId="methane" />
                <card-upgrade id="methaneUpgradeCard" :descs="[ 'methaneUpgrade-desc1' ]" itemId="methane" />
                <card-building id="methaneT1Card" name="methaneT1" level="1" :descs="[ 'methaneT1-desc1' ]" itemId="methaneT1" btnText="button-build" />
                <card-building id="techMethaneT2Card" name="techMethaneT2" :descs="[ 'techMethaneT2-desc1' ]" itemId="techMethaneT2" btnText="button-research" toHide="true" />
                <card-building id="methaneT2Card" name="methaneT2" level="2" :descs="[ 'methaneT2-desc1' ]" itemId="methaneT2" btnText="button-build" />
                <card-building id="techMethaneT3Card" name="techMethaneT3" :descs="[ 'techMethaneT3-desc1' ]" itemId="techMethaneT3" btnText="button-research" toHide="true" />
                <card-building id="methaneT3Card" name="methaneT3" level="3" :descs="[ 'methaneT3-desc1' ]" itemId="methaneT3" btnText="button-build" />
                <card-building id="techMethaneT4Card" name="techMethaneT4" :descs="[ 'techMethaneT4-desc1' ]" itemId="techMethaneT4" btnText="button-research" toHide="true" />
                <card-building id="methaneT4Card" name="methaneT4" level="4" :descs="[ 'methaneT4-desc1' ]" itemId="methaneT4" btnText="button-build" />
                <card-building id="techMethaneT5Card" name="techMethaneT5" :descs="[ 'techMethaneT5-desc1' ]" itemId="techMethaneT5" btnText="button-research" toHide="true" />
                <card-building id="methaneT5Card" name="methaneT5" level="5" :descs="[ 'methaneT5-desc1' ]" itemId="methaneT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="titaniumPane" name="titanium" icon="titanium.png" itemId="titanium">
                <card-gain id="titaniumGainCard" :descs="[ 'titaniumGain-desc1' ]" itemId="titanium" />
                <card-convert id="titaniumConvertCard" :descs="[ 'titaniumConvert-desc1' ]" itemId="titanium" />
                <card-upgrade id="titaniumUpgradeCard" :descs="[ 'titaniumUpgrade-desc1' ]" itemId="titanium" />
                <card-building id="titaniumT1Card" name="titaniumT1" level="1" :descs="[ 'titaniumT1-desc1' ]" itemId="titaniumT1" btnText="button-build" />
                <card-building id="techTitaniumT2Card" name="techTitaniumT2" :descs="[ 'techTitaniumT2-desc1' ]" itemId="techTitaniumT2" btnText="button-research" toHide="true" />
                <card-building id="titaniumT2Card" name="titaniumT2" level="2" :descs="[ 'titaniumT2-desc1' ]" itemId="titaniumT2" btnText="button-build" />
                <card-building id="techTitaniumT3Card" name="techTitaniumT3" :descs="[ 'techTitaniumT3-desc1' ]" itemId="techTitaniumT3" btnText="button-research" toHide="true" />
                <card-building id="titaniumT3Card" name="titaniumT3" level="3" :descs="[ 'titaniumT3-desc1' ]" itemId="titaniumT3" btnText="button-build" />
                <card-building id="techTitaniumT4Card" name="techTitaniumT4" :descs="[ 'techTitaniumT4-desc1' ]" itemId="techTitaniumT4" btnText="button-research" toHide="true" />
                <card-building id="titaniumT4Card" name="titaniumT4" level="4" :descs="[ 'titaniumT4-desc1' ]" itemId="titaniumT4" btnText="button-build" />
                <card-building id="techTitaniumT5Card" name="techTitaniumT5" :descs="[ 'techTitaniumT5-desc1' ]" itemId="techTitaniumT5" btnText="button-research" toHide="true" />
                <card-building id="titaniumT5Card" name="titaniumT5" level="5" :descs="[ 'titaniumT5-desc1' ]" itemId="titaniumT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="goldPane" name="gold" icon="gold.png" itemId="gold">
                <card-gain id="goldGainCard" :descs="[ 'goldGain-desc1' ]" itemId="gold" />
                <card-convert id="goldConvertCard" :descs="[ 'goldConvert-desc1' ]" itemId="gold" />
                <card-upgrade id="goldUpgradeCard" :descs="[ 'goldUpgrade-desc1' ]" itemId="gold" />
                <card-building id="goldT1Card" name="goldT1" level="1" :descs="[ 'goldT1-desc1' ]" itemId="goldT1" btnText="button-build" />
                <card-building id="techGoldT2Card" name="techGoldT2" :descs="[ 'techGoldT2-desc1' ]" itemId="techGoldT2" btnText="button-research" toHide="true" />
                <card-building id="goldT2Card" name="goldT2" level="2" :descs="[ 'goldT2-desc1' ]" itemId="goldT2" btnText="button-build" />
                <card-building id="techGoldT3Card" name="techGoldT3" :descs="[ 'techGoldT3-desc1' ]" itemId="techGoldT3" btnText="button-research" toHide="true" />
                <card-building id="goldT3Card" name="goldT3" level="3" :descs="[ 'goldT3-desc1' ]" itemId="goldT3" btnText="button-build" />
                <card-building id="techGoldT4Card" name="techGoldT4" :descs="[ 'techGoldT4-desc1' ]" itemId="techGoldT4" btnText="button-research" toHide="true" />
                <card-building id="goldT4Card" name="goldT4" level="4" :descs="[ 'goldT4-desc1' ]" itemId="goldT4" btnText="button-build" />
                <card-building id="techGoldT5Card" name="techGoldT5" :descs="[ 'techGoldT5-desc1' ]" itemId="techGoldT5" btnText="button-research" toHide="true" />
                <card-building id="goldT5Card" name="goldT5" level="5" :descs="[ 'goldT5-desc1' ]" itemId="goldT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="silverPane" name="silver" icon="silver.png" itemId="silver">
                <card-gain id="silverGainCard" :descs="[ 'silverGain-desc1' ]" itemId="silver" />
                <card-convert id="silverConvertCard" :descs="[ 'silverConvert-desc1' ]" itemId="silver" />
                <card-upgrade id="silverUpgradeCard" :descs="[ 'silverUpgrade-desc1' ]" itemId="silver" />
                <card-building id="silverT1Card" name="silverT1" level="1" :descs="[ 'silverT1-desc1' ]" itemId="silverT1" btnText="button-build" />
                <card-building id="techSilverT2Card" name="techSilverT2" :descs="[ 'techSilverT2-desc1' ]" itemId="techSilverT2" btnText="button-research" toHide="true" />
                <card-building id="silverT2Card" name="silverT2" level="2" :descs="[ 'silverT2-desc1' ]" itemId="silverT2" btnText="button-build" />
                <card-building id="techSilverT3Card" name="techSilverT3" :descs="[ 'techSilverT3-desc1' ]" itemId="techSilverT3" btnText="button-research" toHide="true" />
                <card-building id="silverT3Card" name="silverT3" level="3" :descs="[ 'silverT3-desc1' ]" itemId="silverT3" btnText="button-build" />
                <card-building id="techSilverT4Card" name="techSilverT4" :descs="[ 'techSilverT4-desc1' ]" itemId="techSilverT4" btnText="button-research" toHide="true" />
                <card-building id="silverT4Card" name="silverT4" level="4" :descs="[ 'silverT4-desc1' ]" itemId="silverT4" btnText="button-build" />
                <card-building id="techSilverT5Card" name="techSilverT5" :descs="[ 'techSilverT5-desc1' ]" itemId="techSilverT5" btnText="button-research" toHide="true" />
                <card-building id="silverT5Card" name="silverT5" level="5" :descs="[ 'silverT5-desc1' ]" itemId="silverT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="hydrogenPane" name="hydrogen" icon="hydrogen.png" itemId="hydrogen">
                <card-gain id="hydrogenGainCard" :descs="[ 'hydrogenGain-desc1' ]" itemId="hydrogen" />
                <card-convert id="hydrogenConvertCard" :descs="[ 'hydrogenConvert-desc1' ]" itemId="hydrogen" />
                <card-upgrade id="hydrogenUpgradeCard" :descs="[ 'hydrogenUpgrade-desc1' ]" itemId="hydrogen" />
                <card-building id="hydrogenT1Card" name="hydrogenT1" level="1" :descs="[ 'hydrogenT1-desc1' ]" itemId="hydrogenT1" btnText="button-build" />
                <card-building id="techHydrogenT2Card" name="techHydrogenT2" :descs="[ 'techHydrogenT2-desc1' ]" itemId="techHydrogenT2" btnText="button-research" toHide="true" />
                <card-building id="hydrogenT2Card" name="hydrogenT2" level="2" :descs="[ 'hydrogenT2-desc1' ]" itemId="hydrogenT2" btnText="button-build" />
                <card-building id="techHydrogenT3Card" name="techHydrogenT3" :descs="[ 'techHydrogenT3-desc1' ]" itemId="techHydrogenT3" btnText="button-research" toHide="true" />
                <card-building id="hydrogenT3Card" name="hydrogenT3" level="3" :descs="[ 'hydrogenT3-desc1' ]" itemId="hydrogenT3" btnText="button-build" />
                <card-building id="techHydrogenT4Card" name="techHydrogenT4" :descs="[ 'techHydrogenT4-desc1' ]" itemId="techHydrogenT4" btnText="button-research" toHide="true" />
                <card-building id="hydrogenT4Card" name="hydrogenT4" level="4" :descs="[ 'hydrogenT4-desc1' ]" itemId="hydrogenT4" btnText="button-build" />
                <card-building id="techHydrogenT5Card" name="techHydrogenT5" :descs="[ 'techHydrogenT5-desc1' ]" itemId="techHydrogenT5" btnText="button-research" toHide="true" />
                <card-building id="hydrogenT5Card" name="hydrogenT5" level="5" :descs="[ 'hydrogenT5-desc1' ]" itemId="hydrogenT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="heliumPane" name="helium" icon="helium.png" itemId="helium">
                <card-gain id="heliumGainCard" :descs="[ 'heliumGain-desc1' ]" itemId="helium" />
                <card-convert id="heliumConvertCard" :descs="[ 'heliumConvert-desc1' ]" itemId="helium" />
                <card-upgrade id="heliumUpgradeCard" :descs="[ 'heliumUpgrade-desc1' ]" itemId="helium" />
                <card-building id="heliumT1Card" name="heliumT1" level="1" :descs="[ 'heliumT1-desc1' ]" itemId="heliumT1" btnText="button-build" />
                <card-building id="techHeliumT2Card" name="techHeliumT2" :descs="[ 'techHeliumT2-desc1' ]" itemId="techHeliumT2" btnText="button-research" toHide="true" />
                <card-building id="heliumT2Card" name="heliumT2" level="2" :descs="[ 'heliumT2-desc1' ]" itemId="heliumT2" btnText="button-build" />
                <card-building id="techHeliumT3Card" name="techHeliumT3" :descs="[ 'techHeliumT3-desc1' ]" itemId="techHeliumT3" btnText="button-research" toHide="true" />
                <card-building id="heliumT3Card" name="heliumT3" level="3" :descs="[ 'heliumT3-desc1' ]" itemId="heliumT3" btnText="button-build" />
                <card-building id="techHeliumT4Card" name="techHeliumT4" :descs="[ 'techHeliumT4-desc1' ]" itemId="techHeliumT4" btnText="button-research" toHide="true" />
                <card-building id="heliumT4Card" name="heliumT4" level="4" :descs="[ 'heliumT4-desc1' ]" itemId="heliumT4" btnText="button-build" />
                <card-building id="techHeliumT5Card" name="techHeliumT5" :descs="[ 'techHeliumT5-desc1' ]" itemId="techHeliumT5" btnText="button-research" toHide="true" />
                <card-building id="heliumT5Card" name="heliumT5" level="5" :descs="[ 'heliumT5-desc1' ]" itemId="heliumT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="icePane" name="ice" icon="ice.png" itemId="ice">
                <card-gain id="iceGainCard" :descs="[ 'iceGain-desc1' ]" itemId="ice" />
                <card-convert id="iceConvertCard" :descs="[ 'iceConvert-desc1' ]" itemId="ice" />
                <card-upgrade id="iceUpgradeCard" :descs="[ 'iceUpgrade-desc1' ]" itemId="ice" />
                <card-building id="iceT1Card" name="iceT1" level="1" :descs="[ 'iceT1-desc1' ]" itemId="iceT1" btnText="button-build" />
                <card-building id="techIceT2Card" name="techIceT2" :descs="[ 'techIceT2-desc1' ]" itemId="techIceT2" btnText="button-research" toHide="true" />
                <card-building id="iceT2Card" name="iceT2" level="2" :descs="[ 'iceT2-desc1' ]" itemId="iceT2" btnText="button-build" />
                <card-building id="techIceT3Card" name="techIceT3" :descs="[ 'techIceT3-desc1' ]" itemId="techIceT3" btnText="button-research" toHide="true" />
                <card-building id="iceT3Card" name="iceT3" level="3" :descs="[ 'iceT3-desc1' ]" itemId="iceT3" btnText="button-build" />
                <card-building id="techIceT4Card" name="techIceT4" :descs="[ 'techIceT4-desc1' ]" itemId="techIceT4" btnText="button-research" toHide="true" />
                <card-building id="iceT4Card" name="iceT4" level="4" :descs="[ 'iceT4-desc1' ]" itemId="iceT4" btnText="button-build" />
                <card-building id="techIceT5Card" name="techIceT5" :descs="[ 'techIceT5-desc1' ]" itemId="techIceT5" btnText="button-research" toHide="true" />
                <card-building id="iceT5Card" name="iceT5" level="5" :descs="[ 'iceT5-desc1' ]" itemId="iceT5" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane-resource id="antimatterPane" name="antimatter" icon="antimatter.png" itemId="antimatter">
                <card-building id="antimatterT1Card" name="antimatterT1" level="1" :descs="[ 'antimatterT1-desc1' ]" itemId="antimatterT1" btnText="button-build" />
            </page-pane-resource>
            
            <page-pane id="productionPane" name="sidebar-item-consumption" icon="production.png">
                <card-production id="energyProdCard" name="energy" icon="energy.png" itemId="energy">
                    <template v-slot:consumers>
                        <line-consumption resId="energy" itemId="plasmaT1" level="T1" res="plasma" />
                        <line-consumption resId="energy" itemId="plasmaT2" level="T2" res="plasma" />
                        <line-consumption resId="energy" itemId="plasmaT3" level="T3" res="plasma" />
                        <line-consumption resId="energy" itemId="plasmaT4" level="T4" res="plasma" />
                        <line-consumption resId="energy" itemId="carbonT2" level="T2" res="carbon" />
                        <line-consumption resId="energy" itemId="carbonT3" level="T3" res="carbon" />
                        <line-consumption resId="energy" itemId="carbonT4" level="T4" res="carbon" />
                        <line-consumption resId="energy" itemId="carbonT5" level="T5" res="carbon" />
                        <line-consumption resId="energy" itemId="oilT2" level="T2" res="oil" />
                        <line-consumption resId="energy" itemId="oilT3" level="T3" res="oil" />
                        <line-consumption resId="energy" itemId="oilT4" level="T4" res="oil" />
                        <line-consumption resId="energy" itemId="oilT5" level="T5" res="oil" />
                        <line-consumption resId="energy" itemId="metalT2" level="T2" res="metal" />
                        <line-consumption resId="energy" itemId="metalT3" level="T3" res="metal" />
                        <line-consumption resId="energy" itemId="metalT4" level="T4" res="metal" />
                        <line-consumption resId="energy" itemId="metalT5" level="T5" res="metal" />
                        <line-consumption resId="energy" itemId="gemT2" level="T2" res="gem" />
                        <line-consumption resId="energy" itemId="gemT3" level="T3" res="gem" />
                        <line-consumption resId="energy" itemId="gemT4" level="T4" res="gem" />
                        <line-consumption resId="energy" itemId="gemT5" level="T5" res="gem" />
                        <line-consumption resId="energy" itemId="woodT2" level="T2" res="wood" />
                        <line-consumption resId="energy" itemId="woodT3" level="T3" res="wood" />
                        <line-consumption resId="energy" itemId="woodT4" level="T4" res="wood" />
                        <line-consumption resId="energy" itemId="woodT5" level="T5" res="wood" />
                        <line-consumption resId="energy" itemId="siliconT2" level="T2" res="silicon" />
                        <line-consumption resId="energy" itemId="siliconT3" level="T3" res="silicon" />
                        <line-consumption resId="energy" itemId="siliconT4" level="T4" res="silicon" />
                        <line-consumption resId="energy" itemId="siliconT5" level="T5" res="silicon" />
                        <line-consumption resId="energy" itemId="uraniumT2" level="T2" res="uranium" />
                        <line-consumption resId="energy" itemId="uraniumT3" level="T3" res="uranium" />
                        <line-consumption resId="energy" itemId="uraniumT4" level="T4" res="uranium" />
                        <line-consumption resId="energy" itemId="uraniumT5" level="T5" res="uranium" />
                        <line-consumption resId="energy" itemId="lavaT2" level="T2" res="lava" />
                        <line-consumption resId="energy" itemId="lavaT3" level="T3" res="lava" />
                        <line-consumption resId="energy" itemId="lavaT4" level="T4" res="lava" />
                        <line-consumption resId="energy" itemId="lavaT5" level="T5" res="lava" />
                        <line-consumption resId="energy" itemId="lunariteT2" level="T2" res="lunarite" />
                        <line-consumption resId="energy" itemId="lunariteT3" level="T3" res="lunarite" />
                        <line-consumption resId="energy" itemId="lunariteT4" level="T4" res="lunarite" />
                        <line-consumption resId="energy" itemId="lunariteT5" level="T5" res="lunarite" />
                        <line-consumption resId="energy" itemId="methaneT2" level="T2" res="methane" />
                        <line-consumption resId="energy" itemId="methaneT3" level="T3" res="methane" />
                        <line-consumption resId="energy" itemId="methaneT4" level="T4" res="methane" />
                        <line-consumption resId="energy" itemId="methaneT5" level="T5" res="methane" />
                        <line-consumption resId="energy" itemId="titaniumT2" level="T2" res="titanium" />
                        <line-consumption resId="energy" itemId="titaniumT3" level="T3" res="titanium" />
                        <line-consumption resId="energy" itemId="titaniumT4" level="T4" res="titanium" />
                        <line-consumption resId="energy" itemId="titaniumT5" level="T5" res="titanium" />
                        <line-consumption resId="energy" itemId="goldT2" level="T2" res="gold" />
                        <line-consumption resId="energy" itemId="goldT3" level="T3" res="gold" />
                        <line-consumption resId="energy" itemId="goldT4" level="T4" res="gold" />
                        <line-consumption resId="energy" itemId="goldT5" level="T5" res="gold" />
                        <line-consumption resId="energy" itemId="silverT2" level="T2" res="silver" />
                        <line-consumption resId="energy" itemId="silverT3" level="T3" res="silver" />
                        <line-consumption resId="energy" itemId="silverT4" level="T4" res="silver" />
                        <line-consumption resId="energy" itemId="silverT5" level="T5" res="silver" />
                        <line-consumption resId="energy" itemId="hydrogenT2" level="T2" res="hydrogen" />
                        <line-consumption resId="energy" itemId="hydrogenT3" level="T3" res="hydrogen" />
                        <line-consumption resId="energy" itemId="hydrogenT4" level="T4" res="hydrogen" />
                        <line-consumption resId="energy" itemId="hydrogenT5" level="T5" res="hydrogen" />
                        <line-consumption resId="energy" itemId="heliumT2" level="T2" res="helium" />
                        <line-consumption resId="energy" itemId="heliumT3" level="T3" res="helium" />
                        <line-consumption resId="energy" itemId="heliumT4" level="T4" res="helium" />
                        <line-consumption resId="energy" itemId="heliumT5" level="T5" res="helium" />
                        <line-consumption resId="energy" itemId="iceT2" level="T2" res="ice" />
                        <line-consumption resId="energy" itemId="iceT3" level="T3" res="ice" />
                        <line-consumption resId="energy" itemId="iceT4" level="T4" res="ice" />
                        <line-consumption resId="energy" itemId="iceT5" level="T5" res="ice" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="energy" itemId="energyT1" level="T1" />
                        <line-production resId="energy" itemId="energyT2" level="T2" />
                        <line-production resId="energy" itemId="energyT3" level="T3" />
                        <line-production resId="energy" itemId="energyT4" level="T4" />
                        <line-production resId="energy" itemId="energyT5" level="T5" />
                        <line-production resId="energy" itemId="energyT6" level="T6" />
                        <line-production resId="energy" itemId="dysonT1" level="T1" />
                        <line-production resId="energy" itemId="dysonT2" level="T2" />
                        <line-production resId="energy" itemId="dysonT3" level="T3" />
                    </template>
                </card-production>
                <card-production id="plasmaProdCard" name="plasma" icon="plasma.png" itemId="plasma">
                    <template v-slot:consumers>
                        <line-consumption resId="plasma" itemId="meteoriteT1" level="T1" res="meteorite" />
                        <line-consumption resId="plasma" itemId="meteoriteT2" level="T2" res="meteorite" />
                        <line-consumption resId="plasma" itemId="meteoriteT3" level="T3" res="meteorite" />
                        <line-consumption resId="plasma" itemId="meteoriteT4" level="T4" res="meteorite" />
                        <line-consumption resId="plasma" itemId="carbonT4" level="T4" res="carbon" />
                        <line-consumption resId="plasma" itemId="antimatterT1" level="T1" res="antimatter" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="plasma" itemId="plasmaT1" level="T1" />
                        <line-production resId="plasma" itemId="plasmaT2" level="T2" />
                        <line-production resId="plasma" itemId="plasmaT3" level="T3" />
                        <line-production resId="plasma" itemId="plasmaT4" level="T4" />
                    </template>
                </card-production>
                <card-production id="meteoriteProdCard" name="meteorite" icon="meteorite.png" itemId="meteorite">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="meteorite" itemId="meteoriteT1" level="T1" />
                        <line-production resId="meteorite" itemId="meteoriteT2" level="T2" />
                        <line-production resId="meteorite" itemId="meteoriteT3" level="T3" />
                        <line-production resId="meteorite" itemId="meteoriteT4" level="T4" />
                    </template>
                </card-production>
                <card-production id="carbonProdCard" name="carbon" icon="carbon.png" itemId="carbon">
                    <template v-slot:consumers>
                        <line-consumption resId="carbon" itemId="energyT2" level="T2" res="energy" />
                        <line-consumption resId="carbon" itemId="fuelT1" level="T1" res="fuel" />
                        <line-consumption resId="carbon" itemId="fuelT2" level="T2" res="fuel" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="carbon" itemId="carbonT1" level="T1" />
                        <line-production resId="carbon" itemId="carbonT2" level="T2" />
                        <line-production resId="carbon" itemId="carbonT3" level="T3" />
                        <line-production resId="carbon" itemId="carbonT4" level="T4" />
                        <line-production resId="carbon" itemId="carbonT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="fuelProdCard" name="fuel" icon="fuel.png" itemId="fuel">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="fuel" itemId="fuelT1" level="T1" />
                        <line-production resId="fuel" itemId="fuelT2" level="T2" />
                        <line-production resId="fuel" itemId="fuelT3" level="T3" />
                    </template>
                </card-production>
                <card-production id="antimatterProdCard" name="antimatter" icon="antimatter.png" itemId="antimatter">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="antimatter" itemId="antimatterT1" level="T1" />
                    </template>
                </card-production>
                <card-production id="scienceProdCard" name="science" icon="science.png" itemId="science">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="science" itemId="scienceT1" level="T1" />
                        <line-production resId="science" itemId="scienceT2" level="T2" />
                        <line-production resId="science" itemId="scienceT3" level="T3" />
                        <line-production resId="science" itemId="scienceT4" level="T4" />
                        <line-production resId="science" itemId="scienceT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="oilProdCard" name="oil" icon="oil.png" itemId="oil">
                    <template v-slot:consumers>
                        <line-consumption resId="oil" itemId="fuelT1" level="T1" res="fuel" />
                        <line-consumption resId="oil" itemId="fuelT2" level="T2" res="fuel" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="oil" itemId="oilT1" level="T1" />
                        <line-production resId="oil" itemId="oilT2" level="T2" />
                        <line-production resId="oil" itemId="oilT3" level="T3" />
                        <line-production resId="oil" itemId="oilT4" level="T4" />
                        <line-production resId="oil" itemId="oilT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="metalProdCard" name="metal" icon="metal.png" itemId="metal">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="metal" itemId="metalT1" level="T1" />
                        <line-production resId="metal" itemId="metalT2" level="T2" />
                        <line-production resId="metal" itemId="metalT3" level="T3" />
                        <line-production resId="metal" itemId="metalT4" level="T4" />
                        <line-production resId="metal" itemId="metalT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="gemProdCard" name="gem" icon="gem.png" itemId="gem">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="gem" itemId="gemT1" level="T1" />
                        <line-production resId="gem" itemId="gemT2" level="T2" />
                        <line-production resId="gem" itemId="gemT3" level="T3" />
                        <line-production resId="gem" itemId="gemT4" level="T4" />
                        <line-production resId="gem" itemId="gemT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="woodProdCard" name="wood" icon="wood.png" itemId="wood">
                    <template v-slot:consumers>
                        <line-consumption resId="wood" itemId="carbonT1" level="T1" res="carbon" />
                        <line-consumption resId="wood" itemId="carbonT2" level="T2" res="carbon" />
                        <line-consumption resId="wood" itemId="carbonT3" level="T3" res="carbon" />
                        <line-consumption resId="wood" itemId="carbonT4" level="T4" res="carbon" />
                        <line-consumption resId="wood" itemId="carbonT5" level="T5" res="carbon" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="wood" itemId="woodT1" level="T1" />
                        <line-production resId="wood" itemId="woodT2" level="T2" />
                        <line-production resId="wood" itemId="woodT3" level="T3" />
                        <line-production resId="wood" itemId="woodT4" level="T4" />
                        <line-production resId="wood" itemId="woodT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="siliconProdCard" name="silicon" icon="silicon.png" itemId="silicon">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="silicon" itemId="siliconT1" level="T1" />
                        <line-production resId="silicon" itemId="siliconT2" level="T2" />
                        <line-production resId="silicon" itemId="siliconT3" level="T3" />
                        <line-production resId="silicon" itemId="siliconT4" level="T4" />
                        <line-production resId="silicon" itemId="siliconT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="uraniumProdCard" name="uranium" icon="uranium.png" itemId="uranium">
                    <template v-slot:consumers>
                        <line-consumption resId="uranium" itemId="energyT4" level="T4" res="energy" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="uranium" itemId="uraniumT1" level="T1" />
                        <line-production resId="uranium" itemId="uraniumT2" level="T2" />
                        <line-production resId="uranium" itemId="uraniumT3" level="T3" />
                        <line-production resId="uranium" itemId="uraniumT4" level="T4" />
                        <line-production resId="uranium" itemId="uraniumT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="lavaProdCard" name="lava" icon="lava.png" itemId="lava">
                    <template v-slot:consumers>
                        <line-consumption resId="lava" itemId="energyT5" level="T5" res="energy" />
                        <line-consumption resId="lava" itemId="carbonT3" level="T3" res="carbon" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="lava" itemId="lavaT1" level="T1" />
                        <line-production resId="lava" itemId="lavaT2" level="T2" />
                        <line-production resId="lava" itemId="lavaT3" level="T3" />
                        <line-production resId="lava" itemId="lavaT4" level="T4" />
                        <line-production resId="lava" itemId="lavaT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="lunariteProdCard" name="lunarite" icon="lunarite.png" itemId="lunarite">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="lunarite" itemId="lunariteT1" level="T1" />
                        <line-production resId="lunarite" itemId="lunariteT2" level="T2" />
                        <line-production resId="lunarite" itemId="lunariteT3" level="T3" />
                        <line-production resId="lunarite" itemId="lunariteT4" level="T4" />
                        <line-production resId="lunarite" itemId="lunariteT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="methaneProdCard" name="methane" icon="methane.png" itemId="methane">
                    <template v-slot:consumers>
                        <line-consumption resId="methane" itemId="energyT3" level="T3" res="energy" />
                        <line-consumption resId="methane" itemId="fuelT3" level="T3" res="fuel" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="methane" itemId="methaneT1" level="T1" />
                        <line-production resId="methane" itemId="methaneT2" level="T2" />
                        <line-production resId="methane" itemId="methaneT3" level="T3" />
                        <line-production resId="methane" itemId="methaneT4" level="T4" />
                        <line-production resId="methane" itemId="methaneT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="titaniumProdCard" name="titanium" icon="titanium.png" itemId="titanium">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="titanium" itemId="titaniumT1" level="T1" />
                        <line-production resId="titanium" itemId="titaniumT2" level="T2" />
                        <line-production resId="titanium" itemId="titaniumT3" level="T3" />
                        <line-production resId="titanium" itemId="titaniumT4" level="T4" />
                        <line-production resId="titanium" itemId="titaniumT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="goldProdCard" name="gold" icon="gold.png" itemId="gold">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="gold" itemId="goldT1" level="T1" />
                        <line-production resId="gold" itemId="goldT2" level="T2" />
                        <line-production resId="gold" itemId="goldT3" level="T3" />
                        <line-production resId="gold" itemId="goldT4" level="T4" />
                        <line-production resId="gold" itemId="goldT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="silverProdCard" name="silver" icon="silver.png" itemId="silver">
                    <template v-slot:consumers>
                    </template>
                    <template v-slot:producers>
                        <line-production resId="silver" itemId="silverT1" level="T1" />
                        <line-production resId="silver" itemId="silverT2" level="T2" />
                        <line-production resId="silver" itemId="silverT3" level="T3" />
                        <line-production resId="silver" itemId="silverT4" level="T4" />
                        <line-production resId="silver" itemId="silverT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="hydrogenProdCard" name="hydrogen" icon="hydrogen.png" itemId="hydrogen">
                    <template v-slot:consumers>
                        <line-consumption resId="hydrogen" itemId="energyT6" level="T6" res="energy" />
                        <line-consumption resId="hydrogen" itemId="plasmaT1" level="T1" res="plasma" />
                        <line-consumption resId="hydrogen" itemId="plasmaT3" level="T3" res="plasma" />
                        <line-consumption resId="hydrogen" itemId="plasmaT4" level="T4" res="plasma" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="hydrogen" itemId="hydrogenT1" level="T1" />
                        <line-production resId="hydrogen" itemId="hydrogenT2" level="T2" />
                        <line-production resId="hydrogen" itemId="hydrogenT3" level="T3" />
                        <line-production resId="hydrogen" itemId="hydrogenT4" level="T4" />
                        <line-production resId="hydrogen" itemId="hydrogenT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="heliumProdCard" name="helium" icon="helium.png" itemId="helium">
                    <template v-slot:consumers>
                        <line-consumption resId="helium" itemId="energyT6" level="T6" res="energy" />
                        <line-consumption resId="methane" itemId="plasmaT2" level="T2" res="plasma" />
                        <line-consumption resId="methane" itemId="plasmaT3" level="T3" res="plasma" />
                        <line-consumption resId="methane" itemId="plasmaT4" level="T4" res="plasma" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="helium" itemId="heliumT1" level="T1" />
                        <line-production resId="helium" itemId="heliumT2" level="T2" />
                        <line-production resId="helium" itemId="heliumT3" level="T3" />
                        <line-production resId="helium" itemId="heliumT4" level="T4" />
                        <line-production resId="helium" itemId="heliumT5" level="T5" />
                    </template>
                </card-production>
                <card-production id="iceProdCard" name="ice" icon="ice.png" itemId="ice">
                    <template v-slot:consumers>
                        <line-consumption resId="ice" itemId="antimatterT1" level="T1" res="antimatter" />
                    </template>
                    <template v-slot:producers>
                        <line-production resId="ice" itemId="iceT1" level="T1" />
                        <line-production resId="ice" itemId="iceT2" level="T2" />
                        <line-production resId="ice" itemId="iceT3" level="T3" />
                        <line-production resId="ice" itemId="iceT4" level="T4" />
                        <line-production resId="ice" itemId="iceT5" level="T5" />
                    </template>
                </card-production>
            </page-pane>
            
            <page-pane id="achievementsPane" name="sidebar-item-achievements" icon="achievements.png">
                <card-achievement name="energy" icon="energy.png" unlockerId="energy" :achs="['achEnergy', 'achEnergyT1', 'achEnergyT2', 'achEnergyT3', 'achEnergyT4', 'achEnergyT5', 'achEnergyT6']">
                    <line-ach icon="true" itemId="achEnergy" />
                    <line-ach name="T1" itemId="achEnergyT1" />
                    <line-ach name="T2" itemId="achEnergyT2" />
                    <line-ach name="T3" itemId="achEnergyT3" />
                    <line-ach name="T4" itemId="achEnergyT4" />
                    <line-ach name="T5" itemId="achEnergyT5" />
                    <line-ach name="T6" itemId="achEnergyT6" />
                </card-achievement>
                <card-achievement name="plasma" icon="plasma.png" unlockerId="plasma" :achs="['achPlasma', 'achPlasmaT1', 'achPlasmaT2', 'achPlasmaT3', 'achPlasmaT4']">
                    <line-ach icon="true" itemId="achPlasma" />
                    <line-ach name="T1" itemId="achPlasmaT1" />
                    <line-ach name="T2" itemId="achPlasmaT2" />
                    <line-ach name="T3" itemId="achPlasmaT3" />
                    <line-ach name="T4" itemId="achPlasmaT4" />
                </card-achievement>
                <card-achievement name="meteorite" icon="meteorite.png" unlockerId="meteorite" :achs="['achMeteorite', 'achMeteoriteT1', 'achMeteoriteT2', 'achMeteoriteT3', 'achMeteoriteT4']">
                    <line-ach icon="true" itemId="achMeteorite" />
                    <line-ach name="T1" itemId="achMeteoriteT1" />
                    <line-ach name="T2" itemId="achMeteoriteT2" />
                    <line-ach name="T3" itemId="achMeteoriteT3" />
                    <line-ach name="T4" itemId="achMeteoriteT4" />
                </card-achievement>
                <card-achievement name="carbon" icon="carbon.png" unlockerId="carbon" :achs="['achCarbon', 'achCarbonT1', 'achCarbonT2', 'achCarbonT3', 'achCarbonT4', 'achCarbonT5']">
                    <line-ach icon="true" itemId="achCarbon" />
                    <line-ach name="T1" itemId="achCarbonT1" />
                    <line-ach name="T2" itemId="achCarbonT2" />
                    <line-ach name="T3" itemId="achCarbonT3" />
                    <line-ach name="T4" itemId="achCarbonT4" />
                    <line-ach name="T5" itemId="achCarbonT5" />
                </card-achievement>
                <card-achievement name="science" icon="science.png" unlockerId="science" :achs="['achScience', 'achScienceT1', 'achScienceT2', 'achScienceT3', 'achScienceT4', 'achScienceT5']">
                    <line-ach icon="true" itemId="achScience" />
                    <line-ach name="T1" itemId="achScienceT1" />
                    <line-ach name="T2" itemId="achScienceT2" />
                    <line-ach name="T3" itemId="achScienceT3" />
                    <line-ach name="T4" itemId="achScienceT4" />
                    <line-ach name="T5" itemId="achScienceT5" />
                </card-achievement>
                <card-achievement name="oil" icon="oil.png" unlockerId="oil" :achs="['achOil', 'achOilT1', 'achOilT2', 'achOilT3', 'achOilT4', 'achOilT5']">
                    <line-ach icon="true" itemId="achOil" />
                    <line-ach name="T1" itemId="achOilT1" />
                    <line-ach name="T2" itemId="achOilT2" />
                    <line-ach name="T3" itemId="achOilT3" />
                    <line-ach name="T4" itemId="achOilT4" />
                    <line-ach name="T5" itemId="achOilT5" />
                </card-achievement>
                <card-achievement name="fuel" icon="fuel.png" unlockerId="fuel" :achs="['achFuel', 'achFuelT1', 'achFuelT2', 'achFuelT3']">
                    <line-ach icon="true" itemId="achFuel" />
                    <line-ach name="T1" itemId="achFuelT1" />
                    <line-ach name="T2" itemId="achFuelT2" />
                    <line-ach name="T3" itemId="achFuelT3" />
                </card-achievement>
                <card-achievement name="metal" icon="metal.png" unlockerId="metal" :achs="['achMetal', 'achMetalT1', 'achMetalT2', 'achMetalT3', 'achMetalT4', 'achMetalT5']">
                    <line-ach icon="true" itemId="achMetal" />
                    <line-ach name="T1" itemId="achMetalT1" />
                    <line-ach name="T2" itemId="achMetalT2" />
                    <line-ach name="T3" itemId="achMetalT3" />
                    <line-ach name="T4" itemId="achMetalT4" />
                    <line-ach name="T5" itemId="achMetalT5" />
                </card-achievement>
                <card-achievement name="gem" icon="gem.png" unlockerId="gem" :achs="['achGem', 'achGemT1', 'achGemT2', 'achGemT3', 'achGemT4', 'achGemT5']">
                    <line-ach icon="true" itemId="achGem" />
                    <line-ach name="T1" itemId="achGemT1" />
                    <line-ach name="T2" itemId="achGemT2" />
                    <line-ach name="T3" itemId="achGemT3" />
                    <line-ach name="T4" itemId="achGemT4" />
                    <line-ach name="T5" itemId="achGemT5" />
                </card-achievement>
                <card-achievement name="wood" icon="wood.png" unlockerId="wood" :achs="['achWood', 'achWoodT1', 'achWoodT2', 'achWoodT3', 'achWoodT4', 'achWoodT5']">
                    <line-ach icon="true" itemId="achWood" />
                    <line-ach name="T1" itemId="achWoodT1" />
                    <line-ach name="T2" itemId="achWoodT2" />
                    <line-ach name="T3" itemId="achWoodT3" />
                    <line-ach name="T4" itemId="achWoodT4" />
                    <line-ach name="T5" itemId="achWoodT5" />
                </card-achievement>
                <card-achievement name="silicon" icon="silicon.png" unlockerId="silicon" :achs="['achSilicon', 'achSiliconT1', 'achSiliconT2', 'achSiliconT3', 'achSiliconT4', 'achSiliconT5']">
                    <line-ach icon="true" itemId="achSilicon" />
                    <line-ach name="T1" itemId="achSiliconT1" />
                    <line-ach name="T2" itemId="achSiliconT2" />
                    <line-ach name="T3" itemId="achSiliconT3" />
                    <line-ach name="T4" itemId="achSiliconT4" />
                    <line-ach name="T5" itemId="achSiliconT5" />
                </card-achievement>
                <card-achievement name="uranium" icon="uranium.png" unlockerId="uranium" :achs="['achUranium', 'achUraniumT1', 'achUraniumT2', 'achUraniumT3', 'achUraniumT4', 'achUraniumT5']">
                    <line-ach icon="true" itemId="achUranium" />
                    <line-ach name="T1" itemId="achUraniumT1" />
                    <line-ach name="T2" itemId="achUraniumT2" />
                    <line-ach name="T3" itemId="achUraniumT3" />
                    <line-ach name="T4" itemId="achUraniumT4" />
                    <line-ach name="T5" itemId="achUraniumT5" />
                </card-achievement>
                <card-achievement name="lava" icon="lava.png" unlockerId="lava" :achs="['achLava', 'achLavaT1', 'achLavaT2', 'achLavaT3', 'achLavaT4', 'achLavaT5']">
                    <line-ach icon="true" itemId="achLava" />
                    <line-ach name="T1" itemId="achLavaT1" />
                    <line-ach name="T2" itemId="achLavaT2" />
                    <line-ach name="T3" itemId="achLavaT3" />
                    <line-ach name="T4" itemId="achLavaT4" />
                    <line-ach name="T5" itemId="achLavaT5" />
                </card-achievement>
                <card-achievement name="lunarite" icon="lunarite.png" unlockerId="lunarite" :achs="['achLunarite', 'achLunariteT1', 'achLunariteT2', 'achLunariteT3', 'achLunariteT4', 'achLunariteT5']">
                    <line-ach icon="true" itemId="achLunarite" />
                    <line-ach name="T1" itemId="achLunariteT1" />
                    <line-ach name="T2" itemId="achLunariteT2" />
                    <line-ach name="T3" itemId="achLunariteT3" />
                    <line-ach name="T4" itemId="achLunariteT4" />
                    <line-ach name="T5" itemId="achLunariteT5" />
                </card-achievement>
                <card-achievement name="methane" icon="methane.png" unlockerId="methane" :achs="['achMethane', 'achMethaneT1', 'achMethaneT2', 'achMethaneT3', 'achMethaneT4', 'achMethaneT5']">
                    <line-ach icon="true" itemId="achMethane" />
                    <line-ach name="T1" itemId="achMethaneT1" />
                    <line-ach name="T2" itemId="achMethaneT2" />
                    <line-ach name="T3" itemId="achMethaneT3" />
                    <line-ach name="T4" itemId="achMethaneT4" />
                    <line-ach name="T5" itemId="achMethaneT5" />
                </card-achievement>
                <card-achievement name="titanium" icon="titanium.png" unlockerId="titanium" :achs="['achTitanium', 'achTitaniumT1', 'achTitaniumT2', 'achTitaniumT3', 'achTitaniumT4', 'achTitaniumT5']">
                    <line-ach icon="true" itemId="achTitanium" />
                    <line-ach name="T1" itemId="achTitaniumT1" />
                    <line-ach name="T2" itemId="achTitaniumT2" />
                    <line-ach name="T3" itemId="achTitaniumT3" />
                    <line-ach name="T4" itemId="achTitaniumT4" />
                    <line-ach name="T5" itemId="achTitaniumT5" />
                </card-achievement>
                <card-achievement name="gold" icon="gold.png" unlockerId="gold" :achs="['achGold', 'achGoldT1', 'achGoldT2', 'achGoldT3', 'achGoldT4', 'achGoldT5']">
                    <line-ach icon="true" itemId="achGold" />
                    <line-ach name="T1" itemId="achGoldT1" />
                    <line-ach name="T2" itemId="achGoldT2" />
                    <line-ach name="T3" itemId="achGoldT3" />
                    <line-ach name="T4" itemId="achGoldT4" />
                    <line-ach name="T5" itemId="achGoldT5" />
                </card-achievement>
                <card-achievement name="silver" icon="silver.png" unlockerId="silver" :achs="['achSilver', 'achSilverT1', 'achSilverT2', 'achSilverT3', 'achSilverT4', 'achSilverT5']">
                    <line-ach icon="true" itemId="achSilver" />
                    <line-ach name="T1" itemId="achSilverT1" />
                    <line-ach name="T2" itemId="achSilverT2" />
                    <line-ach name="T3" itemId="achSilverT3" />
                    <line-ach name="T4" itemId="achSilverT4" />
                    <line-ach name="T5" itemId="achSilverT5" />
                </card-achievement>
                <card-achievement name="hydrogen" icon="hydrogen.png" unlockerId="hydrogen" :achs="['achHydrogen', 'achHydrogenT1', 'achHydrogenT2', 'achHydrogenT3', 'achHydrogenT4', 'achHydrogenT5']">
                    <line-ach icon="true" itemId="achHydrogen" />
                    <line-ach name="T1" itemId="achHydrogenT1" />
                    <line-ach name="T2" itemId="achHydrogenT2" />
                    <line-ach name="T3" itemId="achHydrogenT3" />
                    <line-ach name="T4" itemId="achHydrogenT4" />
                    <line-ach name="T5" itemId="achHydrogenT5" />
                </card-achievement>
                <card-achievement name="helium" icon="helium.png" unlockerId="helium" :achs="['achHelium', 'achHeliumT1', 'achHeliumT2', 'achHeliumT3', 'achHeliumT4', 'achHeliumT5']">
                    <line-ach icon="true" itemId="achHelium" />
                    <line-ach name="T1" itemId="achHeliumT1" />
                    <line-ach name="T2" itemId="achHeliumT2" />
                    <line-ach name="T3" itemId="achHeliumT3" />
                    <line-ach name="T4" itemId="achHeliumT4" />
                    <line-ach name="T5" itemId="achHeliumT5" />
                </card-achievement>
                <card-achievement name="ice" icon="ice.png" unlockerId="ice" :achs="['achIce', 'achIceT1', 'achIceT2', 'achIceT3', 'achIceT4', 'achIceT5']">
                    <line-ach icon="true" itemId="achIce" />
                    <line-ach name="T1" itemId="achIceT1" />
                    <line-ach name="T2" itemId="achIceT2" />
                    <line-ach name="T3" itemId="achIceT3" />
                    <line-ach name="T4" itemId="achIceT4" />
                    <line-ach name="T5" itemId="achIceT5" />
                </card-achievement>
                <card-achievement name="antimatter" icon="antimatter.png" unlockerId="antimatter" :achs="['achAntimatter', 'achAntimatterT1']">
                    <line-ach icon="true" itemId="achAntimatter" />
                    <line-ach name="T1" itemId="achAntimatterT1" />
                </card-achievement>
            </page-pane>
            
            <page-pane id="technologiesPane" name="sidebar-item-technologies" icon="technologies.png">
                <template v-slot:titleBar>
                    <div class="col-auto d-flex align-items-center">
                        <img :src="require(`../assets/icons/science.png`).default" width="14" height="14" :alt="$t('science')" />
                    </div>
                    <div class="col-auto">
                        <item-count itemId="science" />
                    </div>
                </template>
                <card id="scienceBoostsCard" name="scienceBoostsCardTitle">
                    <template v-slot:header>
                        <line-science-boost-count />
                    </template>
                    <template v-slot:col-1>
                        <div class="col">
                            <div class="row row-cols-1 g-2">
                                <line-science-boost itemId="scienceBoostEnergy" icon="energy.png" name="energy" />
                                <line-science-boost itemId="scienceBoostPlasma" icon="plasma.png" name="plasma" />
                                <line-science-boost itemId="scienceBoostMeteorite" icon="meteorite.png" name="meteorite" />
                                <line-science-boost itemId="scienceBoostCarbon" icon="carbon.png" name="carbon" />
                                <line-science-boost itemId="scienceBoostFuel" icon="fuel.png" name="fuel" />
                                <line-science-boost itemId="scienceBoostScience" icon="science.png" name="science" />
                                <line-science-boost itemId="scienceBoostOil" icon="oil.png" name="oil" />
                                <line-science-boost itemId="scienceBoostMetal" icon="metal.png" name="metal" />
                                <line-science-boost itemId="scienceBoostGem" icon="gem.png" name="gem" />
                                <line-science-boost itemId="scienceBoostWood" icon="wood.png" name="wood" />
                                <line-science-boost itemId="scienceBoostSilicon" icon="silicon.png" name="silicon" />
                            </div>
                        </div>
                    </template>
                    <template v-slot:col-2>
                        <div class="col">
                            <div class="row row-cols-1 g-2">
                                <line-science-boost itemId="scienceBoostUranium" icon="uranium.png" name="uranium" />
                                <line-science-boost itemId="scienceBoostLava" icon="lava.png" name="lava" />
                                <line-science-boost itemId="scienceBoostLunarite" icon="lunarite.png" name="lunarite" />
                                <line-science-boost itemId="scienceBoostMethane" icon="methane.png" name="methane" />
                                <line-science-boost itemId="scienceBoostTitanium" icon="titanium.png" name="titanium" />
                                <line-science-boost itemId="scienceBoostGold" icon="gold.png" name="gold" />
                                <line-science-boost itemId="scienceBoostSilver" icon="silver.png" name="silver" />
                                <line-science-boost itemId="scienceBoostHydrogen" icon="hydrogen.png" name="hydrogen" />
                                <line-science-boost itemId="scienceBoostHelium" icon="helium.png" name="helium" />
                                <line-science-boost itemId="scienceBoostIce" icon="ice.png" name="ice" />
                                <line-science-boost itemId="scienceBoostAntimatter" icon="antimatter.png" name="antimatter" />
                            </div>
                        </div>
                    </template>
                </card>
                <card id="technologiesCard" name="technologiesCardTitle" body="true">
                    <template v-slot:body>
                        <div class="col">
                            <div class="row row-cols-2 gy-2 gx-3">
                                <line-technology itemId="techPlasmaT2" level="T2" name="plasma" />
                                <line-technology itemId="techMeteoriteT2" level="T2" name="meteorite" />
                                <line-technology itemId="techCarbonT2" level="T2" name="carbon" />
                                <line-technology itemId="techFuelT2" level="T2" name="fuel" />
                                <line-technology itemId="techScienceT2" level="T2" name="science" />
                                <line-technology itemId="techOilT2" level="T2" name="oil" />
                                <line-technology itemId="techMetalT2" level="T2" name="metal" />
                                <line-technology itemId="techGemT2" level="T2" name="gem" />
                                <line-technology itemId="techWoodT2" level="T2" name="wood" />
                                <line-technology itemId="techSiliconT2" level="T2" name="silicon" />
                                <line-technology itemId="techUraniumT2" level="T2" name="uranium" />
                                <line-technology itemId="techLavaT2" level="T2" name="lava" />
                                <line-technology itemId="techLunariteT2" level="T2" name="lunarite" />
                                <line-technology itemId="techMethaneT2" level="T2" name="methane" />
                                <line-technology itemId="techTitaniumT2" level="T2" name="titanium" />
                                <line-technology itemId="techGoldT2" level="T2" name="gold" />
                                <line-technology itemId="techSilverT2" level="T2" name="silver" />
                                <line-technology itemId="techHydrogenT2" level="T2" name="hydrogen" />
                                <line-technology itemId="techHeliumT2" level="T2" name="helium" />
                                <line-technology itemId="techIceT2" level="T2" name="ice" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="row row-cols-2 gy-2 gx-3">
                                <line-technology itemId="techPlasmaT3" level="T3" name="plasma" />
                                <line-technology itemId="techMeteoriteT3" level="T3" name="meteorite" />
                                <line-technology itemId="techCarbonT3" level="T3" name="carbon" />
                                <line-technology itemId="techFuelT3" level="T3" name="fuel" />
                                <line-technology itemId="techScienceT3" level="T3" name="science" />
                                <line-technology itemId="techOilT3" level="T3" name="oil" />
                                <line-technology itemId="techMetalT3" level="T3" name="metal" />
                                <line-technology itemId="techGemT3" level="T3" name="gem" />
                                <line-technology itemId="techWoodT3" level="T3" name="wood" />
                                <line-technology itemId="techSiliconT3" level="T3" name="silicon" />
                                <line-technology itemId="techUraniumT3" level="T3" name="uranium" />
                                <line-technology itemId="techLavaT3" level="T3" name="lava" />
                                <line-technology itemId="techLunariteT3" level="T3" name="lunarite" />
                                <line-technology itemId="techMethaneT3" level="T3" name="methane" />
                                <line-technology itemId="techTitaniumT3" level="T3" name="titanium" />
                                <line-technology itemId="techGoldT3" level="T3" name="gold" />
                                <line-technology itemId="techSilverT3" level="T3" name="silver" />
                                <line-technology itemId="techHydrogenT3" level="T3" name="hydrogen" />
                                <line-technology itemId="techHeliumT3" level="T3" name="helium" />
                                <line-technology itemId="techIceT3" level="T3" name="ice" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="row row-cols-2 gy-2 gx-3">
                                <line-technology itemId="techPlasmaT4" level="T4" name="plasma" />
                                <line-technology itemId="techCarbonT4" level="T4" name="carbon" />
                                <line-technology itemId="techMeteoriteT4" level="T4" name="meteorite" />
                                <line-technology itemId="techScienceT4" level="T4" name="science" />
                                <line-technology itemId="techOilT4" level="T4" name="oil" />
                                <line-technology itemId="techMetalT4" level="T4" name="metal" />
                                <line-technology itemId="techGemT4" level="T4" name="gem" />
                                <line-technology itemId="techWoodT4" level="T4" name="wood" />
                                <line-technology itemId="techSiliconT4" level="T4" name="silicon" />
                                <line-technology itemId="techUraniumT4" level="T4" name="uranium" />
                                <line-technology itemId="techLavaT4" level="T4" name="lava" />
                                <line-technology itemId="techLunariteT4" level="T4" name="lunarite" />
                                <line-technology itemId="techMethaneT4" level="T4" name="methane" />
                                <line-technology itemId="techTitaniumT4" level="T4" name="titanium" />
                                <line-technology itemId="techGoldT4" level="T4" name="gold" />
                                <line-technology itemId="techSilverT4" level="T4" name="silver" />
                                <line-technology itemId="techHydrogenT4" level="T4" name="hydrogen" />
                                <line-technology itemId="techHeliumT4" level="T4" name="helium" />
                                <line-technology itemId="techIceT4" level="T4" name="ice" />
                            </div>
                        </div>
                        <div class="col">
                            <div class="row row-cols-2 gy-2 gx-3">
                                <line-technology itemId="techCarbonT5" level="T5" name="carbon" />
                                <line-technology itemId="techScienceT5" level="T5" name="science" />
                                <line-technology itemId="techOilT5" level="T5" name="oil" />
                                <line-technology itemId="techMetalT5" level="T5" name="metal" />
                                <line-technology itemId="techGemT5" level="T5" name="gem" />
                                <line-technology itemId="techWoodT5" level="T5" name="wood" />
                                <line-technology itemId="techSiliconT5" level="T5" name="silicon" />
                                <line-technology itemId="techUraniumT5" level="T5" name="uranium" />
                                <line-technology itemId="techLavaT5" level="T5" name="lava" />
                                <line-technology itemId="techLunariteT5" level="T5" name="lunarite" />
                                <line-technology itemId="techMethaneT5" level="T5" name="methane" />
                                <line-technology itemId="techTitaniumT5" level="T5" name="titanium" />
                                <line-technology itemId="techGoldT5" level="T5" name="gold" />
                                <line-technology itemId="techSilverT5" level="T5" name="silver" />
                                <line-technology itemId="techHydrogenT5" level="T5" name="hydrogen" />
                                <line-technology itemId="techHeliumT5" level="T5" name="helium" />
                                <line-technology itemId="techIceT5" level="T5" name="ice" />
                            </div>
                        </div>
                    </template>
                </card>
            </page-pane>

            <page-pane id="emcPane" name="sidebar-item-emc" icon="emc.png">
                <card-emc name="meteorite" icon="meteorite.png" itemId="meteorite" />
                <card-emc name="carbon" icon="carbon.png" itemId="carbon" />
                <card-emc name="oil" icon="oil.png" itemId="oil" />
                <card-emc name="metal" icon="metal.png" itemId="metal" />
                <card-emc name="gem" icon="gem.png" itemId="gem" />
                <card-emc name="wood" icon="wood.png" itemId="wood" />
                <card-emc name="silicon" icon="silicon.png" itemId="silicon" />
                <card-emc name="uranium" icon="uranium.png" itemId="uranium" />
                <card-emc name="lava" icon="lava.png" itemId="lava" />
                <card-emc name="lunarite" icon="lunarite.png" itemId="lunarite" />
                <card-emc name="methane" icon="methane.png" itemId="methane" />
                <card-emc name="titanium" icon="titanium.png" itemId="titanium" />
                <card-emc name="gold" icon="gold.png" itemId="gold" />
                <card-emc name="silver" icon="silver.png" itemId="silver" />
                <card-emc name="hydrogen" icon="hydrogen.png" itemId="hydrogen" />
                <card-emc name="helium" icon="helium.png" itemId="helium" />
                <card-emc name="ice" icon="ice.png" itemId="ice" />
            </page-pane>
            
            <page-pane id="radarPane" name="sidebar-item-radar" icon="radar.png">
                <template v-slot:titleBar>
                    <div class="col-auto">
                        <span class="text-light">{{ getRadarRange }}</span>
                        <small class="text-normal ms-1">LY</small>
                    </div>
                </template>
                <card-building id="radarT1Card" name="radarT1" :descs="[ 'radarT1-desc1' ]" itemId="radarT1" btnText="button-build" />
                <card-building id="radarT2Card" name="radarT2" :descs="[ 'radarT2-desc1' ]" itemId="radarT2" btnText="button-build" />
            </page-pane>
            
            <page-pane id="shipsPane" name="sidebar-item-ships" icon="ships.png">
                <template v-slot:titleBar>
                    <div class="col-auto text-end">
                        <span class="text-light"><format-number :value="getFleetStats.power" /></span>
                        <small class="text-normal ms-1">P</small>
                    </div>
                    <div class="col-auto text-end">
                        <span class="text-light"><format-number :value="getFleetStats.defense" /></span>
                        <small class="text-normal ms-1">D</small>
                    </div>
                    <div class="col-auto text-end">
                        <span class="text-light"><format-number :value="getFleetStats.speed" /></span>
                        <small class="text-normal ms-1">S</small>
                    </div>
                </template>
                <card-building id="shipT1Card" name="shipT1" :descs="[ 'shipT1-desc1' ]" itemId="shipT1" btnText="button-build" />
                <card-building id="shipT2Card" name="shipT2" :descs="[ 'shipT2-desc1' ]" itemId="shipT2" btnText="button-build" />
                <card-building id="shipT3Card" name="shipT3" :descs="[ 'shipT3-desc1' ]" itemId="shipT3" btnText="button-build" />
                <card-building id="shipT4Card" name="shipT4" :descs="[ 'shipT4-desc1' ]" itemId="shipT4" btnText="button-build" />
                <card-building id="shipT5Card" name="shipT5" :descs="[ 'shipT5-desc1' ]" itemId="shipT5" btnText="button-build" />
            </page-pane>
            
            <page-pane-faction id="carnelianPane" name="sidebar-item-carnelian" icon="carnelian.png" faction="carnelian" :descs1="[ 'carnelian-desc1' ]" :descs2="[ 'carnelian-desc2' ]">
                <card-star id="star301Card" name="star301" itemId="star301" />
                <card-star id="star163901Card" name="star163901" itemId="star163901" />
                <card-star id="star181901Card" name="star181901" itemId="star181901" />
                <card-star id="star151801Card" name="star151801" itemId="star151801" />
                <card-star id="star25401Card" name="star25401" itemId="star25401" />
                <card-star id="star146301Card" name="star146301" itemId="star146301" />
                <card-star id="star122601Card" name="star122601" itemId="star122601" />
                <card-star id="star79501Card" name="star79501" itemId="star79501" />
                <card-star id="star1501Card" name="star1501" itemId="star1501" />
                <card-star id="star79901Card" name="star79901" itemId="star79901" />
                <card-star id="star37601Card" name="star37601" itemId="star37601" />
                <card-star id="star123401Card" name="star123401" itemId="star123401" />
                <card-star id="star164301Card" name="star164301" itemId="star164301" />
                <card-star id="star219102Card" name="star219102" itemId="star219102" />
                <card-star id="star204702Card" name="star204702" itemId="star204702" />
                <card-star id="star116901Card" name="star116901" itemId="star116901" />
                <card-star id="star74001Card" name="star74001" itemId="star74001" />
                <card-star id="star205102Card" name="star205102" itemId="star205102" />
                <card-star id="star144001Card" name="star144001" itemId="star144001" />
                <card-star id="star222301Card" name="star222301" itemId="star222301" />
                <card-star id="star3901Card" name="star3901" itemId="star3901" />
                <card-star id="star168301Card" name="star168301" itemId="star168301" />
                <card-star id="star120901Card" name="star120901" itemId="star120901" />
                <card-star id="star125301Card" name="star125301" itemId="star125301" />
                <card-star id="star113101Card" name="star113101" itemId="star113101" />
                <card-star id="star89101Card" name="star89101" itemId="star89101" />
                <card-star id="star93901Card" name="star93901" itemId="star93901" />
                <card-star id="star79201Card" name="star79201" itemId="star79201" />
                <card-star id="star80501Card" name="star80501" itemId="star80501" />
                <card-star id="star77301Card" name="star77301" itemId="star77301" />
                <card-star id="star191701Card" name="star191701" itemId="star191701" />
                <card-star id="star199702Card" name="star199702" itemId="star199702" />
                <card-star id="star21001Card" name="star21001" itemId="star21001" />
                <card-star id="star178302Card" name="star178302" itemId="star178302" />
                <card-star id="star32201Card" name="star32201" itemId="star32201" />
                <card-star id="star74801Card" name="star74801" itemId="star74801" />                
            </page-pane-faction>
            
            <page-pane-faction id="prasnianPane" name="sidebar-item-prasnian" icon="prasnian.png" faction="prasnian" :descs1="[ 'prasnian-desc1' ]" :descs2="[ 'prasnian-desc2' ]">
                <card-star id="star401Card" name="star401" itemId="star401" />
                <card-star id="star25101Card" name="star25101" itemId="star25101" />
                <card-star id="star207601Card" name="star207601" itemId="star207601" />
                <card-star id="star223901Card" name="star223901" itemId="star223901" />
                <card-star id="star121101Card" name="star121101" itemId="star121101" />
                <card-star id="star136701Card" name="star136701" itemId="star136701" />
                <card-star id="star166402Card" name="star166402" itemId="star166402" />
                <card-star id="star95001Card" name="star95001" itemId="star95001" />
                <card-star id="star175902Card" name="star175902" itemId="star175902" />
                <card-star id="star56501Card" name="star56501" itemId="star56501" />
                <card-star id="star167801Card" name="star167801" itemId="star167801" />
                <card-star id="star103201Card" name="star103201" itemId="star103201" />
                <card-star id="star113301Card" name="star113301" itemId="star113301" />
                <card-star id="star199602Card" name="star199602" itemId="star199602" />
                <card-star id="star157201Card" name="star157201" itemId="star157201" />
                <card-star id="star222201Card" name="star222201" itemId="star222201" />
                <card-star id="star6301Card" name="star6301" itemId="star6301" />
                <card-star id="star214301Card" name="star214301" itemId="star214301" />
                <card-star id="star40801Card" name="star40801" itemId="star40801" />
                <card-star id="star207301Card" name="star207301" itemId="star207301" />
                <card-star id="star169601Card" name="star169601" itemId="star169601" />
                <card-star id="star157101Card" name="star157101" itemId="star157101" />
                <card-star id="star178501Card" name="star178501" itemId="star178501" />
                <card-star id="star208601Card" name="star208601" itemId="star208601" />
                <card-star id="star78101Card" name="star78101" itemId="star78101" />
                <card-star id="star123501Card" name="star123501" itemId="star123501" />
                <card-star id="star85901Card" name="star85901" itemId="star85901" />
                <card-star id="star18501Card" name="star18501" itemId="star18501" />
                <card-star id="star199801Card" name="star199801" itemId="star199801" />
                <card-star id="star141901Card" name="star141901" itemId="star141901" />
                <card-star id="star5201Card" name="star5201" itemId="star5201" />
                <card-star id="star223701Card" name="star223701" itemId="star223701" />
                <card-star id="star166903Card" name="star166903" itemId="star166903" />
                <card-star id="star32101Card" name="star32101" itemId="star32101" />
                <card-star id="star77801Card" name="star77801" itemId="star77801" />
                <card-star id="star205201Card" name="star205201" itemId="star205201" />
            </page-pane-faction>
            
            <page-pane-faction id="hyacinitePane" name="sidebar-item-hyacinite" icon="hyacinite.png" faction="hyacinite" :descs1="[ 'hyacinite-desc1' ]" :descs2="[ 'hyacinite-desc2' ]">
                <card-star id="star201Card" name="star201" itemId="star201" />
                <card-star id="star217101Card" name="star217101" itemId="star217101" />
                <card-star id="star166701Card" name="star166701" itemId="star166701" />
                <card-star id="star179501Card" name="star179501" itemId="star179501" />
                <card-star id="star6501Card" name="star6501" itemId="star6501" />
                <card-star id="star222401Card" name="star222401" itemId="star222401" />
                <card-star id="star200001Card" name="star200001" itemId="star200001" />
                <card-star id="star24201Card" name="star24201" itemId="star24201" />
                <card-star id="star224202Card" name="star224202" itemId="star224202" />
                <card-star id="star92801Card" name="star92801" itemId="star92801" />
                <card-star id="star172701Card" name="star172701" itemId="star172701" />
                <card-star id="star86401Card" name="star86401" itemId="star86401" />
                <card-star id="star202902Card" name="star202902" itemId="star202902" />
                <card-star id="star177001Card" name="star177001" itemId="star177001" />
                <card-star id="star68301Card" name="star68301" itemId="star68301" />
                <card-star id="star205001Card" name="star205001" itemId="star205001" />
                <card-star id="star13401Card" name="star13401" itemId="star13401" />
                <card-star id="star34201Card" name="star34201" itemId="star34201" />
                <card-star id="star182101Card" name="star182101" itemId="star182101" />
                <card-star id="star178401Card" name="star178401" itemId="star178401" />
                <card-star id="star107601Card" name="star107601" itemId="star107601" />
                <card-star id="star192101Card" name="star192101" itemId="star192101" />
                <card-star id="star24001Card" name="star24001" itemId="star24001" />
                <card-star id="star16601Card" name="star16601" itemId="star16601" />
                <card-star id="star27501Card" name="star27501" itemId="star27501" />
                <card-star id="star121601Card" name="star121601" itemId="star121601" />
                <card-star id="star212102Card" name="star212102" itemId="star212102" />
                <card-star id="star117501Card" name="star117501" itemId="star117501" />
            </page-pane-faction>
            
            <page-pane-faction id="kitrinosPane" name="sidebar-item-kitrinos" icon="kitrinos.png" faction="kitrinos" :descs1="[ 'kitrinos-desc1' ]" :descs2="[ 'kitrinos-desc2' ]">
                <card-star id="star501Card" name="star501" itemId="star501" />
                <card-star id="star130601Card" name="star130601" itemId="star130601" />
                <card-star id="star158101Card" name="star158101" itemId="star158101" />
                <card-star id="star224601Card" name="star224601" itemId="star224601" />
                <card-star id="star58601Card" name="star58601" itemId="star58601" />
                <card-star id="star10101Card" name="star10101" itemId="star10101" />
                <card-star id="star194201Card" name="star194201" itemId="star194201" />
                <card-star id="star1101Card" name="star1101" itemId="star1101" />
                <card-star id="star72501Card" name="star72501" itemId="star72501" />
                <card-star id="star210501Card" name="star210501" itemId="star210501" />
                <card-star id="star189701Card" name="star189701" itemId="star189701" />
                <card-star id="star175601Card" name="star175601" itemId="star175601" />
                <card-star id="star206902Card" name="star206902" itemId="star206902" />
                <card-star id="star133601Card" name="star133601" itemId="star133601" />
                <card-star id="star135801Card" name="star135801" itemId="star135801" />
                <card-star id="star39101Card" name="star39101" itemId="star39101" />
                <card-star id="star107001Card" name="star107001" itemId="star107001" />
                <card-star id="star105801Card" name="star105801" itemId="star105801" />
                <card-star id="star224201Card" name="star224201" itemId="star224201" />
                <card-star id="star205101Card" name="star205101" itemId="star205101" />
                <card-star id="star162501Card" name="star162501" itemId="star162501" />
                <card-star id="star4001Card" name="star4001" itemId="star4001" />
                <card-star id="star141101Card" name="star141101" itemId="star141101" />
                <card-star id="star180502Card" name="star180502" itemId="star180502" />
                <card-star id="star208702Card" name="star208702" itemId="star208702" />
                <card-star id="star85501Card" name="star85501" itemId="star85501" />
                <card-star id="star217202Card" name="star217202" itemId="star217202" />
                <card-star id="star180101Card" name="star180101" itemId="star180101" />
                <card-star id="star13801Card" name="star13801" itemId="star13801" />
                <card-star id="star37101Card" name="star37101" itemId="star37101" />
                <card-star id="star42501Card" name="star42501" itemId="star42501" />
                <card-star id="star80901Card" name="star80901" itemId="star80901" />
                <card-star id="star215902Card" name="star215902" itemId="star215902" />
                <card-star id="star190502Card" name="star190502" itemId="star190502" />
                <card-star id="star99701Card" name="star99701" itemId="star99701" />
                <card-star id="star176802Card" name="star176802" itemId="star176802" />
            </page-pane-faction>
            
            <page-pane-faction id="movitonPane" name="sidebar-item-moviton" icon="moviton.png" faction="moviton" :descs1="[ 'moviton-desc1' ]" :descs2="[ 'moviton-desc2' ]">
                <card-star id="star701Card" name="star701" itemId="star701" />
                <card-star id="star601Card" name="star601" itemId="star601" />
                <card-star id="star80101Card" name="star80101" itemId="star80101" />
                <card-star id="star213301Card" name="star213301" itemId="star213301" />
                <card-star id="star13601Card" name="star13601" itemId="star13601" />
                <card-star id="star51801Card" name="star51801" itemId="star51801" />
                <card-star id="star35801Card" name="star35801" itemId="star35801" />
                <card-star id="star216801Card" name="star216801" itemId="star216801" />
                <card-star id="star224101Card" name="star224101" itemId="star224101" />
                <card-star id="star114001Card" name="star114001" itemId="star114001" />
                <card-star id="star15301Card" name="star15301" itemId="star15301" />
                <card-star id="star69601Card" name="star69601" itemId="star69601" />
                <card-star id="star148501Card" name="star148501" itemId="star148501" />
                <card-star id="star155801Card" name="star155801" itemId="star155801" />
                <card-star id="star185101Card" name="star185101" itemId="star185101" />
                <card-star id="star175901Card" name="star175901" itemId="star175901" />
                <card-star id="star203902Card" name="star203902" itemId="star203902" />
                <card-star id="star204801Card" name="star204801" itemId="star204801" />
                <card-star id="star211202Card" name="star211202" itemId="star211202" />
                <card-star id="star100801Card" name="star100801" itemId="star100801" />
                <card-star id="star124101Card" name="star124101" itemId="star124101" />
                <card-star id="star139701Card" name="star139701" itemId="star139701" />
                <card-star id="star50401Card" name="star50401" itemId="star50401" />
                <card-star id="star159101Card" name="star159101" itemId="star159101" />
                <card-star id="star148101Card" name="star148101" itemId="star148101" />
                <card-star id="star157301Card" name="star157301" itemId="star157301" />
                <card-star id="star72601Card" name="star72601" itemId="star72601" />
                <card-star id="star224801Card" name="star224801" itemId="star224801" />
                <card-star id="star71001Card" name="star71001" itemId="star71001" />
                <card-star id="star207501Card" name="star207501" itemId="star207501" />
                <card-star id="star168302Card" name="star168302" itemId="star168302" />
                <card-star id="star128901Card" name="star128901" itemId="star128901" />
                <card-star id="star68401Card" name="star68401" itemId="star68401" />
                <card-star id="star30701Card" name="star30701" itemId="star30701" />
                <card-star id="star193402Card" name="star193402" itemId="star193402" />
                <card-star id="star84201Card" name="star84201" itemId="star84201" />
                <card-star id="star76401Card" name="star76401" itemId="star76401" />
                <card-star id="star32301Card" name="star32301" itemId="star32301" />
                <card-star id="star191401Card" name="star191401" itemId="star191401" />
                <card-star id="star118301Card" name="star118301" itemId="star118301" />
                <card-star id="star166901Card" name="star166901" itemId="star166901" />
                <card-star id="star62901Card" name="star62901" itemId="star62901" />
                <card-star id="star21601Card" name="star21601" itemId="star21601" />
                <card-star id="star63801Card" name="star63801" itemId="star63801" />
                <card-star id="star187202Card" name="star187202" itemId="star187202" />
            </page-pane-faction>
            
            <page-pane id="dysonPane" name="sidebar-item-dyson" icon="dyson.png">
                <card-building id="segmentCard" name="segment" :descs="[ 'segment-desc1' ]" icon="segment.png" itemId="segment" btnText="button-build" />
                <card-building id="dysonT1Card" name="dysonT1" :descs="[ 'dysonT1-desc1' ]" itemId="dysonT1" btnText="button-build">
                    <div class="col-auto">
                        <button-build-segment itemId="dysonT1" count="50" priceFuel="50000" btnText="button-buildSegmentRing" />
                    </div>
                </card-building>
                <card-building id="dysonT2Card" name="dysonT2" :descs="[ 'dysonT2-desc1' ]" itemId="dysonT2" btnText="button-build">
                    <div class="col-auto">
                        <button-build-segment itemId="dysonT2" count="100" priceFuel="250000" btnText="button-buildSegmentSwarm" />
                    </div>
                </card-building>
                <card-building id="dysonT3Card" name="dysonT3" :descs="[ 'dysonT3-desc1' ]" icon="dysonT3.png" itemId="dysonT3" btnText="button-build">
                    <div class="col-auto">
                        <button-build-segment itemId="dysonT3" count="250" priceFuel="1000000" btnText="button-buildSegmentSphere" />
                    </div>
                </card-building>
            </page-pane>
            
            <page-pane id="darkmatterPane" name="sidebar-item-darkMatter" icon="darkmatter.png">
                <card id="darkmatterCard" name="darkmatter">
                    <template v-slot:header>
                        <div class="col-auto">
                            <small class="me-1">x</small>
                            <span class="text-light"><format-number :value="darkmatter" /></span>
                        </div>
                    </template>
                    <template v-slot:col-1>
                        <block-desc :descs="[ 'darkmatter-desc1' ]" />
                    </template>
                    <template v-slot:col-2>
                        <div class="col">
                            <div class="row row-cols-1 g-1">
                            
                                <div class="col">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small class="text-muted">{{ $t('sidebar-item-achievements') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-normal">+<format-number :value="getDMAchievement" /></small>
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="col">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small class="text-muted">{{ $t('dysonT1') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-normal">+<format-number :value="getDMRing" /></small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small class="text-muted">{{ $t('dysonT2') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-normal">+<format-number :value="getDMSwarm" /></small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small class="text-muted">{{ $t('dysonT3') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-normal">+<format-number :value="getDMSphere" /></small>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="col">
                            <div class="row g-1">
                                <div class="col">
                                    <small class="text-normal text-uppercase">{{ $t('total') }}</small>
                                </div>
                                <div class="col-auto">
                                    <small class="text-success">+<format-number :value="getDMPotential" /></small>
                                </div>
                            </div>
                        </div>
                    </template>
                </card>
                <card id="rebirthCard" name="rebirth">
                    <template v-slot:col-1>
                        <block-desc :descs="[ 'rebirth-desc1' ]" />
                    </template>
                    <template v-slot:col-2>
                        <block-desc :descs="[ 'rebirth-desc2' ]" />
                        <div class="col">
                            <div class="row row-cols-1 gy-2 gx-3 justify-content-end">
                                <line-cost v-for="cost in rebirthCosts" :key="cost" :cost="cost" />
                            </div>
                            <div v-if="!confirmRebirth" class="pt-2 row g-2 align-items-center justify-content-end">
                                <div class="col-auto">
                                    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':canRebirth != 0 }" @click="confirmRebirth = true">
                                        {{ $t('button-rebirth') }}
                                    </button>
                                </div>
                            </div>
                            <div v-if="confirmRebirth" class="pt-2 row g-2 align-items-center justify-content-end">
                                <div class="col text-end">
                                    <small class="text-danger">{{ $t('rebirth-confirm') }}</small>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':canRebirth != 0 }" @click="confirmRebirth = false; rebirth();">
                                        {{ $t('button-rebirth') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </card>
            </page-pane>
            
            <page-pane id="dmUpgradesPane" name="sidebar-item-dmUpgrades" icon="upgrades.png">
                <card-building id="dmUpgdMultiGain" name="dmUpgdMultiGain" :descs="[ 'dmUpgdMultiGain-desc1' ]" itemId="dmUpgdMultiGain" btnText="button-activate" />
                <card-building id="dmUpgdStartingStorage" name="dmUpgdStartingStorage" :descs="[ 'dmUpgdStartingStorage-desc1' ]" itemId="dmUpgdStartingStorage" btnText="button-activate" />
                <card-building id="dmUpgdMultiBuild" name="dmUpgdMultiBuild" :descs="[ 'dmUpgdMultiBuild-desc1' ]" itemId="dmUpgdMultiBuild" btnText="button-activate" />
                <card-building id="dmUpgdStorage" name="dmUpgdStorage" :descs="[ 'dmUpgdStorage-desc1' ]" itemId="dmUpgdStorage" btnText="button-activate" />
                <card-building id="dmUpgdAutoEmc" name="dmUpgdAutoEmc" :descs="[ 'dmUpgdAutoEmc-desc1' ]" itemId="dmUpgdAutoEmc" btnText="button-activate" />
                <card-building id="dmUpgdTier5" name="dmUpgdTier5" :descs="[ 'dmUpgdTier5-desc1' ]" itemId="dmUpgdTier5" btnText="button-activate" />
                <card-building id="dmUpgdDimensionRift" name="dmUpgdDimensionRift" :descs="[ 'dmUpgdDimensionRift-desc1' ]" itemId="dmUpgdDimensionRift" btnText="button-activate" />
            </page-pane>
            
            <page-pane id="dmBoostsPane" name="sidebar-item-dmBoosts" icon="boosts.png">
                <line-boost-count />
                <card-boost name="energy" icon="energy.png" itemId="boostEnergy" />
                <card-boost name="plasma" icon="plasma.png" itemId="boostPlasma" />
                <card-boost name="meteorite" icon="meteorite.png" itemId="boostMeteorite" />
                <card-boost name="carbon" icon="carbon.png" itemId="boostCarbon" />
                <card-boost name="science" icon="science.png" itemId="boostScience" />
                <card-boost name="oil" icon="oil.png" itemId="boostOil" />
                <card-boost name="fuel" icon="fuel.png" itemId="boostFuel" />
                <card-boost name="metal" icon="metal.png" itemId="boostMetal" />
                <card-boost name="gem" icon="gem.png" itemId="boostGem" />
                <card-boost name="wood" icon="wood.png" itemId="boostWood" />
                <card-boost name="silicon" icon="silicon.png" itemId="boostSilicon" />
                <card-boost name="uranium" icon="uranium.png" itemId="boostUranium" />
                <card-boost name="lava" icon="lava.png" itemId="boostLava" />
                <card-boost name="lunarite" icon="lunarite.png" itemId="boostLunarite" />
                <card-boost name="methane" icon="methane.png" itemId="boostMethane" />
                <card-boost name="titanium" icon="titanium.png" itemId="boostTitanium" />
                <card-boost name="gold" icon="gold.png" itemId="boostGold" />
                <card-boost name="silver" icon="silver.png" itemId="boostSilver" />
                <card-boost name="hydrogen" icon="hydrogen.png" itemId="boostHydrogen" />
                <card-boost name="helium" icon="helium.png" itemId="boostHelium" />
                <card-boost name="ice" icon="ice.png" itemId="boostIce" />
                <card-boost name="antimatter" icon="antimatter.png" itemId="boostAntimatter" />
            </page-pane>
            
            <page-pane id="ultritePane" name="sidebar-item-ultrite" icon="ultrite.png">
                <card id="ultriteCard" name="ultrite">
                    <template v-slot:header>
                        <div class="col-auto">
                            <small class="me-1">x</small>
                            <span class="text-light"><format-number :value="ultrite" /></span>
                        </div>
                    </template>
                    <template v-slot:col-1>
                        <block-desc :descs="[ 'ultrite-desc1' ]" />
                    </template>
                    <template v-slot:col-2>
                        <div class="col">
                            <div class="row row-cols-1 g-1">
                            
                                <div class="col">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small class="text-muted">{{ $t('dysonT3') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-normal">+{{ getULSphere }}</small>
                                        </div>
                                    </div>
                                </div>
                            
                                <div class="col">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small class="text-muted">{{ $t('conquest') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-normal">+{{ getULConquest }}</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="col">
                                    <div class="row g-1">
                                        <div class="col">
                                            <small class="text-muted">{{ $t('statue') }}</small>
                                        </div>
                                        <div class="col-auto">
                                            <small class="text-normal">+{{ getULStatue }}</small>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="col">
                            <div class="row g-1">
                                <div class="col">
                                    <small class="text-normal text-uppercase">{{ $t('total') }}</small>
                                </div>
                                <div class="col-auto">
                                    <small class="text-success">+{{ getULPotential }}</small>
                                </div>
                            </div>
                        </div>
                    </template>
                </card>
                <card id="enlightenCard" name="enlighten">
                    <template v-slot:col-1>
                        <block-desc :descs="[ 'enlighten-desc1' ]" />
                    </template>
                    <template v-slot:col-2>
                        <block-desc :descs="[ 'enlighten-desc2' ]" />
                        <div class="col">
                            <div class="row row-cols-1 gy-2 gx-3 justify-content-end">
                                <line-cost v-for="cost in enlightenCosts" :key="cost" :cost="cost" />
                            </div>
                            <div v-if="!confirmEnlighten" class="pt-2 row g-2 align-items-center justify-content-end">
                                <div class="col-auto">
                                    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':canEnlighten != 0 }" @click="confirmEnlighten = true">
                                        {{ $t('button-enlighten') }}
                                    </button>
                                </div>
                            </div>
                            <div v-if="confirmEnlighten" class="pt-2 row g-2 align-items-center justify-content-end">
                                <div class="col text-end">
                                    <small class="text-danger">{{ $t('enlighten-confirm') }}</small>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-primary" :class="{ 'disabled text-danger':canEnlighten != 0 }" @click="confirmEnlighten = false; enlighten();">
                                        {{ $t('button-enlighten') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </card>
            </page-pane>
            
            <page-pane id="ulUpgradesPane" name="sidebar-item-ulUpgrades" icon="upgrades.png">
                <card-building id="ulUpgdStorageCard" name="ulUpgdStorage" :descs="[ 'ulUpgdStorage-desc1' ]" itemId="ulUpgdStorage" btnText="button-activate" />
                <card-building id="ulUpgdSpeedCard" name="ulUpgdSpeed" :descs="[ 'ulUpgdSpeed-desc1' ]" itemId="ulUpgdSpeed" btnText="button-activate" />
                <card-building id="ulUpgdDefenseCard" name="ulUpgdDefense" :descs="[ 'ulUpgdDefense-desc1' ]" itemId="ulUpgdDefense" btnText="button-activate" />
                <card-building id="ulUpgdPowerCard" name="ulUpgdPower" :descs="[ 'ulUpgdPower-desc1' ]" itemId="ulUpgdPower" btnText="button-activate" />
                <card-building id="ulUpgdAutoStorageCard" name="ulUpgdAutoStorage" :descs="[ 'ulUpgdAutoStorage-desc1' ]" itemId="ulUpgdAutoStorage" btnText="button-activate" />
            </page-pane>
            
            <page-pane id="titansPane" name="sidebar-item-titans" icon="titans.png">
                <card id="titansDescCard" name="description">
                    <template v-slot:col-1>
                        <block-desc :descs="[ 'titans-desc1' ]" />
                    </template>
                    <template v-slot:col-2>
                        <block-desc :descs="[ 'titans-desc2' ]" />
                    </template>
                </card>
                <card-titan name="meteorite" icon="meteorite.png" itemId="titanMeteorite" />
                <card-titan name="carbon" icon="carbon.png" itemId="titanCarbon" />
                <card-titan name="science" icon="science.png" itemId="titanScience" />
                <card-titan name="oil" icon="oil.png" itemId="titanOil" />
                <card-titan name="fuel" icon="fuel.png" itemId="titanFuel" />
                <card-titan name="metal" icon="metal.png" itemId="titanMetal" />
                <card-titan name="gem" icon="gem.png" itemId="titanGem" />
                <card-titan name="wood" icon="wood.png" itemId="titanWood" />
                <card-titan name="silicon" icon="silicon.png" itemId="titanSilicon" />
                <card-titan name="uranium" icon="uranium.png" itemId="titanUranium" />
                <card-titan name="lava" icon="lava.png" itemId="titanLava" />
                <card-titan name="lunarite" icon="lunarite.png" itemId="titanLunarite" />
                <card-titan name="methane" icon="methane.png" itemId="titanMethane" />
                <card-titan name="titanium" icon="titanium.png" itemId="titanTitanium" />
                <card-titan name="gold" icon="gold.png" itemId="titanGold" />
                <card-titan name="silver" icon="silver.png" itemId="titanSilver" />
                <card-titan name="hydrogen" icon="hydrogen.png" itemId="titanHydrogen" />
                <card-titan name="helium" icon="helium.png" itemId="titanHelium" />
                <card-titan name="ice" icon="ice.png" itemId="titanIce" />
                <card-titan name="antimatter" icon="antimatter.png" itemId="titanAntimatter" />
            </page-pane>
            
        </div>
    </div>
    
    <div id="meetModal" class="modal fade">
        <div class="modal-dialog modal-dialog-scrollable" role="dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <div v-if="defeat != true" class="row row-cols-1 g-2">
                    
                        <div class="col">
                            <span class="text-uppercase text-light">{{ $t('meetModal-title') }}</span>
                        </div>
                        
                        <div class="col small">
                            <span class="me-1">«</span>
                            <i>{{ $t('meetModal-text1') }}</i>
                            <span class="ms-1">»</span>
                        </div>
                        
                        <div class="col d-flex justify-content-end">
                            <button type="button" class="btn btn-primary" @click="defeat = true">
                                {{ $t('value-next') }}
                            </button>
                        </div>
                        
                    </div>
                    <div v-if="defeat == true" class="row row-cols-1 g-2">
                    
                        <div class="col">
                            <span class="text-uppercase text-light">{{ $t('meetModal-title') }}</span>
                        </div>
                        
                        <div class="col-12">
                            <small>{{ $t('meetModal-text2') }}</small>
                        </div>
                        <div class="col-12">
                            <small>{{ $t('meetModal-text3') }}</small>
                        </div>
                        
                        <div class="col d-flex justify-content-end">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">
                                {{ $t('value-endOfGame') }}
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style>
    #page {
        padding-top: 50px;
    }
    @media (min-width: 768px) { #page { padding-left: 320px; } }
</style>

<script>
import BlockDesc from './BlockDesc.vue'

import ButtonMeet from './ButtonMeet.vue'
import ButtonBuildSegment from './ButtonBuildSegment.vue'

import Card from './Card.vue'
import CardAchievement from './CardAchievement.vue'
import CardBoost from './CardBoost.vue'
import CardBuilding from './CardBuilding.vue'
import CardConvert from './CardConvert.vue'
import CardEmc from './CardEmc.vue'
import CardGain from './CardGain.vue'
import CardUpgrade from './CardUpgrade.vue'
import CardStar from './CardStar.vue'
import CardTitan from './CardTitan.vue'
import CardProduction from './CardProduction.vue'

import FormatNumber from './FormatNumber.vue'
import FormatTime from './FormatTime.vue'

import ItemCount from './ItemCount.vue'

import LineAch from './LineAch.vue'
import LineCost from './LineCost.vue'
import LineProgress from './LineProgress.vue'
import LineProduction from './LineProduction.vue'
import LineConsumption from './LineConsumption.vue'
import LineBoostCount from './LineBoostCount.vue'
import LineTechnology from './LineTechnology.vue'
import LineScienceBoost from './LineScienceBoost.vue'
import LineScienceBoostCount from './LineScienceBoostCount.vue'

import PagePane from './PagePane.vue'
import PagePaneFaction from './PagePaneFaction.vue'
import PagePaneResource from './PagePaneResource.vue'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    components: {
        
        'block-desc': BlockDesc,
        
        'button-meet': ButtonMeet,
        'button-build-segment': ButtonBuildSegment,
        
        'card': Card,
        'card-achievement': CardAchievement,
        'card-boost': CardBoost,
        'card-building': CardBuilding,
        'card-convert': CardConvert,
        'card-emc': CardEmc,
        'card-gain': CardGain,
        'card-upgrade': CardUpgrade,
        'card-star': CardStar,
        'card-titan': CardTitan,
        'card-production': CardProduction,
        
        'format-number': FormatNumber,
        'format-time': FormatTime,
        
        'item-count': ItemCount,
        
        'line-ach': LineAch,
        'line-cost': LineCost,
        'line-progress': LineProgress,
        'line-production': LineProduction,
        'line-consumption': LineConsumption,
        'line-boost-count': LineBoostCount,
        'line-technology': LineTechnology,
        'line-science-boost': LineScienceBoost,
        'line-science-boost-count': LineScienceBoostCount,
        
        'page-pane': PagePane,
        'page-pane-faction': PagePaneFaction,
        'page-pane-resource': PagePaneResource,
    },
    data() {
        return {
        
            defeat: false,
            
            confirmReset: false,
            confirmRebirth: false,
            confirmEnlighten: false,
            
            compressed: null,
            newCompanyName: null,
            newAutoSaveDelay: null,
        }
    },
    created() {
        
        this.newCompanyName = this.companyName
        this.newAutoSaveDelay = this.autoSaveDelay
    },
    computed: {
        
        ...mapState([ 'companyName', 'autoSaveDelay', 'statsTotalRebirths', 'statsTotalEnlightens', 'statsTotalConquests', 'statsTotalStatues' ]),
        
        ...mapGetters([ 'getRadarRange', 'getFleetStats', 'getItemCount', 'getBuildCosts', 'canBuild', 'getAchievementCount', 'getDMPotential', 'getDMAchievement', 'getDMRing', 'getDMSwarm', 'getDMSphere', 'getULPotential', 'getULSphere', 'getULConquest', 'getULStatue', 'getTimeSinceStartDate', 'getTimeSinceLastRebirth', 'getTimeSinceLastEnlighten' ]),
        
        ultrite: function() { return this.getItemCount('ultrite') },
        darkmatter: function() { return this.getItemCount('darkmatter') },
        
        rebirthCosts: function() { return this.getBuildCosts('rebirth', 1) },
        enlightenCosts: function() { return this.getBuildCosts('enlighten', 1) },
        
        canRebirth: function() { return this.canBuild('rebirth', 1) },
        canEnlighten: function() { return this.canBuild('enlighten', 1) },
        
        statueProgress: function() { return (100 * this.getItemCount('statue') / 150) },
    },
    methods: {
    
        ...mapActions([ 'rebirth', 'enlighten', 'setCompanyName', 'setAutoSaveDelay', 'save', 'setActivePane' ]),
        
        exportData() {
            
            let text = localStorage.getItem('ngsc')
            this.compressed = text
        },
        
        importData() {

            if (!this.compressed || !this.compressed.trim()) return console.warn('No data to import')
            if (this.compressed.length % 4 !== 0) return console.warn('Data corrupted')
            
            localStorage.setItem('ngsc', this.compressed)

            window.location.reload()
        },
        
        reset: function() {
        
            localStorage.removeItem('ngsc')
            
            window.location.reload()
        },
    },
}
</script>