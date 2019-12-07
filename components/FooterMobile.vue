<template>
    <div class="footer-device-mobile">
        <div class="wapper">
            <div class="footer-device-mobile-item device-home">
                <a href="#">
                    <span class="icon">
                        <i class="fa fa-home" aria-hidden="true"></i>
                    </span>
                    <nuxt-link to="/"> Home </nuxt-link>
                </a>
            </div>
            <div class="footer-device-mobile-item device-home device-cart">
                <a href="#">
                    <span class="icon">
                        <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                        <span class="count-icon">{{ cart_count }}</span>
                    </span>
                    <nuxt-link to="/cart" tag="span" class="text"> Cart </nuxt-link>
                </a>
            </div>
            <div class="footer-device-mobile-item device-home device-user">
                <a href="#">
                    <span class="icon">
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </span>
                    <nuxt-link to="/profile"> Profile </nuxt-link>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        cart_count: function () {
            return this.$store.getters['cart/count']
        }
    }
}
</script>