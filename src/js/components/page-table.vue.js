Vue.component('page-table', {
    props: {
        header: [],
        data: {},
        numberPerPage: {
            default: 5
        },
    },
    data: () => {
        return {
            pages: [],
            currentPageNumber: 0,
            paginationMax: 5,
        }
    },
    template: `
        <div id="page-table">
            <table>
                <thead>
                <tr>
                    <th v-for="text in header">{{ text }}</th>
                </tr>
                </thead>
                <tbody>
                <slot v-bind:data="this.currentPage"></slot>
                </tbody>
            </table>
            <div class="pagination">
                <div class="page-number" @click="previous"><</div>
                <div v-for="pageNumber in this.pagination" 
                     @click="display(pageNumber)"
                     class="page-number"
                    :class="{middle: null === pageNumber}">
                    
                    <div v-if="null === pageNumber" class="pagination-dot">
                        <span class="three-dot"></span>
                    </div>
                    
                    <span v-if="pageNumber" class="number">{{ pageNumber }}</span>
                </div>
                <div class="page-number" @click="next">></div>
            </div>
        </div>
    `,
    watch: {
        data: function () {
            this.paginate()
        },
    },
    computed: {
        displayCurrentPageNumber: function() {
          return this.currentPageNumber + 1;
        },

        currentPage: function () {
            return this.pages[this.currentPageNumber];
        },

        pagination: function () {
            return this.pages.length > this.paginationMax
                ? this.cuttedPagination
                : this.pages.length
        },

        cuttedPagination: function () {
            let halfNumberDisplay = (this.paginationMax % 2 ? this.paginationMax - 1 : this.paginationMax) / 2;
            let numbers = [];

            for (let i=1; i <= halfNumberDisplay;i++) { numbers.push(i); }

            numbers.push(null);

            let i = this.pages.length;
            let endNumbers = [];
            while(i-- && halfNumberDisplay-- > 0) {endNumbers.push(i+1)}

            return numbers.concat(endNumbers.reverse());
        }
    },
    methods: {
        init: function () {
            this.paginate();
        },

        paginate: function () {
            const groups = Math.floor(this.data.length / this.numberPerPage);
            let pages = [];
            if (this.numberPerPage > this.data.length) {
                pages.push(this.data)
            } else {
                for (let i = 1; i <= groups; i++) {
                    let start = (i - 1) * this.numberPerPage;
                    pages.push(this.data.slice(start, this.numberPerPage * i))
                }
            }

            this.pages = pages
        },

        next: function () {
            (this.currentPageNumber + 1) < this.pages.length ? this.currentPageNumber++ : '';
        },

        display: function (number) {
            if (null !== number) {
                this.currentPageNumber = number-1;
            }
        },

        previous: function () {
            (this.currentPageNumber - 1) > 0 ? this.currentPageNumber-- : '';
        }
    },
    mounted() {
        this.init();
    }
});
