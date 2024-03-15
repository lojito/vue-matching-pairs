<template>
  <div class="board">
    <!-- eslint-disable-next-line vue/no-v-for-template-key -->
    <template v-for="(squareInfo, index) in board" :key="index">
      <square
        :image="squareInfo.image"
        :square="index"
        :show="squareInfo.show"
        :disabled="squareInfo.disabled"
        :folder="folder"
        v-on:squareClicked="onSquareClicked"
      >
      </square>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import Square from "../../components/Square/Square.vue";
import SquareInfo from "../../types/SquareInfo";
import SquareType from "../../types/Square";

export default defineComponent({
  components: {
    square: Square,
  },

  props: {
    folder: String,
  },

  setup(_, { emit }) {
    const totalSquares = 16;
    let fails = 0;
    let clicks = 0;
    let guessed = 0;
    let matchingSquares: SquareType[] = [];
    const board = ref<SquareInfo[]>([]);

    const gameOver = () => {
      const squares: number[] = [];

      for (let i = 0; i < totalSquares; i++) {
        squares[i] = board.value[i].image;
      }
      emit("gameOver", squares);
    };

    const onSquareClicked = (square: SquareType) => {
      board.value[square].disabled = true;
      board.value[square].show = true;
      clicks++;
      matchingSquares.push(square);

      if (matchingSquares.length == 2) {
        const square1 = matchingSquares[0];
        const square2 = matchingSquares[1];
        if (board.value[square1].image === board.value[square2].image) {
          board.value[square1].disabled = true;
          board.value[square2].disabled = true;
          guessed += 2;
          matchingSquares = [];
        } else {
          fails++;
          window.setTimeout(() => {
            board.value[square1].show = false;
            board.value[square2].show = false;
            board.value[square1].disabled = false;
            board.value[square2].disabled = false;
            matchingSquares = [];
          }, 300);
        }
      }

      emit("statsChange", { clicks, fails });
      if (guessed == totalSquares) {
        gameOver();
      }
    };

    const shuffleImages = () => {
      const imagesPerCategory = 20;
      const images: number[] = [];
      let image: number;

      for (let i = 0; i < totalSquares / 2; i++) {
        image = Math.floor(Math.random() * imagesPerCategory);
        while (images.indexOf(image) != -1) {
          image = Math.floor(Math.random() * imagesPerCategory);
        }
        images.push(image);
      }
      return images;
    };

    const shuffleBoard = () => {
      const board: SquareInfo[] = [];
      let square;

      const images = shuffleImages();
      for (let i = 0; i < images.length; i++) {
        for (let j = 0; j < 2; j++) {
          square = Math.floor(Math.random() * totalSquares);
          while (square in board) {
            square = Math.floor(Math.random() * totalSquares);
          }
          board[square] = {
            image: images[i],
            show: false,
            disabled: false,
          };
        }
      }
      return board;
    };

    const resetBoard = () => {
      fails = 0;
      clicks = 0;
      guessed = 0;
      matchingSquares = [];
      board.value = shuffleBoard();
    };

    onBeforeMount(() => {
      resetBoard();
    });

    return {
      board,
      onSquareClicked,
    };
  },
});
</script>

<style scoped>
.board {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
}
</style>
