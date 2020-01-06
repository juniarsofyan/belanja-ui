<template>
    <!--wrap main content-->
    <div class="main-content main-content-checkout">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="tab-details-product" style="margin-bottom:30px;margin-top:0px;">
                        <!-- <ul class="tab-link">
                            <li class="active">
                                <a data-toggle="tab" aria-expanded="true" href="#profil"><i class="fa fa-user"></i>&nbsp;My Profile</a>
                            </li>
                            <li>
                                <a
                                    data-toggle="tab"
                                    aria-expanded="true"
                                    href="#semua "
                                ><i class="fa fa-book"></i>&nbsp;Address Book</a>
                            </li>
                        </ul> -->

                        <!-- {{ address }} -->

                        <div class="tab-container">
                            <div id="profil" class="tab-panel active">
                                <div class="col-md-10 col-md-offset-1">
                                    <div class="shipping-address-form-wrapp">
                                        <div
                                            class="shipping-address-form checkout-form"
                                            style="padding: 35px 27px 20px 27px !important; border:0px;"
                                        >
                                            <div class="col-12">
                                                <div class="shipping-address">
                                                    <nuxt-link :to="`/profile`">My Profile</nuxt-link> |
                                                    <nuxt-link :to="`/profile/addresses`">Addresses list</nuxt-link> |
                                                    <nuxt-link :to="`/profile/addresses/add`">Add New address</nuxt-link>
                                                    <br/><br/>

                                                    <div v-if="shipping_addresses.length > 0">
                                                        <div v-if="!defaultShippingAddressAvailable" class="text-center">
                                                            <br/>
                                                            <p style="color:red;font-style:italic;font-weight:bold;">
                                                                NOTE: You haven't set a default shipping address. Please set a default shipping address below!
                                                            </p>
                                                            <br/>
                                                        </div>
                                                        <div v-for="address in shipping_addresses" :key="address.id">
                                                            <!-- Id : {{ address.id }} <br/> -->
                                                            Nama : {{ address.nama }} <br/>
                                                            Telepon : {{ address.telepon }} <br/>
                                                            Provinsi : {{ address.provinsi_nama }} <br/>
                                                            Kota : {{ address.kota_nama }} <br/>
                                                            Kecamatan : {{ address.kecamatan_nama }} <br/>
                                                            Alamat : {{ address.alamat }} <br/>
                                                            Kode pos : {{ address.kode_pos }} <br/>
                                                            <!-- Is default? : {{ address.is_default }} <br/> -->
                                                            <nuxt-link :to="`/profile/addresses/${address.id}/edit`" tag="button">Edit</nuxt-link> 
                                                            <button class="btn-danger" @click="deleteShippingAddress(address.id)">Delete</button><br/>
                                                            <button v-if="address.is_default == 0" @click="setDefaultShippingAddress(address.id)">Set as default</button><br/>
                                                            <br/>
                                                        </div>
                                                    </div>
                                                    <div class="text-center" v-else>
                                                        <img src="~/assets/images/svg/no-addresses.svg" style="width:200px;" /><br/><br/>
                                                            <b><h3>Oops...</h3></b>
                                                            You have no shipping address. Click <nuxt-link to="/profile/addresses/add" style="color:pink;"> <b>here</b> </nuxt-link> to add new.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <nuxt-link tag="a" :to="`/checkout`" class="backtocheckout" v-if="previousRoute == 'checkout'">
            <i class="pe-7s-angle-left"></i> 
            <span>Checkout</span>
        </nuxt-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'products',
    middleware: ['affiliation', 'authorization'],
    data() {
        return {
            shipping_addresses: [],
            previousRoute: null
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.previousRoute = from.name
        })
    },
    computed: {
        ...mapGetters('authentication', ['user_data']),
        defaultShippingAddressAvailable: function() {
            let defaultAddressFound = this.shipping_addresses.find((address) => address.is_default == 1)

            if (defaultAddressFound) {
                return true
            }

            return false
        }
    },
    methods: {
        getShippingAddresses() {
            this.$axios.post(`shipping-address/all`, {
                email: this.user_data.email
            }).then(response => {
                if (response.data.data != 0) {
                    this.shipping_addresses = response.data.data
                }
            })
            .catch(e => {
                console.log(e)
            })
        },
        async setDefaultShippingAddress(id) {
            this.$swal({
                // title: "Saving address",
                text: "Setting as default",
                allowEscapeKey: false,
                allowOutsideClick: false,
                onOpen: () => {
                    this.$swal.showLoading()
                },
            })

            await this.$axios.post(`shipping-address/set-default`, {
                id: id
            }).then(response => {
                if (response.data.data == 1) {
                    this.$swal({
                        // title: "",
                        text: "Default shipping address set!",
                        type: "success",
                    }).then(() => {
                        this.getShippingAddresses()
                    })
                }
            })
            .catch(e => {
                console.log(e)
                this.$swal({
                    title: "Oops..",
                    text: "Cannot connect to the server, Please try again later",
                    type: "error",
                    onOpen: () => {
                        this.$swal.hideLoading()
                    },
                })
            })
        },
        async deleteShippingAddress(id) {
            await this.$swal({
                title: 'Confirm deletion',
                text: 'Delete this shipping address?',
                type: 'question',
                showCancelButton: true,
                // confirmButtonClass: "btn-danger",
                // confirmButtonColor: "#3085d6",
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
                // cancelButtonColor: "#d33",
            }).then((isConfirm) => {
                if (isConfirm.value) {
                    this.$swal({
                        // title: "Saving address",
                        text: "Deleting...",
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        onOpen: () => {
                            this.$swal.showLoading()
                        },
                    })

                    this.$axios.get(`shipping-address/${id}/delete`).then(response => {
                        if (response.data.data == 1) {
                            this.$swal({
                                // title: "",
                                text: "Shipping address deleted!",
                                type: "success",
                            }).then(() => {
                                this.getShippingAddresses()
                            })
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        this.$swal({
                            title: "Oops..",
                            text: "Cannot connect to the server, Please try again later",
                            type: "error",
                            onOpen: () => {
                                this.$swal.hideLoading()
                            },
                        })
                    })
                }
            })
        },
    },
    created() {
        this.getShippingAddresses()
    }
}
</script>

<style>
.backtocheckout {
     display: inline;
     width: 160px;
     height: 46px;
     font-size: 40px;
     /* font-weight: 600; */
     background: #333;
     border: 2px solid #f1f1f1;
     color: #fff;
     border-radius: 5px;
     position: fixed;
     bottom: 50px;
     left: 25px;
     text-align: left;
     line-height: 45px;
     z-index: 50;
}

.backtocheckout > span {
    font-size:20px;
}

.backtocheckout:hover {
    background: #fff;
    color: #333;
    border-color: #333;
}
</style>