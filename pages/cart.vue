<template>
    <div class="site-content">
        <main class="site-main main-container no-sidebar">
            <div class="container">
                <!-- breadcrumb -->
                <div class="breadcrumb-trail breadcrumbs">
                    <ul class="trail-items breadcrumb">
                        <li class="trail-item trail-begin active">
                            <span>My Cart</span>
                        </li>
                        <li class="trail-item trail-end">
                            <span>Checkout</span>
                        </li>
                        <li class="trail-item trail-end">
                            <span>Payment</span>
                        </li>
                    </ul>
                </div>

                <!-- main content -->
                <div class="row">
                    <div class="main-content-cart main-content">
                        <div class="page-main-content">
                            <div class="shoppingcart-content">
                                <!-- <form action="shoppingcart.html" class="cart-form">
                                    <table class="shop_table">
                                        <thead>
                                            <tr>
                                                <th class="product-remove"></th>
                                                <th class="product-thumbnail"></th>
                                                <th class="product-name"></th>
                                                <th class="product-price"></th>
                                                <th class="product-quantity"></th>
                                                <th class="product-subtotal"></th>
                                            </tr>
                                        </thead>
                                <tbody>-->
                                <div class="col-md-8 col-sm-12">
                                    <CartItem
                                        v-for="item in items"
                                        :key="item.product_code"
                                        :item="item"
                                    />
                                </div>
                                <div class="col-md-4 col-sm-12">
                                    <!-- <div class="coupon">
                                        <label class="coupon_code">Coupon Code:</label>
                                        <div class="coupon-wrapp">
                                            <input
                                                type="text"
                                                class="input-text"
                                                placeholder="Promotion code here"
                                            />
                                            <a href="#" class="button"></a>
                                        </div>
                                    </div> -->
                                    <div class="cart-wrap-summary">
                                        <div class="cart-total-checkout">
                                            <div class="cart-total-item">
                                                <div>Total Price</div>
                                                <div
                                                    class="cart-total-value"
                                                >{{ subtotal | rupiah }}</div>
                                            </div>
                                            <div class="cart-total-item">
                                                <div>Grand Total</div>
                                                <div
                                                    class="cart-total-value"
                                                >{{ grand_total | rupiah }}</div>
                                            </div>
                                        </div>
                                        <div class="control-cart">
                                            <!-- <nuxt-link
                                            :to="`/`"
                                            tag="button"
                                            class="button btn-continue-shopping"
                                            >CONTINUE SHOPPING</nuxt-link>-->

                                            <button
                                                v-if="!userIsAuthorized"
                                                @click="warnSignIn"
                                                class="button button-checkout btn-cart-to-checkout"
                                            >CHECKOUT NOW</button>
                                            <nuxt-link
                                                v-else
                                                :to="`/checkout`"
                                                tag="button"
                                                class="button button-checkout btn-cart-to-checkout"
                                            >CHECKOUT NOW</nuxt-link>
                                        </div>
                                    </div>
                                </div>
                                <!-- </tbody>
                                </table>-->
                                <!-- </form> -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- full width layout have no sidebar-->
            </div>
        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CartItem from '~/components/CartItem.vue'
export default {
    layout: 'products',
    components: {
        CartItem
    },
    computed: {
        ...mapGetters('authentication', ['userIsAuthorized']),
        ...mapGetters('cart', [
            'items',
            'subtotal',
            'grand_total'
        ])
    },
    methods: {
        warnSignIn() {
            this.$swal({
                title: 'Oops!',
                text: 'Please sign in to checkout',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('authentication/auth0Login')
            })
        }
    }
}
</script>

<style>
</style>