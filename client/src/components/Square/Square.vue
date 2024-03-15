<template>
  <div
    :class="compClasses"
    :style="{ backgroundImage }"
    v-on:click="clickHandler"
  ></div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    image: Number,
    square: Number,
    show: Boolean,
    disabled: Boolean,
    folder: String,
  },

  setup(props, { emit }) {
    const clickHandler = () => {
      emit("squareClicked", props.square);
    };
    const compClasses = computed(() => {
      return {
        showcard: props.show,
        disabled: props.disabled,
      };
    });

    const backgroundImage = computed(() => {
      const imagePath =
        "https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images%2F";
      return `url(${imagePath}${props.folder}%2F${props.image}.jpg?alt=media), url(${imagePath}square.jpg?alt=media)`;
    });

    return {
      compClasses,
      clickHandler,
      backgroundImage,
    };
  },
});
</script>

<style scoped>
div {
  width: 23%;
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
