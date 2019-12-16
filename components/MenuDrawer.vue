<template>
    <div class="kt-clone-wrap">
        <div class="kt-panels-actions-wrap">
            <a class="kt-close-btn kt-close-panels" href="#">x</a>
        </div>
        <div class="kt-panels">
            <div id="kt-panel-menu-main-menu" class="kt-panel kt-main-panel">
                <ul class="depth-01">
                    <nuxt-link to="/" tag="li" class="menu-item clone-menu-item">
                        <a href="#" class="kt-item-title" title="Home">Home</a>
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
                </ul>
            </div>
        </div>
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
            this.$cookies.remove('key')
        }
    }
}
</script>