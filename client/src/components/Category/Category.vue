<template>
  <div class="categories">
    {{ category_term }}
    <select v-model="selected" v-on:change="emitCategory">
      <!-- eslint-disable-next-line vue/no-v-for-template-key -->
      <template :key="index" v-for="(category, index) in categoriesList">
        <option :value="index">
          {{ category }}
        </option>
      </template>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount } from "vue";
import { useStore } from "vuex";
import Category from "../../types/Category";

export default defineComponent({
  setup(_, { emit }) {
    const store = useStore();
    let categories: Category[] = [];
    const selected = ref(0);

    const emitCategory = () => {
      if (categories.length > 0) {
        const selectedValue = selected.value;
        let category = categories[selectedValue];
        category.categoryId = selectedValue;
        emit("categoryChange", category);
      }
    };

    onBeforeMount(() => {
      categories = store.getters.getCategories;
      selected.value = Math.floor(Math.random() * categories.length);
      emitCategory();
    });

    const category_term = computed(() => store.getters.getTerm("CATEGORY"));
    const categoriesList = computed(() =>
      store.getters.getTerm("CATEGORIES")
    ).value.split(",");

    return {
      selected,
      emitCategory,
      category_term,
      categoriesList,
    };
  },
});
</script>

<style scoped>
.categories {
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
