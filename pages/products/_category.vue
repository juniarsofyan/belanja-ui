<template>
    <div class="row">
        <!--site main area -->
        <div
            class="content-area shop-grid-content full-width col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
            <div class="site-main">
                <!-- Slide Banner -->
                <!-- <SlideBanner /> -->
                <Banner />

                <!--shop title-->
                <h3 class="custom_blog_title">#{{ productTitle }}</h3>

                <!--product lists-->
                <ul class="row list-products auto-clear equal-container product-grid">
                    <template v-if="products">
                        <Product
                            v-for="brightening in products"
                            :key="brightening.id"
                            :product="brightening"
                        />
                    </template>
                    <template  v-else>
                        <div class="text-center">
                            <img src="~/assets/images/svg/no-data.svg" style="width:200px;" /><br/><br/>
                                <b><h3>Oops...</h3></b>
                                Product not found
                        </div>
                    </template>
                </ul>

                <!--pagination-->
                <paginate
                    v-if="category != 'search'"
                    :v-model="pagination.currentPage"
                    :page-count="pagination.pageCount"
                    :page-range="pagination.pageRange"
                    :margin-pages="pagination.marginPages"
                    :click-handler="redirectPageNumber"
                    :prev-text="'&lt;'"
                    :next-text="'&gt;'"
                    :container-class="'pagination clearfix style2'"
                    :page-class="''"
                    :prev-class="''"
                    :next-class="''"
                    :no-li-surround="true"
                    :hide-prev-next="true"
                    :active-class="'current'"
                    :page-link-class="'page-numbers'"
                    :prev-link-class="'page-numbers'"
                    :next-link-class="'page-numbers'"
                ></paginate>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    layout: 'products',
    middleware: ['affiliation'],
    components: {
        // SlideBanner: () => import('~/components/SlideBanner'),
        Product: () => import('~/components/Product'),
        Paginate: () => import('vuejs-paginate'),
        Banner: () => import('~/components/Banner')
    },
    data() {
        return {
            dataLoaded: false,
            products: [],
            productCount: 0,
            category: this.$route.params.category,
            pagination: {
                currentPage: this.$route.query.page
                    ? this.$route.query.page
                    : 1,
                pageCount: 0,
                pageRange: 5,
                marginPages: 2,
                offset: this.$route.query.page
                    ? this.$route.query.page * 20 - 20
                    : 0,
                limit: 20
            }
        }
    },
    head() {
        return {
            bodyAttrs: {
                class: this.dataLoaded ? 'home-page home page page-id-4 page-template page-template-template-homepage page-template-template-homepage-php' : ''
            }
        }
    },
    watch: {
        $route(to, from) {
            this.pagination.offset = this.$route.query.page * 20 - 20
            this.category = this.$route.params.category

            this.getProducts()
        }
    },
    computed: {
        productTitle: function() {
            return this.category
                .replace(/\w\S*/g, function(txt) {
                    return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                    )
                })
                .replace(' ', '')
        },
        items: function() {
            return this.$store.getters['cart/items']
        }
    },
    methods: {
        getProducts: function() {

            let url = `/products/${this.category}/${this.pagination.offset}/${this.pagination.limit}`

            if (this.category == "search") {
                const keyword = this.$route.query.keyword
                
                if (keyword) {
                    url = `/products/search/${keyword}`
                } else {
                    this.$router.push('/')
                }
            }

            this.$axios
                .get(url)
                .then((response) => {
                    if (response.data.data != 0) {
                        this.pagination.pageCount = response.data.rowcount / 20
                        this.products = response.data.data
                    } else {
                        this.products = null
                    }
                })
        },
        redirectPageNumber: function(pageNum) {
            this.$router.push({
                path: `/products/${this.category}?page=${this.pagination.currentPage}`,
                query: {
                    page: pageNum
                }
            })
        }
    },
    created() {
        this.getProducts()
    }
}
</script>

<style>
.custom_blog_title {
    text-transform: captialize;
}
</style>