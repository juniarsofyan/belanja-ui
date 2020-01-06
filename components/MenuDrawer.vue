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
                    <li class="menu-item" @click="auth0Logout">
                        <a href="#" class="kt-item-title" title="Logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        auth0Logout() {
            this.$store.dispatch('authentication/auth0Logout')
            this.$store.dispatch('checkout/reset')
            this.$store.dispatch('cart/reset')
            this.$cookies.remove('key')
        }
    }
}
</script>