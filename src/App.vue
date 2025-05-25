<script setup lang="ts">
  import {ref,computed, watch} from 'vue'
  import {useLocalStorage} from '@/composables/useLocalStorage'

  interface Product {
    name: string;
    price: number;
    category: string;
    quantity: number;
  }

  //Reference for buyed products
  const buyedProducts = useLocalStorage('buyedProducts',[])
  //References for product
  const newProduct:Product = ref({ name:'', price:0, category:'', quantity:1 })
  
  //Use watch to convert input-text in uppercase
  watch(()=> newProduct.value.name, (newValue) =>{
    newProduct.value.name = newValue.toUpperCase()
  })

  watch(() => newProduct.value.category, (newValue) => {
  newProduct.value.category = newValue.toUpperCase()
  })



  // const products = ref<Product>([])
  const products = useLocalStorage('products',[])

  // const selectedCategory = ref('tech')

  // const filterProduct = computed(() => {
  //   return products.value.filter(p => p.category === selectedCategory.value)
  // })

  const totalPrice = computed(() => {
    return buyedProducts.value.reduce((sum,p)=> sum + p.price * p.quantity, 0)
  })


  const handleRegisterProduct = () => {
    const product = { ...newProduct.value }
    products.value.push(product)
    resetFields()
  }

  const handleBuyedProducts = (item) => {
    buyedProducts.value.push({...item})
  }

  const resetFields = () => {
    newProduct.value.name = ''
    newProduct.value.price = 0
    newProduct.value.category = ''
  }

  // Function helper for currency
  const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
    }).format(amount)
  }

  const formattedPrice = computed(()=>{
    return formatCurrency(totalPrice.value)
  })

  const removeItem = (item:Product) => {    
    products.value = products.value.filter(p => p.name !== item.name)
  }
  
  const removeBuyedItem = (item:Product) => {    
    buyedProducts.value = buyedProducts.value.filter(p => p.name !== item.name)
  }


</script>

<template>
  <div class="bg-[#343434] pt-10 pb-20 min-h-screen scroll-auto">
    <h3 class="text-5xl text-center uppercase mb-10 text-white/95 font-black">Register Product</h3>
    <form action="" class="space-y-4 px-5" @submit.prevent="handleRegisterProduct">
      <input type="text" placeholder="Product name" class=" w-full p-3 rounded-md bg-gray-200" v-model.trim="newProduct.name">
      <input type="text" placeholder="Category" class=" w-full p-3 rounded-md bg-gray-200 " v-model.trim="newProduct.category">
      <input type="text" placeholder="Price" class=" w-full p-3 rounded-md bg-gray-200" v-model.number.trim="newProduct.price">
      <button type="submit" class="w-full bg-emerald-300 p-2 rounded-sm hover:bg-emerald-500 cursor-pointer">Register new product</button>
    </form>


    <h1 class="pt-5 text-center font-bold text-white/90 uppercase">List of all Products</h1>
      <div class="grid grid-cols-1 px-4 gap-2 sm:grid-cols-2 md:grid-cols-3">
        <div v-for="(item,index) in products" :key="index">
          <div class="border border-emerald-800 bg-emerald-100 rounded-md flex flex-col items-center p-3">
            <p class="">{{ item.name }}</p>
            <p class="font-medium">{{ formatCurrency(item.price) }}</p>
            <div class="flex justify-between items-center w-full px-2">
              <p class="bg-cyan-400 p-1 rounded-md text-sm text-emerald-800">{{ item.category }}</p>
              <button class="bg-emerald-300 rounded-md px-3  hover:bg-emerald-400 cursor-pointer" v-on:click="handleBuyedProducts(item)">BUY</button>
              <button class="bg-red-300 rounded-md px-3  hover:bg-red-400 cursor-pointer" v-on:click="removeItem(item)">DELETE</button>
            </div>
          </div>
        </div>
      </div>
    

    <h1 class="text-center font-bold uppercase mt-10 mb-3 text-white">Buyed products</h1>

    <ul class="px-5 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <li v-for="(item, index) in buyedProducts" :key="index">
        <div class="grid p-3 bg-emerald-200  rounded-md  w-full">
          <div class="flex gap-x-3 justify-between p-2 items-center">
            
            <div class="flex flex-col">
              <p class="text-sm font-thin">Product Name</p>
              <span class="font-medium">{{ item.name }}</span>
            </div>
            <span class="font-bold text-lg">${{ item.price }}</span>
          </div>
          <div class="flex justify-between items-center">

            <div class="flex flex-col">
              <p class="text-sm font-thin">Quantity</p>
              <input min="1" type="number" class="bg-gray-200 p-1" v-model="item.quantity">
            </div>
            <button class="justify-end px-2 bg-red-300 rounded-md" @click="removeBuyedItem(item)">Remove</button>
          </div>
        </div>
      </li>      
    </ul>
    
    <div class="">
      <h3 class="text-center uppercase font-bold mt-4 text-white">Total price</h3>
      <p class="text-center text-xl font-bold text-white border-b">{{ formattedPrice }}</p>
    </div>
  </div>
</template>