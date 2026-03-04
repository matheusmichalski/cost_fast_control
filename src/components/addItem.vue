<script setup>
import { ref } from 'vue';

const title = ref('');
const value = ref('');
const category = ref('');
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
                <button class="material-symbols-outlined cursor-pointer" @click="emit('close')">close</button>
            </div>
            <input v-model="title" class="input" placeholder="Descricao" />
            <input v-model="value" class="input" placeholder="Valor" />
            <input v-model="category" class="input" placeholder="Categoria" />
            <button class="" @click="addExpense">Salvar Gasto</button>
            <!-- <button class="" @click="clearAll">Limpar tudo</button> -->
        </div>
    </div>
</template>