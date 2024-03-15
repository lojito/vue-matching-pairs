<template>
  <div v-if="dictionary.length && categories.length" class="game-wrapper">
    <div class="info">{{ game_goal }}</div>

    <category v-on:categoryChange="onCategoryChange"></category>

    <stats :time="time" :clicks="clicks" :fails="fails"> </stats>

    <board
      :key="boardKey"
      :folder="category.folder"
      v-on:statsChange="onStatsChange"
      v-on:gameOver="saveGame"
    >
    </board>

    <a href="#" class="btn start-over" v-on:click="resetGame">{{
      start_over
    }}</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import Category from "../components/Category/Category.vue";
import Stats from "../components/Stats.vue";
import Board from "../components/Board/Board.vue";
import CategoryType from "../types/Category";
import { useStore } from "vuex";

type StatsType = { clicks: number; fails: number };

export default defineComponent({
  components: {
    category: Category,
    stats: Stats,
    board: Board,
  },

  setup() {
    const time = ref("");
    const clicks = ref(0);
    const fails = ref(0);
    let seconds = 0;
    let over = false;
    const boardKey = ref(0);
    const category = ref<CategoryType>({
      name: "",
      folder: "",
    });
    let intervalId: number;
    const store = useStore();

    const refreshTimer = () => {
      const secondsInAMinute = 60;

      intervalId = window.setInterval(() => {
        if (over) {
          clearInterval(intervalId);
        } else {
          seconds++;
          const minutes = Math.floor(seconds / secondsInAMinute);
          const secondsInTime = (seconds % secondsInAMinute) + "s";
          time.value = minutes ? minutes + "m " + secondsInTime : secondsInTime;
        }
      }, 1000);
    };

    const resetGame = () => {
      clicks.value = 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      seconds = 0;
      fails.value = 0;
      over = false;

      if (intervalId) {
        clearInterval(intervalId);
      }

      refreshTimer();
      boardKey.value++;
    };

    const onCategoryChange = (userCategory: CategoryType) => {
      category.value = userCategory;
      resetGame();
    };

    const onStatsChange = (stats: StatsType) => {
      clicks.value = stats.clicks;
      fails.value = stats.fails;
    };

    const saveGame = (squares: number) => {
      over = true;
      store.dispatch("addGame", {
        time: time.value,
        clicks: clicks.value,
        fails: fails.value,
        categoryId: category.value.categoryId,
        folder: category.value.folder,
        squares,
      });
    };

    const game_goal = computed(() => store.getters.getTerm("GAME_GOAL"));
    const start_over = computed(() =>
      store.getters.getTerm("BUTTON_START_OVER")
    );
    const categories = computed(() => store.getters.getCategories);
    const dictionary = computed(() => store.getters.getDictionary);

    return {
      clicks,
      time,
      fails,
      category,
      game_goal,
      start_over,
      categories,
      dictionary,
      onCategoryChange,
      onStatsChange,
      saveGame,
      resetGame,
      boardKey,
    };
  },
});
</script>

<style scoped>
.game-wrapper {
  text-align: center;
  margin-top: 20px;
}

.start-over {
  margin-top: 10px;
}

@media screen and (max-width: 480px) {
  .game-wrapper {
    margin-top: 0px;
  }
}
</style>
