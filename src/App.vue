<script setup>
import { computed, ref } from 'vue';

const expenses = ref([
    { id: 1, title: 'Cafe', value: 6, category: 'food' },
    { id: 2, title: 'Onibus', value: 4.5, category: 'transport' },
    { id: 3, title: 'Lanche', value: 12, category: 'food' },
]);

const title = ref('');
const value = ref('');
const category = ref('');
const filter = ref('all');

const filtered = computed(() => {
    if (filter.value === 'all') {
        return expenses.value;
    }
    return expenses.value.filter((item) => item.category === filter.value);
});

const total = computed(() => {
    return expenses.value.reduce((sum, item) => sum + Number(item.value || 0), 0);
});

function addExpense() {
    if (!title.value.trim() || !value.value.trim()) {
        alert('Preencha tudo');
        return;
    }
    expenses.value.push({
        id: Date.now(),
        title: title.value,
        value: value.value,
        category: category.value || 'other',
    });
    title.value = '';
    value.value = '';
    category.value = '';
}

function removeExpense(id) {
    expenses.value = expenses.value.filter((item) => item.id !== id);
}

function clearAll() {
    if (!confirm('Tem certeza?')) {
        return;
    }
    expenses.value = [];
}
</script>

<template>
    <main class="bg-[#f4f4f4] max-w-300 my-0 mx-auto min-h-screen">
        <header class="p-6 bg-green-500 border-b border-[#ddd] text-white">
            <h1 class="text-2xl font-bold">Controle de Gastos Rápido</h1>
            <div>
                <button class="small-btn" @click="filter = 'all'">Tudo</button>
                <button class="small-btn" @click="filter = 'food'">Comida</button>
                <button class="small-btn" @click="filter = 'transport'">Transporte</button>
                <button class="small-btn" @click="filter = 'other'">Outros</button>
            </div>
        </header>

        <div class="mt-5 border border-[#ccc] p-6 shadow-xl rounded-2xl w-[90%] mx-auto">
            <p class="text-[#555] text-lg font-semibold">Resumo de Saldo:</p>
            <span class="font-bold text-2xl">R$ {{ total }}</span>
        </div>

        <div class="p-6">
            <h2 class="text-xl font-bold mb-2">Lista do dia</h2>
            <ul class="grid gap-3">
                <li v-for="item in filtered" :key="item.id"
                    class="flex items-center justify-between bg-white py-3 px-5 rounded-2xl shadow-lg hover:-translate-y-1 duration-300 cursor-pointer border border-transparent hover:border-green-500">
                    <div class="flex items-center gap-3">
                        <span class="material-symbols-outlined p-2 bg-[#ccc]/50 rounded-lg">coffee</span>
                        <div>
                            <p class="font-semibold text-lg">{{ item.title }}</p>
                            <p>{{ item.category }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <p class="font-semibold text-lg">R$ {{ item.value }}</p>
                        <button @click="removeExpense(item.id)"
                            class="material-symbols-outlined p-2 bg-[#ccc]/50 rounded-lg">close</button>
                    </div>
                </li>
            </ul>
            <!-- <table class="w-full text-sm border-collapse">
                <thead>
                    <tr>
                        <th class="border border-[#eee] p-1.5 text-left">Descricao</th>
                        <th class="border border-[#eee] p-1.5 text-left">Categoria</th>
                        <th class="border border-[#eee] p-1.5 text-left">Valor</th>
                        <th class="border border-[#eee] p-1.5 text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filtered" :key="item.id">
                        <td class="border border-[#eee] p-1.5 text-left">{{ item.title }}</td>
                        <td class="border border-[#eee] p-1.5 text-left">{{ item.category }}</td>
                        <td class="border border-[#eee] p-1.5 text-left">{{ item.value }}</td>
                        <td class="border border-[#eee] p-1.5 text-left">
                            <button class="small-btn" @click="removeExpense(item.id)">X</button>
                        </td>
                    </tr>
                </tbody>
            </table> -->
        </div>

        <!-- <div class="panel">
                <h2>Nova despesa</h2>
                <input v-model="title" class="input" placeholder="Descricao" />
                <input v-model="value" class="input" placeholder="Valor" />
                <input v-model="category" class="input" placeholder="Categoria" />
                <div class="row">
                    <button class="small-btn" @click="addExpense">Add</button>
                    <button class="small-btn" @click="clearAll">Limpar tudo</button>
                </div>
            </div> -->

        <button
            class="material-symbols-outlined fixed bottom-5 right-5 bg-green-500 text-white rounded-full p-4 text-2xl shadow-lg">
            add
        </button>
    </main>
</template>