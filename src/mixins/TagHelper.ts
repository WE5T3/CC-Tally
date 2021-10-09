import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class TagHelper extends Vue {
    createTag() {
        window.alert('新建以下标签时会拥有独特的图标^^:\n' +
            '购物: 美容 水果 饮料 零食 饭卡 \n' +
            '生活: 外设 网络 图书 理发 宠物猫 宠物狗 装修 礼金 \n' +
            '交通: 油费 ETC 停车 洗车 修车 出租车 网约车 地铁 公交 火车 高铁 飞机 轮船 罚款 \n' +
            '娱乐: 玩具 K歌 电影 门票 棋牌 健身 旅游 \n')
        const name = window.prompt('请输入标签名')
        if (name === '') {
            return window.alert('标签名不能为空')
        } else if (name === null) {
            return
        } else {
            this.$store.commit('createTag', name)
        }
    }
}
