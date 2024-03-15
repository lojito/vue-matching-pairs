<template>
  <div class="historical-game">
    <category :categoryId="categoryId"></category>

    <stats :time="time" :clicks="clicks" :fails="fails"> </stats>

    <board v-if="!summary" :squares="game.squares" :folder="game.folder">
    </board>

    <router-link v-if="summary" :to="'/game/' + id" class="btn see-game">{{
      seeGameText
    }}</router-link>

    <a href="#" class="btn remove" v-on:click="removeGame">{{
      removeGameText
    }}</a>

    <a v-if="!summary" href="#" class="btn back" v-on:click="showHistorical">{{
      backText
    }}</a>

    <hr v-if="summary" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import Category from "../Category/Historical.vue";
import Stats from "../Stats.vue";
import Board from "../Board/Historical.vue";

export default defineComponent({
  components: {
    category: Category,
    stats: Stats,
    board: Board,
  },

  props: {
    time: String,
    clicks: Number,
    fails: Number,
    categoryId: Number,
    id: String,
    summary: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const id = route.params.id || 0;
    const game = computed(() => store.getters.getGame(id));

    const seeGameText = computed(() =>
      store.getters.getTerm("BUTTON_SEE_GAME")
    );
    const removeGameText = computed(() =>
      store.getters.getTerm("BUTTON_REMOVE_GAME")
    );
    const backText = computed(() => store.getters.getTerm("BUTTON_BACK"));

    const removeGame = () => {
      store.dispatch("removeGame", props.id).then(() => {
        router.push("/historical");
      });
    };
    const showHistorical = () => router.push("/historical");

    return {
      game,
      seeGameText,
      removeGameText,
      backText,
      removeGame,
      showHistorical,
    };
  },
});
</script>

<style scoped>
.historical-game {
  text-align: center;
  margin-top: 20px;
}

.see-game {
  margin-right: 5px;
}

.remove,
.back {
  margin-top: 10px;
  margin-right: 5px;
}
</style>
