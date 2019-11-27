<template>
    <div class="header-device-mobile">
        <div class="wapper">
            <div class="item mobile-logo">
                <div class="logo">
                    <a href="#">
                        <img src="~/assets/images/logo.png" alt />
                    </a>
                </div>
            </div>
            <div class="item item mobile-search-box has-sub">
                <a href="#">
                    <span class="icon">
                        <i class="fa fa-search" aria-hidden="true"></i>
                    </span>
                </a>
                <div class="block-sub">
                    <a href="#" class="close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                    <div class="header-searchform-box">
                        <form class="header-searchform">
                            <div class="searchform-wrap">
                                <input type="text" class="search-input" placeholder="Enter keywords to search..." />
                                <input type="submit" class="submit button" value="Search" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- <div class="item mobile-settings-box has-sub">
                <a href="#">
                    <span class="icon">
                        <i class="fa fa-cog" aria-hidden="true"></i>
                    </span>
                </a>
                <div class="block-sub">
                    <a href="#" class="close">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </a>
                    <div class="block-sub-item">
                        <h5 class="block-item-title">Currency</h5>
                        <form class="currency-form turan-language">
                            <ul class="turan-language-wrap">
                                <li class="active">
                                    <a href="#">
                                        <span>English (USD)</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span>French (EUR)</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span>Japanese (JPY)</span>
                                    </a>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div> -->
            <div class="item menu-bar">
                <a class="mobile-navigation" href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
        </div>
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