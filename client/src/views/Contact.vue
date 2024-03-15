<template>
  <div class="contact">
    <p>
      <span>{{ author }}</span
      ><span class="me">Livan Ojito Villanueva</span>
    </p>
    <p>
      <span>{{ email }}</span
      ><span class="me">livanojito@gmail.com</span>
    </p>
    <p>
      <span>{{ linkedin }}</span>
      <a target="_blank" href="http://www.linkedin.com/in/livan-ojito"
        >http://www.linkedin.com/in/livan-ojito</a
      >
    </p>
    <p>
      <span>{{ github }}</span>
      <a target="_blank" href="https://github.com/lojito"
        >https://github.com/lojito</a
      >
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const author = computed(() => store.getters.getTerm("CONTACT_AUTHOR"));
    const email = computed(() => store.getters.getTerm("CONTACT_EMAIL"));
    const github = computed(() => store.getters.getTerm("CONTACT_GITHUB"));
    const linkedin = computed(() => store.getters.getTerm("CONTACT_LINKEDIN"));
    const availability = computed(() =>
      store.getters.getTerm("CONTACT_AVAILABILITY")
    );
    const availability_status = computed(() =>
      store.getters.getTerm("CONTACT_AVAILABILITY_STATUS")
    );

    return {
      author,
      email,
      github,
      linkedin,
      availability,
      availability_status,
    };
  },
});
</script>

<style scoped>
.contact {
  width: 95%;
  margin: 0 auto;
  margin-bottom: 20px;
}

.contact span {
  margin-right: 2px;
}

span {
  font-weight: bold;
}

.me {
  color: green;
  font-weight: normal;
}

@media screen and (max-width: 250px) {
  span,
  a {
    display: block;
    text-align: center;
  }
}
</style>
