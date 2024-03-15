<template>
  <div class="app-wrapper">
    <app-flag></app-flag>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useStore } from "vuex";
import Flag from "./components/Flag.vue";
import Navigation from "./components/Navigation.vue";

export default defineComponent({
  components: {
    "app-flag": Flag,
    navigation: Navigation,
  },

  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("loadGames");
    });
  },
});
</script>

<style>
body {
  background-color: darkseagreen;
  margin: 0;
}

.app-wrapper {
  max-width: 640px;
  margin: 5px auto 0;
}

a {
  color: green;
  text-decoration: none;
}

.info {
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

hr {
  margin: 15px;
}

.btn {
  background-color: #44c76754;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: green;
  font-family: Arial;
  font-size: 17px;
  padding: 6px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}

@media screen and (max-width: 480px) {
  .app-wrapper {
    margin: 10px 2px 0;
  }
}
</style>
