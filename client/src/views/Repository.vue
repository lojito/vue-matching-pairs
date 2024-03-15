<template>
  <div class="repository">
    <category v-on:categoryChange="onCategoryChange"></category>

    <div class="repository-images">
      <div v-for="(i, index) in Array(imagesPerCategory)" :key="index">
        <img :src="backgroundImage(index)" alt="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Category from "../components/Category/Category.vue";
import CategoryType from "../types/Category";

export default defineComponent({
  components: {
    category: Category,
  },

  setup() {
    const category = ref<CategoryType | null>(null);
    const imagesPerCategory = 20;

    const onCategoryChange = (categorySelected: CategoryType) => {
      category.value = categorySelected;
    };

    const backgroundImage = (image: number) => {
      return `https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images%2F${category.value?.folder}%2F${image}.jpg?alt=media`;
    };

    return { imagesPerCategory, backgroundImage, onCategoryChange };
  },
});
</script>

<style scoped>
.repository {
  padding-top: 10px;
}

.repository-images {
  margin-top: 20px;
}

.repository-images div {
  width: 23.75%;
  display: inline-block;
  margin-right: 1%;
}

.repository-images div:nth-child(4n + 1) {
  margin-left: 1%;
}

.repository-images div img {
  max-width: 100%;
}

@media screen and (max-width: 480px) {
  .repository-images div {
    width: 48.5%;
  }

  .repository-images div:nth-child(2n + 1) {
    margin-left: 1%;
  }
}
</style>
