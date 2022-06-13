<template>
    <div id="imooc-screen-container" :ref="ref">
        <template v-if="ready">
            <slot></slot>
        </template>
    </div>
</template>

<script lang="ts">
    // @ts-nocheck
    import { defineComponent } from 'vue'
    import { debounce, observerDomResize} from './utils/index'

    export default defineComponent({
        props: {
            options: {
                type: Object
            }
        },
        data() {
            return {
                ref: 'full-screen-container',
                width: 0, // dom width
                height: 0, // dom height
                allWidth: 0, // 
                allHeight: 0, // 
                originalWidth: 0, // 浏览器实际width
                originalHeight: 0, // 浏览器实际height
                scale: 0, // 缩放系数
                datavRoot: '',
                ready: false, // 加载状态
                debounceInitWHFun: null,
                domObserver: null
            }
        },
        
        methods: { 
            async autoResizeInit(){
                // 初始化宽高
                await this.initWH(false)
                // 设置宽高节流函数
                this.getDebounceInitWHFun()
                // 监听winow、dom的onresize
                this.bindDomResizeCallback()
                // 初始化之后容器dom设置
                this.afterAutoResizeInit()
            },
            initWH(resize=true){
                const { $refs, $nextTick } = this

                return new Promise<void>(resolve=>{
                    $nextTick(e=>{
                        const dom = this.dom = $refs[this.ref]
                        if(this.options){
                            const { width, height } = this.options
                            if(width && height){
                                this.width = width
                                this.height = height
                            }
                        }else{
                            
                            this.width = dom.clientWidth
                            this.height = dom.clientHeight
                        }

                        if (!this.originalWidth || !this.originalHeight) {
                            const { width, height } = screen
                            this.originalWidth = width
                            this.originalHeight = height
                        }
                        if (typeof this.onResize === 'function') this.onResize()

                        resolve()

                    })
                })
                
            },
            getDebounceInitWHFun(){
                this.debounceInitWHFun = debounce(100, this.initWH)
            },
            bindDomResizeCallback() {
                this.domObserver = observerDomResize(this.dom, this.debounceInitWHFun)
                window.addEventListener('resize', this.debounceInitWHFun)
            },
            unbindDomResizeCallback() {
                this.domObserver.disconnect()
                this.domObserver.takeRecords()
                this.domObserver = null
                window.removeEventListener('resize', this.debounceInitWHFun)
            },
            afterAutoResizeInit(){
                this.initConfig()
                this.setAppScale()
                this.ready = true
            },
            initConfig() {
                this.allWidth = this.width || this.originalWidth
                this.allHeight = this.height || this.originalHeight
                this.dom.style.width = `${this.allWidth}px`
                this.dom.style.height = `${this.allHeight}px`
            },
            setAppScale() {
                const currentWidth = document.body.clientWidth
                const currentHeight = document.body.clientHeight
                this.dom.style.transform = `scale(${currentWidth / this.allWidth}, ${currentHeight / this.allHeight})`
            },
            onResize(){
                this.setAppScale()
            }

        },
        mounted(){
            // 初始化
            this.autoResizeInit()
        },
        beforeDestroy(){
            // 清除定时器、监听
            this.unbindDomResizeCallback()
        }
    })
</script>

<style lang="less">
  #imooc-screen-container {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    transform-origin: left top;
    z-index: 999;
  }
</style>