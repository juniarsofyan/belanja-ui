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
                                    <a href="https://www.facebook.com/bellezkincare.natural/" class="social-item">
                                        <i class="fa fa-facebook-square"></i>
                                    </a>
                                    <a href="https://www.instagram.com/bellezkin/" class="social-item">
                                        <i class="fa fa-instagram"></i>
                                    </a>
                                    <a href="https://www.youtube.com/channel/UCE0Hte0fUMeWhGrVn5zgwRQ"
                                        class="social-item">
                                        <i class="fa fa-youtube-square"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-md-6 col-xs-5 col-ts-12">
                            <div class="logo">
                                <nuxt-link to="/" tag="a">
                                    <img src="~/assets/images/logo.png" alt="">
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-12 col-md-12 col-xs-12 col-ts-12">
                            <div class="header-control">

                                <div class="block-minicart turan-mini-cart block-header turan-dropdown">
                                    <a href="javascript:void(0);" class="shopcart-icon" data-turan="turan-dropdown">My
                                        Cart<span class="count">{{ cart_count }}</span></a>
                                    <div class="shopcart-description turan-submenu">
                                        <div class="content-wrap" v-if="items.length>0">
                                            <h3 class="title">My Shopping Cart</h3>
                                            <ul class="minicart-items">
                                                <li class="product-cart mini_cart_item" v-for="item in items"
                                                    :key="item.product_code">
                                                    <nuxt-link :to="`/products/${item.product_code}/detail`" tag="a"
                                                        class="product-media">
                                                        <img :src="`${$axios.defaults.baseURL}assets/img/thumbnails/${item.picture}.jpg`"
                                                            alt="">
                                                    </nuxt-link>
                                                    <div class="product-details">
                                                        <h5 class="product-name">
                                                            <nuxt-link :to="`/products/${item.product_code}/detail`"
                                                                tag="a">
                                                                {{ item.product_name }}
                                                            </nuxt-link>
                                                        </h5>
                                                        <div class="variations">
                                                            <span class="attribute_color">
                                                                <nuxt-link :to="`/products/${item.category}`" tag="a">
                                                                    {{ item.category }}
                                                                </nuxt-link>
                                                            </span>
                                                            <!-- ,<span class="attribute_size"><a href="#">300ml</a></span> -->
                                                        </div>
                                                        <span class="product-price"><span
                                                                class="price"><span>{{ item.price | rupiah }}</span></span></span>
                                                        <span class="product-quantity"> x {{ item.qty }}</span>
                                                        <div class="product-remove">
                                                            <span @click="removeItem(item.product_code)">
                                                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="subtotal">
                                                <span class="total-title">Subtotal: </span><span
                                                    class="total-price"><span
                                                        class="Price-amount">{{ subtotal | rupiah }}</span></span>
                                            </div>
                                            <div class="actions">
                                                <!-- <nuxt-link :to="`/cart`" tag="a" class="button botton-toolcart">
                                                    <span>View My Cart</span>
                                                </nuxt-link>
                                                <nuxt-link :to="`/checkout`" tag="a" class="button botton-toolcart">
                                                    <span>Checkout Now</span>
                                                </nuxt-link> -->
                                                <nuxt-link :to="`/cart`" tag="a" class="button botton-toolcart">
                                                    <span>Checkout Now</span>
                                                </nuxt-link>
                                            </div>
                                        </div>
                                        <div class="content-wrap" v-else>
                                            <h3 class="title">No item available</h3>
                                        </div>
                                    </div>
                                </div>

                                <div class="block-search block-header turan-dropdown">
                                    <a href="javascript:void(0);" class="popup-live-search-button"
                                        data-turan="turan-dropdown">
                                        <span class="icon-search">

                                        </span>
                                    </a>
                                    <form class="form-search turan-submenu">
                                        <h4 class="title-search">Store Search</h4>
                                        <div class="form-content">
                                            <div class="inner">
                                                <input type="text" class="input" placeholder="Your search here" v-model="keyword">
                                                <nuxt-link :to="`/products/search?keyword=${keyword}`" tag="button" class="btn-search">
                                                    Search
                                                </nuxt-link>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div class="block-account block-header turan-dropdown">
                                    <a href="javascript:void(0);" data-turan="turan-dropdown">
                                        <i class="fa fa-user-o" aria-hidden="true"></i>
                                    </a>
                                    <div class="header-account turan-submenu">
                                        <div class="header-user-form-tabs" v-if="!userIsAuthorized">
                                            <ul class="tab-link">
                                                <li class="active">
                                                    <a data-toggle="tab" aria-expanded="true"
                                                        href="#header-tab-login">You have not login</a>
                                                </li>
                                            </ul>
                                            <div class="tab-container" style="padding: 20px 20px;">
                                                <div id="header-tab-login" class="tab-panel active">
                                                    <input type="button" class="button" value="Login"
                                                        @click="auth0Login()">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="header-user-form-tabs" v-else>
                                            <!-- <center>
                                                <img :src="user_data.picture" style="width: 150px; height: 150px;margin-top:10px;object-fit: cover; border-radius: 50%;padding: 10px;">
                                                  <br>  {{ user_data.name }}
                                            </center> -->
                                            <ul class="tab-link">
                                                <nuxt-link to="/profile" tag="li" class="active">
                                                    <a data-toggle="tab" aria-expanded="true" href="#header-tab-login">
                                                        <input type="button" class="button btn-xs" value="Profile">
                                                    </a>
                                                </nuxt-link>
                                                <li class="active" style="position: absolute;right: 0;">
                                                    <a data-toggle="tab" aria-expanded="true"
                                                        href="#header-tab-login"><input type="button" class="button btn-xs"
                                                            value="Logout" @click="auth0Logout"></a>
                                                </li>
                                                <br/>
                                                <br/>

                                                <nuxt-link to="/order-history" tag="li" class="active">
                                                    <input type="button" class="button btn-xs" value="Orders">
                                                </nuxt-link>
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
                            </nuxt-link> -->
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
            user_data: window.localStorage.getItem('user_data') ? JSON.parse(window.localStorage.getItem('user_data')) : [],
            loginForm: {
                email: '',
                password: ''
            },
            registerForm: {
                name: '',
                email: '',
                password: ''
            },
            keyword: "", // this.$route.query.keyword
        }
    },
    computed: {
        ...mapGetters("authentication", ['userIsAuthorized']),
        ...mapGetters("profile", ['personal']),
        cart_count: function () {
            return this.$store.getters['cart/count']
        },
        items: function () {
            return this.$store.getters['cart/items']
        },
        subtotal: function () {
            return this.$store.getters['cart/subtotal']
        }
    },
    methods: {
        removeItem: function (product_code) {
            let item = this.items.find(product => product.product_code == product_code)

            if (item) {
                this.$toast.global.cartremove({ 
                    message: `Removed &nbsp; <b>${item.product_name } (x${item.qty})</b>` 
                })
            }

            this.$store.dispatch('cart/removeItem', product_code)
        },
        getUserProfile() {
            this.$axios.post(`${process.env.API_BASE_URL}profile/get`, {
                email: this.loginForm.email
            }).then((response) => {

                this.$store.dispatch("profile/updateProfile", {
                    member_no: response.data.data.no_member,
                    nik: response.data.data.nik,
                    name: response.data.data.nama,
                    birthdate: response.data.data.tgl_lahir,
                    phone: response.data.data.telp,
                    email: response.data.data.email
                })
            });
        },
        auth0Login() {
            this.$store.dispatch("authentication/auth0Login");
        },
        auth0Logout() {
            this.$store.dispatch("authentication/auth0Logout");
        },
    }
}
</script>