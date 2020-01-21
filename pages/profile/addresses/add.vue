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
                                <div class="col-md-12">
                                    <div class="shipping-address-form-wrapp">
                                        <div
                                            class="shipping-address-form checkout-form"
                                            style="padding: 35px 27px 20px 27px !important; border:0px;"
                                        >
                                            <div class="col-12">
                                                <div class="shipping-address">

                                                    <div class="tab-base mt-4" id="tab-program">
                                                        <ul class="nav nav-justified nav-base" id="tab" role="tablist">
                                                            <li class="nav-item">
                                                                    <nuxt-link class="nav-link py-3" id="detail-tab" data-toggle="tab"
                                                                    role="tab" aria-controls="detail" aria-selected="true" :to="`/profile`">My Profile</nuxt-link>
                                                            </li>
                                                            <li class="nav-item">
                                                                <nuxt-link class="nav-link py-3" id="detail-tab" data-toggle="tab"
                                                                role="tab" aria-controls="detail" aria-selected="true" :to="`/profile/addresses`">Addresses list</nuxt-link>
                                                            </li>
                                                            <li class="nav-item">
                                                                <nuxt-link class="nav-link py-3" id="detail-tab" data-toggle="tab"
                                                                role="tab" aria-controls="detail" aria-selected="true" :to="`/profile/addresses/add`">Add New address</nuxt-link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <br/><br/>
                                                    
                                                    <p class="col-12">
                                                        <label class="text">Name</label>
                                                        <input
                                                            type="text"
                                                            style="width:100%"
                                                            class="input-text"
                                                            v-model="name"
                                                            id="name"
                                                            ref="name"
                                                        />
                                                    </p>
                                                    <p class="col-12">
                                                        <label class="text">Phone</label>
                                                        <input
                                                            type="text"
                                                            style="width:100%"
                                                            class="input-text"
                                                            v-model="phone"
                                                            id="phone"
                                                            ref="phone"
                                                        />
                                                    </p>
                                                    <p class="col-12">
                                                        <label class="text">Province</label>
                                                        <br />
                                                        <select
                                                            style="width:100%;"
                                                            data-placeholder="London"
                                                            class="input-text"
                                                            tabindex="1"
                                                            @change="setProvinceToModel($event)"
                                                        >
                                                            <option disabled selected>- Choose Province -</option>
                                                            <option
                                                                v-for="prov in provinces"
                                                                :key="prov.province_id"
                                                                :value="prov"
                                                                :selected="(province ? province.province_id == prov.province_id : false)"
                                                                :data-province-id="prov.province_id"
                                                                :data-province-name="prov.province"
                                                            >{{ prov.province }}
                                                            </option>
                                                        </select>
                                                    </p>

                                                    <p class="col-12">
                                                        <label class="text">City</label>
                                                        <br />
                                                        <select
                                                            style="width:100%;"
                                                            data-placeholder="London"
                                                            class="input-text"
                                                            tabindex="1"
                                                            @change="setCityToModel($event)"
                                                        >
                                                            <option disabled selected>- Choose City -</option>
                                                            <option
                                                                v-for="cty in cities"
                                                                :key="cty.city_id"
                                                                :value="cty"
                                                                :selected="(city ? city.city_id == cty.city_id : false)"
                                                                :data-city-id="cty.city_id"
                                                                :data-city-name="cty.city_name"
                                                            >{{ cty.city_name }}
                                                            </option>
                                                        </select>
                                                    </p>

                                                    <p class="col-12">
                                                        <label class="text">Subdistrict</label>
                                                        <br />
                                                        <select
                                                            style="width:100%;"
                                                            data-placeholder="London"
                                                            class="input-text"
                                                            tabindex="1"
                                                            @change="setSubdistrictToModel($event)"
                                                        >
                                                            <option disabled selected>- Choose City -</option>
                                                            <option
                                                                v-for="subdist in subdistricts"
                                                                :key="subdist.subdistrict_id"
                                                                :value="subdist"
                                                                :selected="(subdistrict ? subdistrict.subdistrict_id == subdist.subdistrict_id : false)"
                                                                :data-subdistrict-id="subdist.subdistrict_id"
                                                                :data-subdistrict-name="subdist.subdistrict_name"
                                                            >{{ subdist.subdistrict_name }}
                                                            </option>
                                                        </select>
                                                    </p>

                                                    <p class="col-12">
                                                        <label class="text">Address</label>
                                                        <textarea
                                                            class="input-text"
                                                            id="exampleFormControlTextarea1"
                                                            rows="3"
                                                            v-model="address"
                                                        ></textarea>
                                                    </p>
                                                    <p class="col-12">
                                                        <label class="text">Post Code</label>
                                                        <input
                                                            type="text"
                                                            style="width:100%"
                                                            class="input-text"
                                                            v-model="postcode"
                                                        />
                                                    </p>
                                                    
                                                    <button
                                                        class="button"
                                                        @click="addNewAddress()"
                                                    >Add Address</button>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    layout: 'products',
    middleware: ['affiliation', 'authorization'],
    data() {
        return {
            name: "",
            phone: "",
            provinces: [],
            cities: [],
            subdistricts: [],
            province: {
                province_id : false,
                province_name: false
            },
            city: {
                city_id : false,
                city_name: false
            },
            subdistrict: {
                subdistrict_id : false,
                subdistrict_name: false
            },
            address: "",
            postcode: ""
        }
    },
    watch: {
        'province': {
            handler(val) {
                if (val) {
                    this.getCities(val.province_id)
                }
            },
            deep: true
        },
        'city': {
            handler(val) {
                if (val) {
                    this.getSubdistricts(val.city_id)
                }
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters('authentication', ['user_data'])
    },
    methods: {
        setProvinceToModel(event) {
            this.province.province_id = parseInt(event.target.options[event.target.options.selectedIndex].dataset.provinceId)
            this.province.province_name = event.target.options[event.target.options.selectedIndex].dataset.provinceName
        },
        setCityToModel(event) {
            this.city.city_id = parseInt(event.target.options[event.target.options.selectedIndex].dataset.cityId)
            this.city.city_name = event.target.options[event.target.options.selectedIndex].dataset.cityName
        },
        setSubdistrictToModel(event) {
            this.subdistrict.subdistrict_id = parseInt(event.target.options[event.target.options.selectedIndex].dataset.subdistrictId)
            this.subdistrict.subdistrict_name = event.target.options[event.target.options.selectedIndex].dataset.subdistrictName
        },
        async addNewAddress() {
            if (this.validateAddress()) {
                this.$swal({
                    title: "Saving address",
                    // text: "Processing",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    onOpen: () => {
                        this.$swal.showLoading()
                    },
                })

                await this.$axios.post(`shipping-address/add`, {
                    email: this.user_data.email,
                    name: this.name,
                    phone: this.phone,
                    province_id: this.province.province_id,
                    province_name: this.province.province_name,
                    city_id: this.city.city_id,
                    city_name: this.city.city_name,
                    subdistrict_id: this.subdistrict.subdistrict_id,
                    subdistrict_name: this.subdistrict.subdistrict_name,
                    address: this.address,
                    postcode: this.postcode
                }).then(response => {
                    if (response.data.data == 1) {
                        this.$swal({
                            // title: "",
                            text: "Address added!",
                            type: "success",
                        }).then(() => {
                            this.$router.push({
                                name: "profile-addresses",
                            })
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
            } else {
                this.$swal({
                    title: "Oops..",
                    text: "Please complete shipping address form",
                    type: "warning"
                })
            }
        },
        validateAddress() {
            if (this.name == "") {
                return false
            }

            if (this.phone == "") {
                return false
            }

            if (this.province == "" || this.province.length < 1) {
                return false
            }

            if (this.city == "" || this.city.length < 1) {
                return false
            }

            if (this.subdistrict == "" || this.subdistrict.length < 1) {
                return false
            }

            if (this.address == "") {
                return false
            }

            if (this.postcode == "") {
                return false
            }

            return true
        },
        getProvinces() {
            this.provinces = this.$axios.get(`ongkir/provinces`)
                .then(response => {
                    if (response.data.data != 0) {
                        this.provinces = response.data.data
                    } else {
                        this.provinces = []
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
        getCities(province_id) {
            this.$axios.get(`ongkir/province/` + province_id + `/cities` )
                .then(response => {
                    if (response.data.data != 0) {
                        var cities = response.data.data
                        var data = []

                        for (var city in cities) {
                            data.push({
                                city_id: cities[city].city_id,
                                city_name: cities[city].type + " " + cities[city].city_name,
                            })
                        }
                        this.cities = data
                    } else {
                        this.cities = []
                    }
                })
                .catch(e => {
                    console.log(e)
                })

                this.subdistricts = []
        },
        getSubdistricts(city_id) {
            this.$axios.get(`ongkir/city/` + city_id + `/subdistricts` )
                .then(response => {
                    if (response.data.data != 0) {
                        var subdistricts = response.data.data
                        var data = []
                        for (var subdistrict in subdistricts) {
                            data.push({
                                subdistrict_id: subdistricts[subdistrict].subdistrict_id,
                                subdistrict_name: subdistricts[subdistrict].subdistrict_name
                            })
                        }
                        this.subdistricts = data
                    } else {
                        this.subdistricts = []
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        },
    },
    created() {
        this.getProvinces()
    }
}
</script>