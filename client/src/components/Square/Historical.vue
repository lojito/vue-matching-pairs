<template>
  <div
    :class="{ showcard: 'true', disabled: 'true' }"
    :style="{ backgroundImage }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";

export default defineComponent({
  props: {
    image: Number,
    folder: String,
  },

  setup(props) {
    const backgroundImage = ref("");

    onBeforeMount(() => {
      const imagePath =
        "https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images%2F";
      backgroundImage.value = `url(${imagePath}${props.folder}%2F${props.image}.jpg?alt=media), url(${imagePath}square.jpg?alt=media)`;
    });

    return { backgroundImage };
  },
});
</script>

<style scoped>
div {
  width: 24%;
  display: inline-block;
  border: 1px solid green;
  background-size: 100% 100%;
  background-position: -300px, top left;
  background-repeat: no-repeat, no-repeat;
  background-color: green;
}

div:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.showcard {
  background-position: initial;
}

.disabled {
  pointer-events: none;
  animation: showcard 1s;
}

@keyframes showcard {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}
</style>
