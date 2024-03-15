<template>
  <div class="stats">
    <span class="time"> {{ time_term }} {{ time }} </span>
    <span class="clicks"> {{ clicks_term }} {{ clicks }} </span>
    <span> {{ fails_term }} {{ fails }} </span>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    time: String,
    clicks: Number,
    fails: Number,
  },

  setup() {
    const store = useStore();

    const time_term = computed(() => store.getters.getTerm("STATS_TIME"));
    const clicks_term = computed(() => store.getters.getTerm("STATS_CLICKS"));
    const fails_term = computed(() => store.getters.getTerm("STATS_FAILS"));

    return {
      time_term,
      clicks_term,
      fails_term,
    };
  },
});
</script>

<style scoped>
.stats {
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
}

.time,
.clicks {
  margin-right: 10px;
}

@media screen and (max-width: 250px) {
  span {
    display: block;
  }
}
</style>
