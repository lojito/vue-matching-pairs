<template>
  <div class="categories">
    {{ category_term }}
    {{ categoryList.split(",")[categoryId] }}
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    categoryId: {
      type: Number,
    },
  },

  setup() {
    const store = useStore();

    const category_term = computed(() => store.getters.getTerm("CATEGORY"));
    const categoryList = computed(() => store.getters.getTerm("CATEGORIES"));

    return { category_term, categoryList };
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
