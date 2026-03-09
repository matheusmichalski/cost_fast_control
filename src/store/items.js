import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useItemsStore = defineStore("items", () => {
  const items = ref([
    { id: 1, title: "Cafe", value: 6, category: "food" },
    { id: 2, title: "Onibus", value: 4.5, category: "transport" },
    { id: 3, title: "Lanche", value: 12, category: "food" },
  ]);

  const filter = ref("all");
  const showPopup = ref(false);

  const filteredItems = computed(() => {
    if (filter.value === "all") {
      return items.value;
    }
    return items.value.filter((item) => item.category === filter.value);
  });

  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + Number(item.value || 0), 0);
  });

  const setFilter = (category) => {
    filter.value = category;
  };

  const togglePopup = () => {
    showPopup.value = !showPopup.value;
  };

  const closePopup = () => {
    showPopup.value = false;
  };

  const removeItem = (id) => {
    items.value = items.value.filter((item) => item.id !== id);
  };

  const addItem = (item) => {
    items.value.push({
      id: item.id ?? Date.now(),
      title: item.title,
      value: item.value,
      category: item.category || "other",
    });
  };

  return {
    items,
    filter,
    showPopup,
    filteredItems,
    total,
    setFilter,
    togglePopup,
    closePopup,
    removeItem,
    addItem,
  };
});
