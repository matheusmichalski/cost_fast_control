<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useItemsStore } from '../store/items';

const title = ref('');
const value = ref('');
const category = ref('other');
const isCategoryOpen = ref(false);

const emit = defineEmits(['close']);
const toast = useToast();
const { addItem } = useItemsStore();

const categoryOptions = [
    { value: 'food', label: 'Food', icon: '☕' },
    { value: 'transport', label: 'Transport', icon: '🚌' },
    { value: 'other', label: 'Other', icon: '📦' },
];

function selectCategory(selectedCategory) {
    category.value = selectedCategory;
    isCategoryOpen.value = false;
}

function formatAmountInput(event) {
    value.value = event.target.value
        .replace(/[^\d.,]/g, '')
        .replace(/(,.*),/g, '$1');
}


function handleAddItem() {
    const result = addItem({
        title: title.value,
        value: value.value,
        category: category.value,
    });

    if (!result.ok) {
        toast.error(result.error);
        return;
    }

    toast.success('Item added successfully.');
    title.value = '';
    value.value = '';
    category.value = 'other';
    emit('close');
}

const handleOverlayClick = (event) => {
    if ((event.target).id === 'overlay') {
        emit('close');
    }
};
</script>

<template>
    <div id="overlay" @click="handleOverlayClick"
        class="fixed inset-0 z-20 flex items-center justify-center bg-black/80">
        <div class="max-w-sm rounded-lg bg-white shadow-lg overflow-hidden">
            <div class="flex justify-between text-white bg-green-500 p-3 mb-5">
                <h2 class="font-semibold">Add New Expense</h2>
                <button class="material-symbols-outlined cursor-pointer active:scale-97 duration-300"
                    @click="emit('close')">close</button>
            </div>

            <div class="m-5">
                <label for="value" class="text-lg font-bold">Amount</label>
                <p class="flex gap-1.5 text-2xl font-bold mb-5">
                    R$
                    <input id="value" type="text" inputmode="decimal" placeholder="0,00"
                        class="text-2xl font-bold bg-transparent border-none outline-none placeholder:text-black"
                        :value="value" @input="formatAmountInput" />
                </p>

                <h3 class="font-semibold text-sm">Description</h3>
                <input v-model="title"
                    class="w-full border border-gray-400 bg-gray-100 text-sm rounded-xl px-3 py-2 my-2 focus:outline-green-500 outline-transparent text-black/60"
                    placeholder="Ex: Lunch" />

                <div class="relative w-full my-2">
                    <div @click="isCategoryOpen = !isCategoryOpen"
                        class="flex justify-between w-full border border-gray-400 bg-gray-100 text-sm rounded-xl px-3 py-2 my-2 focus:outline-green-500 outline-transparent text-black/60">
                        <p class="text-black/60 font-medium mt-0.5">
                            {{ categoryOptions.find((option) => option.value === category)?.label || 'Select category...' }}
                        </p>
                        <span
                            :class="['material-symbols-outlined duration-300', isCategoryOpen ? 'rotate-180' : '']">keyboard_arrow_down</span>
                    </div>

                    <div
                        :class="['w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg duration-300', isCategoryOpen ? '' : 'opacity-0 pointer-events-none absolute']">
                        <div v-for="option in categoryOptions" :key="option.value" @click="selectCategory(option.value)"
                            class="px-4 py-3 hover:bg-gray-50 flex items-center gap-3 cursor-pointer border-b border-gray-50 last:border-b-0">
                            <span>{{ option.icon }}</span>
                            <span class="text-gray-700">{{ option.label }}</span>
                        </div>
                    </div>
                </div>

                <button
                    class="w-full bg-green-500 text-white font-semibold py-2.5 rounded-3xl mt-5 cursor-pointer hover:bg-green-600 active:bg-green-700 active:scale-97 duration-300"
                    @click="handleAddItem">Save Expense</button>
            </div>
        </div>
    </div>
</template>
