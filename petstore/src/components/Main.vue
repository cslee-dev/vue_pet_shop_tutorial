<template>
  <div>
    <my-nav :cartItemCount="cartItemCount"></my-nav>
    <main>
      <div v-for="product in sortedProducts">
        <div class="row">
          <div class="col-md-5 col-md-offset-0">
            <figure>
              <img class="product" v-bind:src="product.image">
            </figure>
          </div>
          <div class="col-md-6 col-md-offset-0 description">
            <!-- <h1 v-text="product.title"></h1> -->
            <router-link tag="h1"
                         :to="{name: 'Id', params: {id: product.id}}">
              {{ product.title }}
            </router-link>
            <p v-html="product.description"></p>
            <p class="price">
              {{ product.price | formatPrice }}
            </p>
            <button class="btn btn-primary btn-lg"
                    v-on:click="addToCart(product)"
                    v-if="canAddToCart(product)">장바구니 담기
            </button>
            <button disabled="true" class="btn btn-primary btn-lg"
                    v-else>장바구니 담기
            </button>
            <transition name="bounce" mode="out-in">
              <span class="inventory-message"
                    v-if="product.availableInventory - cartCount(product) === 0" key="0">
                품절!
              </span>
                  <span class="inventory-message"
                        v-else-if="product.availableInventory - cartCount(product) < 5" key="">
                  {{ product.availableInventory - cartCount(product) }} 남았습니다!
              </span>
                  <span class="inventory-message" key=""
                        v-else>지금 구매하세요!
              </span>
            </transition>

            <div class="rating">
            <span v-bind:class="{'rating-active': checkRating(n, product)}"
                  v-for="n in 5">☆
            </span>
            </div>
          </div>
        </div><!-- end of row -->
        <hr/>
      </div><!-- end of v-for -->
    </main>
  </div>
</template>

<script>
import MyNav from './Nav.vue';

export default {
  name: "Main",
  data() {
    return {
      products: {},
      cart: []
    }
  },
  components: {MyNav},
  methods: {
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },
    addToCart(aProduct) {
      this.cart.push(aProduct.id)
    },
    canAddToCart(aProduct) {
      return (
        aProduct.availableInventory >
        this.cartCount(aProduct)
      )
    },
    cartCount(aProduct) {
      let count = 0;
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === aProduct.id) {
          count++;
        }
      }
      return count;
    },
  },
  computed: {
    cartItemCount() {
      return this.cart.length || '';
    },
    sortedProducts() {
      if (this.products.length > 0) {
        let productsArray = this.products.slice(0);

        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        }

        return productsArray.sort(compare);
      }
    }
  },
  filters: {
    formatPrice(price) {
      if (!parseInt(price)) {
        return '';
      }
      if (price > 99999) {
        var priceString = (price / 100).toFixed(2);
        var priceArray = priceString.split('').reverse();
        var index = 3;
        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ',');
          index += 4;
        }
        return '$' + priceArray.reverse().join('');
      } else {
        return '$' + (price / 100).toFixed(2);
      }
    }
  },
  created() {
    axios.get('/static/products.json').then(response => {
      this.products = response.data.products;
      console.log(this.products);
    })
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: shake .72s cubic-bezier(.37, .07, .19, .97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

@keyframes shake {
  10%, 90% {
    color: red;
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
