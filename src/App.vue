<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import AddItem from './components/addItem.vue';

import { useItemsStore } from './store/items';

const itemsStore = useItemsStore();
const { items, filter, showPopup, filteredItems, total } = storeToRefs(itemsStore);
const { setFilter, togglePopup, closePopup, removeItem } = itemsStore;


onMounted(() => {
    console.log('Component montado, itens:', items.value);
});
</script>

<template>
    <main class="bg-[#f4f4f4] max-w-300 my-0 mx-auto min-h-screen">
        <header class="p-6 pb-3 bg-green-500 border-b border-[#ddd] text-white">
            <h1 class="text-2xl font-semibold">Controle de Gastos Rápido</h1>
            <nav class="flex items-center gap-4 mt-3 text-black font-semibold text-sm">
                <button :class="[
                    'px-3 py-1 rounded-2xl cursor-pointer duration-300',
                    filter === 'all' ? 'bg-white text-green-600' : 'text-white hover:bg-green-600'
                ]" @click="setFilter('all')">Tudo</button>
                <button :class="[
                    'px-3 py-1 rounded-2xl cursor-pointer duration-300',
                    filter === 'food' ? 'bg-white text-green-600' : 'text-white hover:bg-green-600'
                ]" @click="setFilter('food')">Comida</button>
                <button :class="[
                    'px-3 py-1 rounded-2xl cursor-pointer duration-300',
                    filter === 'transport' ? 'bg-white text-green-600' : 'text-white hover:bg-green-600'
                ]" @click="setFilter('transport')">Transporte</button>
                <button :class="[
                    'px-3 py-1 rounded-2xl cursor-pointer duration-300',
                    filter === 'other' ? 'bg-white text-green-600' : 'text-white hover:bg-green-600'
                ]" @click="setFilter('other')">Outros</button>
            </nav>
        </header>

        <div class="mt-5 border border-[#ccc] p-6 shadow-xl rounded-2xl w-[90%] mx-auto">
            <p class="text-[#555] text-lg font-semibold">Resumo de Saldo:</p>
            <span class="font-bold text-2xl">R$ {{ total }}</span>
        </div>

        <div class="p-6">
            <h2 class="text-xl font-bold mb-2">Lista do dia</h2>
            <ul class="grid gap-3">
                <li v-for="item in filteredItems" :key="item.id"
                    class="flex items-center justify-between bg-white py-3 px-5 rounded-2xl shadow-lg hover:-translate-y-1 duration-300 cursor-pointer border border-transparent hover:border-green-500 active:border-green-500 active:-translate-y-1">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined p-2 bg-[#ccc]/50 rounded-lg">coffee</span>
                        <div>
                            <p class="font-semibold text-lg">{{ item.title }}</p>
                            <p>{{ item.category }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <p class="font-semibold text-lg">R$ {{ item.value }}</p>
                        <button @click="removeItem(item.id)"
                            class="material-symbols-outlined p-2 bg-[#ccc]/50 rounded-lg cursor-pointer">close</button>
                    </div>
                </li>
            </ul>
        </div>

        <button
            class="material-symbols-outlined fixed bottom-5 right-5 bg-green-500 text-white rounded-full p-4 text-2xl shadow-lg cursor-pointer hover:bg-green-600 active:bg-green-700 active:scale-97 duration-300"
            @click="togglePopup">
            add
        </button>
        <AddItem v-if="showPopup" @close="closePopup" />
    </main>
</template>
