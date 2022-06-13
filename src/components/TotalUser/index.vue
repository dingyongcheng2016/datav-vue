<template>
  <div class="total-user">
    <div class="title">慕课外卖用户总数</div>
    <div class="sub-title">User Total Count</div>
    <div class="total">
      <count-to
        :start-val="startVal"
        :end-val="todayUser"
        :duration="1000"
        separator=","
        autoplay
      />
    </div>
    <div class="percent-text">
        <span class="percent-text-1">
          每日增长率:
          <count-to
            :start-val="startPercent"
            :end-val="growthLastDay"
            :duration="1000"
            :decimals="2"
            suffix="%"
          />
        </span>
      <span class="percent-text-2">
        每月增长率:
        <count-to
          :start-val="startPercent2"
          :end-val="growthLastMonth"
          :duration="1000"
          :decimals="2"
          suffix="%"
        />
        </span>
    </div>
    <div class="percent">
      <div class="percent-inner-wrapper">
        <div class="percent-inner" :style="{width: `${growthLastDay}%`}" />
      </div>
    </div>
  </div>
</template>

<script>
    import { ref } from 'vue'
    export default {
        name: 'totalUser',
        props: {
            todayUser: Number,
            growthLastDay: {
                type: Number,
                default: 0
            },
            growthLastMonth: {
                type: Number,
                default: 0
            }
        },
        setup(props) {
            const startVal = ref(0)
            const startPercent = ref(0)
            const startPercent2 = ref(0)
            const updateStartVal = () => {
                startVal.value = props.todayUser
                startPercent.value = props.growthLastDay
                startPercent2.value = props.growthLastMonth
            }
            return {
                startVal,
                startPercent,
                startPercent2,
                updateStartVal
            }
        }
    }
</script>