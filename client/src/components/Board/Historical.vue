<template>
  <div class="board">
    <!-- eslint-disable-next-line vue/no-v-for-template-key -->
    <template v-for="(image, index) in squares" :key="index">
      <square :image="image" :folder="folder"> </square>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Historical from "../Square/Historical.vue";

export default defineComponent({
  components: {
    square: Historical,
  },

  props: {
    squares: Array,
    folder: String,
  },
});
</script>

<style scoped>
.board {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
}
</style>
