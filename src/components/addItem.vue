<script setup>
import { ref } from 'vue';

const title = ref('');
const value = ref('');
const category = ref('');
const isOpen = ref(false);
const emit = defineEmits(['close'])

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
    emit('close');
}

function selectOption(option) {
    category.value = option;
    isOpen.value = false;
}

function clearAll() {
    if (!confirm('Tem certeza?')) {
        return;
    }
    expenses.value = [];
}

const handleOverlayClick = (event) => {
    if ((event.target).id === 'overlay') {
        emit('close')
    }
}
</script>

<template>
    <div id="overlay" @click="handleOverlayClick"
        class="fixed inset-0 z-20 flex items-center justify-center bg-black/80">
        <div class="max-w-sm rounded-lg bg-white shadow-lg overflow-hidden">
            <div class="flex justify-between text-white bg-green-500 p-3 mb-5">
                <h2 class="font-semibold">Adicionar novo gasto</h2>
                <button class="material-symbols-outlined cursor-pointer active:scale-97 duration-300"
                    @click="emit('close')">close</button>
            </div>

            <div class="m-5">
                <label for="value" class="text-lg font-bold">Qual foi o valor?</label>
                <p class="flex gap-1.5 text-2xl font-bold mb-5">
                    R$
                    <input type="tel" placeholder="0,00"
                        class="text-2xl font-bold bg-transparent border-none outline-none placeholder:text-black"
                        v-model="value" onfocus="this.value = ''" />
                </p>

                <h3 class="font-semibold text-sm">Descrição</h3>
                <input v-model="title"
                    class="w-full border border-gray-400 bg-gray-100 text-sm rounded-xl px-3 py-2 my-2 focus:outline-green-500 outline-transparent text-black/60"
                    placeholder="Ex: Almoço" />

                <div class="relative w-full my-2">
                    <div @click="isOpen = !isOpen"
                        class="flex justify-between w-full border border-gray-400 bg-gray-100 text-sm rounded-xl px-3 py-2 my-2 focus:outline-green-500 outline-transparent text-black/60">
                        <p class="text-black/60 font-medium mt-0.5">{{ category != '' ? category : 'Selecione...' }}</p>
                        <span
                            :class="['material-symbols-outlined duration-300', isOpen ? 'rotate-180' : '']">keyboard_arrow_down</span>
                    </div>

                    <div
                        :class="['w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg duration-300', isOpen ? '' : 'opacity-0 pointer-events-none absolute']">
                        <div @click="selectOption('food')"
                            class="px-4 py-3 hover:bg-gray-50 flex items-center gap-3 cursor-pointer border-b border-gray-50">
                            <span>☕</span> <span class="text-gray-700">Comida</span>
                        </div>
                    </div>
                </div>

                <button
                    class="w-full bg-green-500 text-white font-semibold py-2.5 rounded-3xl mt-5 cursor-pointer hover:bg-green-600 active:bg-green-700 active:scale-97 duration-300"
                    @click="addExpense">Salvar Gasto</button>
            </div>
        </div>
    </div>
</template>