Vue.component("carousel", {
  template: "#v-carousel",
  data() {
    return { 
      name: 'view',
      show: false,
      currentOffset: 0,
      windowSize: 3,
      paginationFactor: 220,
      carousel: {index: 0, id: 1, name: 'Tycoon Thai', tag: "Thai", class: 'hidden'},
      items: [
        {id: 0, price: 50, qty: 0, name: 'Tycoon Thai', tag: "Thai"},
        {id: 1, price: 50, qty: 0, name: 'Ippudo', tag: "Japanese"},
        {id: 2, price: 50, qty: 0, name: 'Milano', tag: "Pizza"},
        {id: 3, price: 50, qty: 0, name: 'Tsing Tao', tag: "Chinese"},
        {id: 4, price: 50, qty: 0, name: 'Frances', tag: "French"},
        {id: 5, price: 50, qty: 0, name: 'Burma Superstar', tag: "Burmese"},
        {id: 6, price: 50, qty: 0, name: 'Salt and Straw', tag: "Ice cream"},
      ],
      cart: [],
      showCart: false
    } 
  },
   computed: {
    totalCart() {
      return '$'+this.cart.reduce((a, b) => { return a+(b.qty*b.price)}, 0).toFixed(2)
    },
    atEndOfList() {
      return this.currentOffset <= (this.paginationFactor * -1) * (this.items.length - this.windowSize);
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    price(qty, pri) { return (qty*pri).toFixed(2)},
    delCart(id) {
      this.cart = this.cart.filter(item => item.id != id)
    },
    addCart(id, qty){ 
      let edit = false
      this.cart.map(function(item) {
        console.log(this.items)
        if (item.id == this.items[id].id) {
          item.qty += this.items[id].qty
          item.price = this.items[id].price
          this.items[id].qty = 0
          edit = true
        }
        return item
      }.bind(this))
      if(!edit) {
        this.cart.push(Object.assign({}, this.items[id]))
        this.items[id].qty = 0
      }
    },
    showCarousel(index) { 
      // this.carousel = {...this.items[index], class: '', index: index}
      console.log('Help', this.carousel)
      this.carousel = Object.assign({}, this.items[index], {class: '', index: index})
    },
    cardCall() { this.show = true },
    moveCarousel(direction) {
      // Find a more elegant way to express the :style. consider using props to make it truly generic
      if (direction == 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction == -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    }
  }
});

new Vue({
  el:"#app"
});