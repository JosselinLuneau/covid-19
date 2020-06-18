const app = new Vue({
    el: '#app',
    data: {
        pageDisplay: 'home',
        reload: {
            img: '/static/refresh.svg',
            active: false,
        },
        menu: [
            {
                img: '/static/home.svg',
                text: 'Home',
                selected: true,
                component: 'home-page'
            },
            {
                img: '/static/dashboard.svg',
                text: 'Dashboard',
                selected: false,
                component: 'dashboard-page'
            },
        ]
    },
    watch: {
        pageDisplay: function (current) {
            this.reload.active = "dashboard" === current;
        }
    },
    methods: {
        navigate: function (index) {
            this.menu
                .filter((item) => item.selected)
                .shift()
                .selected = false; // remove old page to selection

            const selectedMenu = this.menu[index];
            selectedMenu.selected = true;
            this.pageDisplay = selectedMenu.text.toLowerCase();
        }
    },

});
