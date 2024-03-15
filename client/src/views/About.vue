<template>
  <div class="about">
    <div>
      <span>{{ tech_stack }}</span>
      <ul>
        <li v-for="({ url, name }, index) in technologies" :key="index">
          <a target="_blank" :href="url">{{ name }}</a>
        </li>
      </ul>
    </div>

    <div>
      <span>{{ source_code }}</span>
      <ul>
        <li>
          <a target="_blank" href="https://github.com/lojito/matching-pairs"
            >https://github.com/lojito/matching-pairs</a
          >
        </li>
      </ul>
    </div>

    <span>{{ other_projects }} </span>
    <ul>
      <li v-for="({ url, name }, index) in projects" :key="index">
        <a target="_blank" :href="url">{{ name }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const tech_stack = computed(() =>
      store.getters.getTerm("ABOUT_TECH_STACK")
    );
    const source_code = computed(() =>
      store.getters.getTerm("ABOUT_SOURCE_CODE")
    );
    const other_projects = computed(() =>
      store.getters.getTerm("ABOUT_OTHER_PROJECTS")
    );

    const technologies = [
      {
        name: "Vue.js 3.0",
        url: "https://v3.vuejs.org/guide/introduction.html",
      },
      { name: "Vuex", url: "https://vuex.vuejs.org/" },
      { name: "Typescript", url: "https://www.typescriptlang.org/" },
      { name: "ES6", url: "http://es6-features.org" },
      { name: "Node.js", url: "https://nodejs.org/en/" },
      { name: "MongoDB", url: "https://www.mongodb.com/" },
      { name: "Firebase", url: "https://firebase.google.com/" },
      {
        name: "HTML5",
        url: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
      },
      { name: "CSS3", url: "https://www.w3.org/TR/selectors-3/" },
    ];

    const projects = [
      {
        name: "Puzzle (Angular)",
        url: "https://github.com/lojito/angular-puzzle",
      },
      {
        name: "Tic-tac-toe (React.js)",
        url: "https://github.com/lojito/react-tic-tac-toe",
      },
      {
        name: "Tic-tac-toe (Python)",
        url: "https://github.com/lojito/python-tic-tac-toe",
      },
      {
        name: "Tic-tac-toe 4x4 (Django)",
        url: "https://github.com/lojito/django-tic-tac-toe",
      },
      {
        name: "Base converter (Rust)",
        url: "https://github.com/lojito/rust-base-converter",
      },
      {
        name: "Small in-memory database engine (C)",
        url: "https://github.com/lojito/c_champions_league",
      },
      {
        name: "Bubble sort algorithm (Assembly)",
        url: "https://github.com/lojito/assembly-bubble-sort",
      },
    ];

    return { tech_stack, source_code, other_projects, technologies, projects };
  },
});
</script>

<style scoped>
.about {
  width: 95%;
  margin: 0 auto;
  margin-bottom: 20px;
}

.about div {
  margin-top: 16px;
}

ul {
  margin-top: 0;
}

li {
  margin-top: 5px;
}

span {
  font-weight: bold;
}
</style>
