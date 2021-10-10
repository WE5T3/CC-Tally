import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/Icon.vue";


Vue.config.productionTip = false

Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)

window.onload = function () {
    setTimeout(function () {
        window.scrollTo(0, 9999)
    }, 0)
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

if (document.documentElement.clientWidth > 500) {

    const img = document.createElement('img')
    const imgWrapper = document.createElement('div')
    img.src = 'qrcode.png'
    imgWrapper.style.height = '100vh'
    imgWrapper.style.backgroundColor = 'transparent'
    imgWrapper.style.position = 'fixed'
    img.style.position = 'fixed'
    img.style.left = '50%'
    img.style.top = '50%'
    img.style.transform = 'translate(-50%,-50%)'
    img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)'
    document.body.appendChild(imgWrapper)
    imgWrapper.appendChild(img)
    window.addEventListener('click', function (e) {
        imgWrapper.style.display = 'none'
    })
    window.alert('为保证使用体验,请手机扫码打开页面')
}