<template>
    <div class="container">
        <loading v-if="!ready">Loading...</loading>
        <Container :options="{width: 3840, height: 2160}" v-else>
            <div class="header">
                <top-header />
            </div>
            <div class="separator-wrapper">
                <separator />
            </div>
            <div class="center">
                <div class="left">
                    <div class="left1">
                        <total-user
                            :today-user="userData.userToday"
                            :growth-last-day="+userData.userGrowthLastDay || 0"
                            :growth-last-month="+userData.userGrowthLastMonth || 0"
                            ref="totalUser"
                        />
                    </div>
                </div>
                <div class="right"></div>
            </div>
            
        </Container>
    </div>
</template>

<script lang="ts">
    // @ts-nocheck
    import { defineComponent, getCurrentInstance } from 'vue'
    import { useScreenData } from './useScreenData'
    import Loading from '@/components/Loading/index.vue'
    import Container from '@/components/Container/index.vue'
    import TopHeader from '@/components/TopHeader2/index.vue'
    import Separator from '@/components/Separator/index'
    import TotalUser from '@/components/TotalUser/index'

    export default defineComponent({
        components: {
            Loading,
            Container,
            TopHeader,
            Separator,
            TotalUser
        },
        setup () {
            const context = getCurrentInstance()?.appContext
            const { ready, userData, ageData, deviceData, realTimeOrder, mapData } = useScreenData(context, { once: false })

            return {
                ready,
                userData,
                ageData,
                deviceData,
                realTimeOrder,
                mapData
            }
        }
    })
</script>

<style lang="less" scoped>
    .container {
        width: 100%;
        height: 100%;
        background: rgb(29, 29, 29);
        color: #fff;
        font-size: 48px;

        #imooc-screen-container {
            display: flex;
            flex-direction: column;
            
            .header {
                height: 167px;
                margin-top: 10px;
            }

            .separator-wrapper {
                height: 10px;
            }

            .center {
                flex: 1;
                display: flex;

                .left {
                    flex: 0 0 860px;
                    display: flex;
                    flex-direction: column;
                    width: 860px;
                    height: 100%;
                    margin: 0 10px;
                    box-sizing: border-box;
                    background: rgb(60, 61, 64);

                    .left1, .left2, .left3, .left4, .left5, .left6 {
                        padding-bottom: 20px;
                    }

                    .left1 {
                        height: 300px;
                    }

                    .left2 {
                        height: 320px;
                    }

                    .left3 {
                        height: 280px;
                    }

                    .left4 {
                        height: 230px;
                    }

                    .left5 {
                        height: 360px;
                    }

                    .left6 {
                        height: 360px;
                    }
                }

                .right {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    margin: 0 10px;
                    max-width: 2960px;
                    overflow: hidden;
                }

            }
        }

    }
</style>
