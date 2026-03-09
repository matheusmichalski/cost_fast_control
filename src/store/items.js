import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { parseAmount } from "../utils/formatAmount";

export const useItemsStore = defineStore("items", () => {
  const allowedCategories = reactive([
    { value: "food", label: "Food", icon: "food_bank" },
    { value: "transport", label: "Transport", icon: "local_taxi" },
    { value: "other", label: "Other", icon: "more_horiz" },
  ]);

  const items = ref([
    { id: 1, title: "Coffe", value: 6, category: "food", icon: "food_bank" },
    {
      id: 2,
      title: "Bus",
      value: 4.5,
      category: "transport",
      icon: "local_taxi",
    },
    {
      id: 3,
      title: "Breakfast",
      value: 12,
      category: "food",
      icon: "food_bank",
    },
    {
      id: 4,
      title: "Shoppe",
      value: 24.9,
      category: "other",
      icon: "more_horiz",
    },
  ]);

  const filter = ref("all");

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

  const removeItem = (id) => {
    items.value = items.value.filter((item) => item.id !== id);
  };

  const addItem = (item) => {
    const title = String(item?.title ?? "").trim();
    const amount = parseAmount(item?.value);
    const categoryData =
      allowedCategories.find((c) => c.value === item?.category) ||
      allowedCategories.find((c) => c.value === "other");

    if (!title) {
      return { ok: false, error: "Title is required." };
    }

    if (amount === null) {
      return { ok: false, error: "Enter a valid amount greater than zero." };
    }

    items.value.push({
      id: item.id ?? Date.now(),
      title,
      value: amount,
      category: categoryData.value,
      icon: categoryData.icon,
    });

    return { ok: true };
  };

  return {
    items,
    filter,
    filteredItems,
    total,
    allowedCategories,
    setFilter,
    removeItem,
    addItem,
  };
});
