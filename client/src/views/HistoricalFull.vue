<template v-if="game">
  <Historical
    :time="game.time"
    :clicks="game.clicks"
    :fails="game.fails"
    :categoryId="game.categoryId"
    :id="game._id"
  >
  </Historical>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Historical from "../components/Game/Historical.vue";

export default defineComponent({
  components: {
    Historical,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    const game = computed(() => store.getters.getGame(id));

    return { game };
  },
});
</script>
