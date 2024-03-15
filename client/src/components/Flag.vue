<template>
  <div class="flags">
    <img
      v-on:click="setLanguage(ENGLISH)"
      :src="`${imageFolder}flags%2Fusa.jpg?alt=media`"
      :alt="FLAG_ENGLISH_HINT"
      :title="FLAG_ENGLISH_HINT"
    />
    <img
      v-on:click="setLanguage(FRENCH)"
      :src="`${imageFolder}flags%2Ffrance.jpg?alt=media`"
      :alt="FLAG_FRENCH_HINT"
      :title="FLAG_FRENCH_HINT"
    />
    <img
      v-on:click="setLanguage(SPANISH)"
      :src="`${imageFolder}flags%2Fspain.jpg?alt=media`"
      :alt="FLAG_SPANISH_HINT"
      :title="FLAG_SPANISH_HINT"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Language from "../types/Language";

export default defineComponent({
  setup() {
    const ENGLISH: Language = Language.ENGLISH;
    const FRENCH: Language = Language.FRENCH;
    const SPANISH: Language = Language.SPANISH;

    const FLAG_ENGLISH_HINT = computed(() =>
      store.getters.getTerm("FLAG_ENGLISH_HINT")
    );
    const FLAG_FRENCH_HINT = computed(() =>
      store.getters.getTerm("FLAG_FRENCH_HINT")
    );
    const FLAG_SPANISH_HINT = computed(() =>
      store.getters.getTerm("FLAG_SPANISH_HINT")
    );

    const imageFolder =
      "https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images%2F";

    const store = useStore();
    const setLanguage = (language: Language) => {
      store.dispatch("setLanguage", language);
    };

    return {
      imageFolder,
      setLanguage,
      ENGLISH,
      FRENCH,
      SPANISH,
      FLAG_ENGLISH_HINT,
      FLAG_FRENCH_HINT,
      FLAG_SPANISH_HINT,
    };
  },
});
</script>

<style scoped>
.flags {
  display: inline-block;
  width: 20%;
}

.flags img {
  cursor: pointer;
  margin: 0 2%;
}

@media screen and (max-width: 480px) {
  .flags {
    width: 40%;
    vertical-align: top;
  }
}

@media screen and (max-width: 250px) {
  .flags img {
    cursor: pointer;
    margin: 0 20%;
  }

  img {
    display: block;
    padding-bottom: 2px;
    margin: 0 auto;
  }
}
</style>
