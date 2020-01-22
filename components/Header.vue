<template>
    <div>
        <header class="header style1">
            <div class="container">
                <!-- main header -->
                <div class="main-header">
                    <div class="row">
                        <div class="col-lg-4 col-sm-6 col-md-6 col-xs-7 col-ts-12 header-element">
                            <div class="turan-socials social-header">
                                <div class="socials">
                                    <a
                                        href="https://www.facebook.com/bellezkincare.natural/"
                                        class="social-item"
                                    >
                                        <i class="fa fa-facebook-square"></i>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/bellezkin/"
                                        class="social-item"
                                    >
                                        <i class="fa fa-instagram"></i>
                                    </a>
                                    <a
                                        href="https://www.youtube.com/channel/UCE0Hte0fUMeWhGrVn5zgwRQ"
                                        class="social-item"
                                    >
                                        <i class="fa fa-youtube-square"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-md-6 col-xs-5 col-ts-12">
                            <div class="logo">
                                <nuxt-link to="/" tag="a">
                                    <img src="~/assets/images/logo.png" alt />
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-12 col-md-12 col-xs-12 col-ts-12">
                            <div class="header-control">
                                <div
                                    class="block-minicart turan-mini-cart block-header turan-dropdown"
                                >
                                    <a
                                        href="javascript:void(0);"
                                        class="shopcart-icon"
                                        data-turan="turan-dropdown"
                                    >
                                        My
                                        Cart
                                        <span
                                            class="count"
                                        >{{ cart_count }}</span>
                                    </a>
                                    <div class="shopcart-description turan-submenu">
                                        <div class="content-wrap" v-if="items.length>0">
                                            <h3 class="title">My Shopping Cart</h3>
                                            <ul class="minicart-items">
                                                <li
                                                    class="product-cart mini_cart_item"
                                                    v-for="item in items"
                                                    :key="item.product_code"
                                                >
                                                    <nuxt-link
                                                        :to="`/products/${item.product_code}/detail`"
                                                        tag="a"
                                                        class="product-media"
                                                    >
                                                        <img
                                                            :src="`${$axios.defaults.baseURL}assets/img/thumbnails/${item.picture}.jpg`"
                                                            alt
                                                        />
                                                    </nuxt-link>
                                                    <div class="product-details">
                                                        <h5 class="product-name">
                                                            <nuxt-link
                                                                :to="`/products/${item.product_code}/detail`"
                                                                tag="a"
                                                            >{{ item.product_name }}</nuxt-link>
                                                        </h5>

                                                        <template v-if="item.price_discount > 0 && item.price > item.price_discount">    
                                                            <div class="variations">
                                                                <span class="attribute_color">
                                                                    <del>{{ item.price | rupiah }}</del>
                                                                </span>
                                                            </div>
                                                            <span class="product-price">
                                                                <span class="price">
                                                                    <span>{{ item.price_discount | rupiah }}</span>
                                                                </span>
                                                            </span>
                                                        </template>
                                                        <template v-else>
                                                            <span class="product-price">
                                                                <span class="price">
                                                                    <span>{{ item.price_discount | rupiah }}</span>
                                                                </span>
                                                            </span>
                                                        </template>


                                                        <span
                                                            class="product-quantity"
                                                        >x {{ item.qty }}</span>
                                                        <div class="product-remove">
                                                            <span
                                                                @click="removeItem(item.product_code)"
                                                            >
                                                                <i
                                                                    class="fa fa-trash-o"
                                                                    aria-hidden="true"
                                                                ></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="subtotal">
                                                <span class="total-title">Subtotal:</span>
                                                <span class="total-price">
                                                    <span
                                                        class="Price-amount"
                                                    >{{ subtotal | rupiah }}</span>
                                                </span>
                                            </div>
                                            <div class="actions">
                                                <!-- <nuxt-link :to="`/cart`" tag="a" class="button botton-toolcart">
                                                    <span>View My Cart</span>
                                                </nuxt-link>
                                                <nuxt-link :to="`/checkout`" tag="a" class="button botton-toolcart">
                                                    <span>Checkout Now</span>
                                                </nuxt-link>-->
                                                <nuxt-link
                                                    :to="`/cart`"
                                                    tag="a"
                                                    class="button botton-toolcart btn-cart"
                                                >
                                                    <span>View My Cart</span>
                                                </nuxt-link>
                                            </div>
                                        </div>
                                        <div class="content-wrap" v-else>
                                            <h3 class="title">No item available</h3>
                                        </div>
                                    </div>
                                </div>

                                <div class="block-search block-header turan-dropdown" title="Search">
                                    <a
                                        href="javascript:void(0);"
                                        class="popup-live-search-button"
                                        data-turan="turan-dropdown"
                                    >
                                        <span class="icon-search"></span>
                                    </a>
                                    <form class="form-search turan-submenu">
                                        <h4 class="title-search">Store Search</h4>
                                        <div class="form-content">
                                            <div class="inner">
                                                <input
                                                    type="text"
                                                    class="input"
                                                    placeholder="e.g. product code, name or category"
                                                    v-model="keyword"
                                                />
                                                <nuxt-link
                                                    :to="`/products/search?keyword=${keyword}`"
                                                    tag="button"
                                                    class="btn-search"
                                                >Search</nuxt-link>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="block-account block-header turan-dropdown" @click="auth0Login()" v-if="!userIsAuthorized">
                                    <a href="javascript:void(0);" title="Log In">
                                        <feather type="lock"></feather>
                                    </a>
                                </div>

                                <div class="block-account block-header turan-dropdown" v-else>
                                    <a href="javascript:void(0);" data-turan="turan-dropdown">
                                        <i class="fa fa-user-o" aria-hidden="true"></i>
                                    </a>
                                    <div class="header-account turan-submenu">
                                        <div class="header-user-form-tabs">
                                            <ul class="submenu submenu-profile">
                                                <li class="menu-item">
                                                    <nuxt-link
                                                        to="/profile"
                                                        tag="li"
                                                        class="active"
                                                    >
                                                        <a
                                                            data-toggle="tab"
                                                            aria-expanded="true"
                                                            href="#header-tab-login"
                                                        >
                                                            <i class="fa fa-user-o"></i> Profile
                                                        </a>
                                                    </nuxt-link>
                                                </li>
                                                <li class="menu-item">
                                                    <nuxt-link
                                                        to="/order-history"
                                                        tag="li"
                                                        class="active"
                                                    >
                                                        <a>
                                                            <i class="fa fa-shopping-bag"></i> Orders
                                                        </a>
                                                    </nuxt-link>
                                                </li>
                                                <li class="menu-item">
                                                    <a
                                                        data-toggle="tab"
                                                        aria-expanded="true"
                                                        href="#header-tab-login"
                                                        @click="auth0Logout"
                                                    >
                                                        <i class="fa fa-sign-out"></i>Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <a class="menu-bar mobile-navigation" href="#">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /main header -->

                <!-- header nav -->
                <div class="header-nav main-menu-wapper">
                    <div class="container-wapper">
                        <ul class="clone-main-menu turan-nav main-menu" id="menu-main-menu">
                            <nuxt-link to="/" tag="li" class="menu-item">
                                <a href="#" class="kt-item-title" title="Shop">Home</a>
                            </nuxt-link>
                            <nuxt-link to="/products/brightening" tag="li" class="menu-item">
                                <a href="#" class="kt-item-title" title="Brightening">Brightening</a>
                            </nuxt-link>
                            <nuxt-link to="/products/purify" tag="li" class="menu-item">
                                <a href="#" class="kt-item-title" title="Purify">Purify</a>
                            </nuxt-link>
                            <nuxt-link to="/products/decorative" tag="li" class="menu-item">
                                <a href="#" class="kt-item-title" title="Decorative">Decorative</a>
                            </nuxt-link>
                            <nuxt-link to="/products/extra care" tag="li" class="menu-item">
                                <a href="#" class="kt-item-title" title="Extra Care">Extra Care</a>
                            </nuxt-link>
                            <nuxt-link to="/products/series" tag="li" class="menu-item">
                                <a href="#" class="kt-item-title" title="Series">Series</a>
                            </nuxt-link>
                            <!-- <nuxt-link to="/products/promo" tag="li" class="menu-item">
                                <a href="#" class="kt-item-title" title="Promo">Promo</a>
                            </nuxt-link>-->
                        </ul>
                    </div>
                </div>
                <!-- header nav -->
            </div>
        </header>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            user_data: window.localStorage.getItem('user_data')
                ? JSON.parse(window.localStorage.getItem('user_data'))
                : [],
            loginForm: {
                email: '',
                password: ''
            },
            registerForm: {
                name: '',
                email: '',
                password: ''
            },
            keyword: '' // this.$route.query.keyword
        }
    },
    computed: {
        ...mapGetters('authentication', ['userIsAuthorized']),
        ...mapGetters('profile', ['personal']),
        cart_count: function() {
            return this.$store.getters['cart/count']
        },
        items: function() {
            return this.$store.getters['cart/items']
        },
        subtotal: function() {
            return this.$store.getters['cart/subtotal']
        }
    },
    methods: {
        removeItem: function(product_code) {
            this.$store.dispatch('cart/removeItem', product_code)
        },
        getUserProfile() {
            this.$axios
                .post(`${process.env.API_BASE_URL}profile/get`, {
                    email: this.loginForm.email
                })
                .then((response) => {
                    this.$store.dispatch('profile/updateProfile', {
                        member_no: response.data.data.no_member,
                        nik: response.data.data.nik,
                        name: response.data.data.nama,
                        birthdate: response.data.data.tgl_lahir,
                        phone: response.data.data.telp,
                        email: response.data.data.email
                    })
                })
        },
        auth0Login() {
            this.$store.dispatch('authentication/auth0Login')
        },
        auth0Logout() {
            this.$store.dispatch('authentication/auth0Logout')
            this.$store.dispatch('checkout/reset')
            this.$store.dispatch('cart/reset')
        }
    }
}
</script>

<style lang="css">
.btn-outline {
    background: transparent;
    border: 2px solid #e9e9e9;
    color: #333333;
    font-weight: 700;
    vertical-align: middle;
    height: 43px;
    padding: 0 20px;
    font-size: 14px;
    border-radius: 4px;
}
.submenu-profile {
    padding-left: 0px;
}
.menu-item {
    list-style: none;
    position: relative;
}
.submenu > li a {
    display: block;
    padding: 11px 20px;
    color: #555555;
}
.submenu > li a > i {
    padding-right: 6px;
}
.submenu > li:hover {
    background-color: #f1f1f1;
}
</style>