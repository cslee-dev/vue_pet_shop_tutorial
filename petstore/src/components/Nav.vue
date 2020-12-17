<template>
  <nav>
    <div class="navbar navbar-default">
      <div class="navbar-header">
        <h1>
          <router-link :to="{name:'iMain'}">{{ sitename }}</router-link>
        </h1>
      </div>
      <div class="nav navbar-nav navbar-right cart">
        <router-link :to="{name: 'Form'}" tag="button" class="btn btn-default btn-lg">
          <span class="glyphicon glyphicon-shopping-cart">{{ cartItemCount }}</span>
          체크아웃
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav",
  props: ['cartItemCount'],
  data() {
    return {
      sitename: 'Vue.js 애완용품샵',
    }
  },
  methods: {
    showCheckout() {
      this.$router.push({name: 'Form'});
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000000;
}

.router-link-exact-active {
  color: blue;
}
</style>
