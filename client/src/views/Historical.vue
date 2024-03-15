<template>
  <div>
    <p class="info" v-if="games.length == 0">
      {{ noHistorical }}
    </p>
    <!-- eslint-disable-next-line vue/no-v-for-template-key -->
    <template v-for="game in games" :key="game._id">
      <Historical
        :time="game.time"
        :clicks="game.clicks"
        :fails="game.fails"
        :categoryId="game.categoryId"
        :id="game._id"
        :summary="true"
      >
      </Historical>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Historical from "../components/Game/Historical.vue";
import Game from "../types/Game";

export default defineComponent({
  components: {
    Historical,
  },

  setup() {
    const store = useStore();
    const games = computed<Game[]>(() => {
      return store.getters.getGames;
    });
    const noHistorical = computed(() => {
      return store.getters.getTerm("NO_HISTORICAL");
    });

    return { games, noHistorical };
  },
});
</script>
