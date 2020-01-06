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
                                <input
                                    type="text"
                                    class="search-input"
                                    placeholder="e.g. product code, name or category"
                                    v-model="keyword"
                                />
                                <nuxt-link
                                    :to="`/products/search?keyword=${keyword}`"
                                    tag="button"
                                    class="submit button"
                                >Search</nuxt-link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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
export default {
    data() {
        return {
            keyword: '' // this.$route.query.keyword
        }
    }
}
</script>