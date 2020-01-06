<template>
    <nuxt-link
        :to="`/products/${product.kode_barang}/detail`"
        tag="li"
        class="product-item product-type-variable col-lg-3 col-md-4 col-sm-6 col-xs-6 style-1"
    >
        <div class="product-inner equal-element">
            <div class="product-top">
                <div class="flash">
                    <span class="onnew">
                        <span class="text promo-caption">{{ product.promo_caption ? product.promo_caption : "&nbsp;" }}</span>
                    </span>
                </div>
                <!-- <div class="yith-wcwl-add-to-wishlist">
                    <div class="yith-wcwl-add-button">
                        <a href="#">Add to Wishlist</a>
                    </div>
                </div> -->
            </div>
            <div class="product-thumb">
                <div class="thumb-inner">
                    <a href="#">
                        <img
                            :src="`${$axios.defaults.baseURL}assets/img/thumbnails/${product.pic}.jpg`"
                            alt
                        />
                    </a>
                </div>
                <!-- <a href="#" class="button quick-wiew-button"></a> -->
            </div>
            <div class="product-info">
                <h5 class="product-name product_title fix-product-name">
                    <a href="#">{{ product.nama }}</a>
                </h5>
                <div class="group-info">
                    <!-- <div class="stars-rating">
            <div class="star-rating">
              <span class="star-4"></span>
            </div>
            <div class="count-star">(7)</div>
                    </div>-->

                    <div class="price" v-if="product.harga_diskon > 0 && product.harga > product.harga_diskon">
                        <del>{{ product.harga | rupiah }}</del>
                        <ins>{{ product.harga_diskon | rupiah }}</ins>
                    </div>
                    <div class="price" v-else>{{ product.harga | rupiah }}</div>
                </div>
            </div>
            <div class="loop-form-add-to-cart">
                <div class="cart">
                    <div class="single_variation_wrap">
                        <div class="quantity">
                            <div class="control">
                                <span class="btn-number qtyminus quantity-minus" @click="minQty">-</span>
                                <input
                                    type="text"
                                    data-step="1"
                                    min="0"
                                    title="Qty"
                                    class="input-qty qty"
                                    size="4"
                                    v-model="qty"
                                />
                                <span class="btn-number qtyplus quantity-plus" @click="addQty">+</span>
                            </div>
                        </div>
                        <button
                            class="single_add_to_cart_button button"
                            @click="addItem"
                        >Add to cart</button>
                    </div>
                    <!-- <div class="variations">
            <div class="variation">
              <label class="variation-label">Capacity:</label>
              <div class="variation-value">
                <a href="#" class="change-value text">
                  <span>10ml</span>
                </a>
                <a href="#" class="change-value text">
                  <span>20ml</span>
                </a>
                <a href="#" class="change-value text">
                  <span>50ml</span>
                </a>
              </div>
            </div>
                    </div>-->
                </div>
            </div>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    props: ['product'],
    data() {
        return {
            qty: 1
        }
    },
    methods: {
        addQty: function() {
            this.qty++
        },
        minQty: function() {
            if (this.qty > 1) {
                this.qty--
            }
        },
        addItem: function() {
            this.product.qty = this.qty
            this.$store.dispatch('cart/addItem', this.product)
            this.qty = 1
            this.$toast.global.cartadd({ 
                message: `Added &nbsp; <b>${this.product.nama } (x${this.product.qty})</b>` 
            })
        }
    }
}
</script>

<style>
.promo-caption {
    color: red;
    text-align: right;
}
</style>
