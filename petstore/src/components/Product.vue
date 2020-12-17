<template>
  <div>
    <my-nav></my-nav>
    <h1>id {{ $route.params.id }} 입니다.</h1>
    <div class="row">
      <div class="col-md-5 col-md-offset-0">
        <figure>
          <img :src="product.image" class="product">
        </figure>
      </div>
      <div class="col-md-6 col-md-offset-0 description">
        <h1>{{ product.title }}</h1>
        <p v-html="product.description"></p>
        <p class="price">{{ product.price }}</p>
        <button @click="edit">상품 수정</button>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MyNav from './Nav.vue';

export default {
  name: "Product",
  data() {
    return {
      product: ''
    }
  },
  created() {
    axios.get('/static/products.json')
      .then(response => {
        this.product = response.data.products.filter(
          data => data.id == this.$route.params.id
        )[0];
        this.product.image = '/' + this.product.image;
      })
  },
  methods: {
    edit() {
      this.$router.push({name: 'Edit'});
    }
  },
  components: {MyNav}
}
</script>

<style scoped>

</style>
