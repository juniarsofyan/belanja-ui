<template>
    <div>
        <!-- breadcrumb -->
        <div class="breadcrumb-trail breadcrumbs">
            <ul class="trail-items breadcrumb">
                <nuxt-link to="/" tag="li" class="trail-item trail-begin">
                    <a href="#">
                        <span>Home</span>
                    </a>
                </nuxt-link>

                <nuxt-link
                    :to="`/products/${product.jenis}`"
                    tag="li"
                    class="trail-item trail-begin"
                >
                    <a href="#">
                        <span>{{ product.jenis }}</span>
                    </a>
                </nuxt-link>

                <nuxt-link
                    :to="`/products/${product.kode_barang}/detail`"
                    tag="li"
                    class="trail-item trail-end active"
                >
                    <a href="#">
                        <span>{{ product.nama }}</span>
                    </a>
                </nuxt-link>
            </ul>
        </div>

        <!-- main content -->
        <div class="row">
            <!-- sidemain -->
            <div
                class="content-area content-details full-width col-lg-9 col-md-8 col-sm-12 col-xs-12"
            >
                <div class="site-main">
                    <!-- media box -->
                    <div class="details-product single-product-galery">
                        <div class="details-thumd">
							<img :src="`${$axios.defaults.baseURL}assets/img/products/${product.pic}.jpg`" />
                        </div>
                        <div class="details-infor">
                            <h1 class="product-title">{{ product.nama }}</h1>
                            <div class="availability" style="margin-left:0px;">
                                Product Code:
                                <a href="#">{{ product.kode_barang }}</a>
                            </div>
                            <div class="price" v-if="product.harga_diskon > 0 && product.harga > product.harga_diskon">
                                <span class="old-price"><small>{{ product.harga | rupiah }}</small></span><br/>
                                <span>{{ product.harga_diskon | rupiah }}</span>
                            </div>
                            <div class="price" v-else>
                                <span>{{ product.harga | rupiah }}</span>
                            </div>
                            <div class="product-details-description">
                                <p class="desc">{{ product.des_singkat }}</p>
                                <p class="desc" v-html="product.manfaat"></p>
                                <br />
                            </div>
                            <div class="group-button">
                                <!-- <div class="yith-wcwl-add-to-wishlist">
									<div class="yith-wcwl-add-button">
										<a href="#">Add to Wishlist</a>
									</div>
                                </div>-->
                                <div class="quantity-add-to-cart">
                                    <div class="quantity">
                                        <div class="control">
                                            <span
                                                class="btn-number qtyminus quantity-minus"
                                                @click="minQty"
                                            >-</span>
                                            <input
                                                type="text"
                                                data-step="1"
                                                data-min="1"
                                                v-model="qty"
                                                title="Qty"
                                                class="input-qty qty"
                                                size="4"
                                            />
                                            <span
                                                class="btn-number qtyplus quantity-plus"
                                                @click="addQty"
                                            >+</span>
                                        </div>
                                    </div>
                                    <button
                                        class="single_add_to_cart_button button"
                                        @click="addItem"
                                    >
                                        Add to
                                        cart
                                    </button>
                                </div>

                                <p>&nbsp;</p>
                                <p>&nbsp;</p>

                                <div class="contact-bc">
                                    <p>Temukan produk perawatan yang sesuai dengan kebutuhanmu hanya Bersama Bellezkin. Dapatkan gratis konsultasi bersama Beauty Consultant kami :)</p>
                                    <a
                                        :href="`https://api.whatsapp.com/send?phone=628112288142&text=Halo!%0ASaya%20ingin%20ingin%20konsultasi%20lebih%20lanjut%20mengenai%20produk%20Bellezkin%0ASource : ${url}`"
                                        class="single_bc_button button"
                                        target="_blank"
                                    >
                                        <i class="fab fa-whatsapp logo_bc"></i>&nbsp;
                                        Contact Beauty Consultant
                                    </a>
                                </div>

                                <p id="warn">
                                    &nbsp; Klik
                                    <i class="fas fa-arrow-up"></i> untuk langsung terhubung via WhatssApp
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- details atbs -->
                    <div class="row">
                        <!-- <div class="col-lg-6"> -->
                        <!-- <br><br><br>
							<center>
								<h3> Promote Product </h3>
                        </center>-->
                        <!-- <div class="row"> -->
                        <!-- item Also Like start-->
                        <!-- <div class="col-lg-4">
									<div class="product-item default-layout product-type-variable">
										<div class="product-inner equal-element">
											<div class="product-top">
												<div class="flash">
													<span class="onnew">
														<span class="text">
															new
														</span>
													</span>
												</div>
												<div class="yith-wcwl-add-to-wishlist">
													<div class="yith-wcwl-add-button">
														<a href="#">Add to Wishlist</a>
													</div>
												</div>
											</div>
											<div class="product-thumb">
												<div class="thumb-inner">
													<a href="#">
														<img src="https://givecatsabetterlife.com/wp-content/uploads/2018/10/ybJsG7Zty1s_hqdefault.jpg"
															alt="">
													</a>
												</div>
												<a href="#" class="button quick-wiew-button">Quick View</a>
											</div>
											<div class="product-info">
												<h5 class="product-name product_title">
													<a href="#">Beard Tumbleweed Oil</a>
												</h5>
												<div class="group-info">
													<div class="stars-rating">
														<div class="star-rating">
															<span class="star-3"></span>
														</div>
														<div class="count-star">
															(3)
														</div>
													</div>
													<div class="price">
														<del>
															€65
														</del>
														<ins>
															€45
														</ins>
													</div>
												</div>
											</div>
											<div class="loop-form-add-to-cart">
												<form class="cart">
													<div class="single_variation_wrap">
														<div class="quantity">
															<div class="control">
																<a class="btn-number qtyminus quantity-minus"
																	href="#">-</a>
																<input type="text" data-step="1" data-min="0" value="1"
																	title="Qty" class="input-qty qty" size="4">
																<a href="#"
																	class="btn-number qtyplus quantity-plus">+</a>
															</div>
														</div>
														<button class="single_add_to_cart_button button">Add to
															cart</button>
													</div>
													<div class="variations">
														<div class="variation">
															<label class="variation-label">
																Capacity:
															</label>
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
													</div>
												</form>
											</div>
										</div>
									</div>
                        </div>-->
                        <!-- item promoted end-->
                        <!-- item Also Like start-->
                        <!-- <div class="col-lg-4">
									<div class="product-item default-layout product-type-variable">
										<div class="product-inner equal-element">
											<div class="product-top">
												<div class="flash">
													<span class="onnew">
														<span class="text">
															new
														</span>
													</span>
												</div>
												<div class="yith-wcwl-add-to-wishlist">
													<div class="yith-wcwl-add-button">
														<a href="#">Add to Wishlist</a>
													</div>
												</div>
											</div>
											<div class="product-thumb">
												<div class="thumb-inner">
													<a href="#">
														<img src="https://givecatsabetterlife.com/wp-content/uploads/2018/10/ybJsG7Zty1s_hqdefault.jpg"
															alt="">
													</a>
												</div>
												<a href="#" class="button quick-wiew-button">Quick View</a>
											</div>
											<div class="product-info">
												<h5 class="product-name product_title">
													<a href="#">Beard Tumbleweed Oil</a>
												</h5>
												<div class="group-info">
													<div class="stars-rating">
														<div class="star-rating">
															<span class="star-3"></span>
														</div>
														<div class="count-star">
															(3)
														</div>
													</div>
													<div class="price">
														<del>
															€65
														</del>
														<ins>
															€45
														</ins>
													</div>
												</div>
											</div>
											<div class="loop-form-add-to-cart">
												<form class="cart">
													<div class="single_variation_wrap">
														<div class="quantity">
															<div class="control">
																<a class="btn-number qtyminus quantity-minus"
																	href="#">-</a>
																<input type="text" data-step="1" data-min="0" value="1"
																	title="Qty" class="input-qty qty" size="4">
																<a href="#"
																	class="btn-number qtyplus quantity-plus">+</a>
															</div>
														</div>
														<button class="single_add_to_cart_button button">Add to
															cart</button>
													</div>
													<div class="variations">
														<div class="variation">
															<label class="variation-label">
																Capacity:
															</label>
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
													</div>
												</form>
											</div>
										</div>
									</div>
                        </div>-->
                        <!-- item promoted end-->
                        <!-- item Also Like start-->
                        <!-- <div class="col-lg-4">
									<div class="product-item default-layout product-type-variable">
										<div class="product-inner equal-element">
											<div class="product-top">
												<div class="flash">
													<span class="onnew">
														<span class="text">
															new
														</span>
													</span>
												</div>
												<div class="yith-wcwl-add-to-wishlist">
													<div class="yith-wcwl-add-button">
														<a href="#">Add to Wishlist</a>
													</div>
												</div>
											</div>
											<div class="product-thumb">
												<div class="thumb-inner">
													<a href="#">
														<img src="https://givecatsabetterlife.com/wp-content/uploads/2018/10/ybJsG7Zty1s_hqdefault.jpg"
															alt="">
													</a>
												</div>
												<a href="#" class="button quick-wiew-button">Quick View</a>
											</div>
											<div class="product-info">
												<h5 class="product-name product_title">
													<a href="#">Beard Tumbleweed Oil</a>
												</h5>
												<div class="group-info">
													<div class="stars-rating">
														<div class="star-rating">
															<span class="star-3"></span>
														</div>
														<div class="count-star">
															(3)
														</div>
													</div>
													<div class="price">
														<del>
															€65
														</del>
														<ins>
															€45
														</ins>
													</div>
												</div>
											</div>
											<div class="loop-form-add-to-cart">
												<form class="cart">
													<div class="single_variation_wrap">
														<div class="quantity">
															<div class="control">
																<a class="btn-number qtyminus quantity-minus"
																	href="#">-</a>
																<input type="text" data-step="1" data-min="0" value="1"
																	title="Qty" class="input-qty qty" size="4">
																<a href="#"
																	class="btn-number qtyplus quantity-plus">+</a>
															</div>
														</div>
														<button class="single_add_to_cart_button button">Add to
															cart</button>
													</div>
													<div class="variations">
														<div class="variation">
															<label class="variation-label">
																Capacity:
															</label>
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
													</div>
												</form>
											</div>
										</div>
									</div>
                        </div>-->
                        <!-- item promoted end-->

                        <!-- </div> -->
                        <!-- </div> -->
                        <div class="col-lg-12">
                            <div class="tab-details-product" style="margin-bottom:30px;">
                                <ul class="tab-link" style="text-align:left">
                                    <li class="active">
                                        <a
                                            data-toggle="tab"
                                            aria-expanded="true"
                                            href="#product-descriptions"
                                        >Descriptions</a>
                                    </li>
                                    <li class>
                                        <a
                                            data-toggle="tab"
                                            aria-expanded="true"
                                            href="#product-guide "
                                        >How to use</a>
                                    </li>
                                </ul>
                                <div class="tab-container">
                                    <div id="product-descriptions" class="tab-panel active">
                                        <p>{{ product.deskripsi }}</p>
                                    </div>
                                    <div id="product-guide" class="tab-panel">
                                        <p>{{ product.cara_pakai }}</p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="reset-floatding"></div>
                            <div class="row">
                                <div class="col-lg-12" style="background: lightpink;">
                                    <br />
                                    <center style="margin-bottom:20px">
                                        <h3>You May Also Like</h3>
                                    </center>

                                    <slick ref="slick" :options="slickOptions">
                                        <div
                                            class="product-item default-layout product-type-variable"
                                            v-for="product in related_products"
                                            style="padding:10px;padding-bottom: 15px;"
                                            :key="product.kode_barang"
                                        >
                                            <nuxt-link tag="div" :to="`/products/${product.kode_barang}/detail`"
                                                class="product-inner equal-element"
                                                style="border-radius: 6px;border:none;"
                                            >
                                                <div class="product-thumb">
                                                    <div class="thumb-inner">
                                                        <a href="#">
                                                            <img
                                                                :src="`${$axios.defaults.baseURL}assets/img/thumbnails/${product.pic}.jpg`"
                                                                :alt="product.nama"
                                                                style="display: unset;"
                                                            />
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="text-center">
                                                    <h5
                                                        class="product-name product_title"
                                                        style="height: 44px; overflow: hidden;"
                                                    >
                                                        <a href="#">{{ product.nama }}</a>
                                                    </h5>
                                                    <div class="group-info">
                                                        <div class="price">
                                                            <!-- <del>€65</del> -->
                                                            <ins>{{ product.harga | rupiah }}</ins>
                                                        </div>
                                                    </div>
                                                </div>
                                            </nuxt-link>
                                        </div>
                                    </slick>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import axios from 'axios'

	export default {
		layout: 'product',
		middleware: ['affiliation'],
		components: {
			// RelatedProducts: () => import('~/components/RelatedProducts')
		},
		data() {
			return {
				dataLoaded: false,
				code: this.$route.params.code,
				product: [],
				related_products: [],
				qty: 1,
				url: document.URL,
				slickOptions: {
					infinite: false,
					dots: false,
					autoplay: true,
					arrows: false,
					prevArrow: '<small> < </small>',
					nextArrow: '<small> > </small>',
					responsive: [{
							breakpoint: 5121,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 2561,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 1441,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 1154,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 1025,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 769,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 425,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 1
							}
						},
						{
							breakpoint: 376,
							settings: {
								slidesToShow: 3
							}
						}
					]
				}
			}
		},
		head() {
			return {
				bodyAttrs: {
					class: this.dataLoaded ?
						'home-page home page page-id-4 page-template page-template-template-homepage page-template-template-homepage-php' :
						''
				}
			}
		},
		watch: {
			'$route.params.code': {
				handler: function (code) {
					this.getProductDetail(code)
				},
				deep: true,
				immediate: true
			}
		},
		computed: {
			//   productTitle: function() {
			//     return this.category.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).replace(" ", "");
			//   }
		},
		methods: {
			getProductDetail(code) {
				this.$axios
					.get(`products/${code}/detail`)
					.then((response) => {
						if (response.data.data != 0) {
							this.product = response.data.data
							this.getRelatedProducts()
							// this.getRelatedPromoItems()
							// this.getDiscountedItem()
						}
					})
					.catch((e) => {
						console.log(e)
					})
			},
			getRelatedProducts() {
				this.$axios
					.get(
						`/products/${this.product.jenis}/related/${this.product.kode_barang}`
					)
					.then((response) => {
						if (response.data.data != 0) {
							this.related_products = response.data.data
							// this.complete = true;
							this.reInit();
						}
					})
					.catch((e) => {
						console.log(e)
					})
			},
			addQty: function () {
				this.qty++
			},
			minQty: function () {
				if (this.qty > 1) {
					this.qty--
				}
			},
			addItem: function () {
				this.product.qty = this.qty
				this.$store.dispatch('cart/addItem', this.product)
				this.qty = 1
				this.$toast.global.cartadd({ 
                	message: `Added &nbsp; <b>${this.product.nama } (x${this.product.qty})</b>` 
            	})
			},
			next() {
				this.$refs.slick.next();
			},
			prev() {
				this.$refs.slick.prev();
			},

			reInit() {
				let currIndex = this.$refs.slick.currentSlide()
				this.$refs.slick.destroy()
				this.$nextTick(() => {
					this.$refs.slick.create()
					this.$refs.slick.goTo(currIndex, true)
				})
			},
		}
	}
</script>

<style>
	.custom_blog_title {
		text-transform: captialize;
	}
	.old-price {
		text-decoration: line-through;
		color: grey;
	}
</style>