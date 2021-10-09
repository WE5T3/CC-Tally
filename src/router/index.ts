import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Money from "@/views/Money.vue";
import Details from "@/views/Details.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import AddTags from "@/views/AddTags.vue";
import EditTags from "@/views/EditTags.vue";
import EditLabel from "@/views/EditLabel.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path:'/',
        redirect: '/details'
    },
    {
        path:'/money',
        component: Money
    },
    {
        path:'/details',
        component: Details
    },
    {
        path:'/statistics',
        component: Statistics
    },
    {
        path:'/edittags/addtags',
        component: AddTags
    },
    {
        path:'/edittags/editlabel/:id',
        component: EditLabel
    },
    {
        path:'/edittags',
        component: EditTags
    },
    {
        path:'*',
        component: NotFound
    }
]

const router = new VueRouter({
    routes
})

export default router
