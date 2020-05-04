<template>
  <div
    v-if="propsAreValid"
    :class="['bubble-caret', `bubble-caret--${direction}`]"
    :style="`margin-left: ${offsets.x}; margin-top: ${offsets.y};`"
  ></div>
</template>

<script>
export default {
  name: "BubbleCaret",
  props: {
    /**
     * @param {String}
     * bottom-[left|right]
     * top-[left|right]
     */
    direction: {
      type: String,
      default: "bottom-left"
    },
    offsetX: {
      type: [String, Number],
      default: "0px"
    },
    offsetY: {
      type: [String, Number],
      default: "0px"
    }
  },
  // Check validity of the props values
  computed: {
    propsAreValid() {
      return (
        this.directionIsValid() &&
        this.positionXIsValid() &&
        this.positionYIsValid()
      );
    },
    offsets() {
      const offsets = {
        x: this.offsetX,
        y: this.offsetY
      };

      if (typeof this.offsetX === "number") {
        offsets.x = `${this.offsetX}px`;
      }
      if (typeof this.offsetY === "number") {
        offsets.y = `${this.offsetY}px`;
      }

      return offsets;
    }
  },
  methods: {
    positionXIsValid() {
      return true;
    },
    positionYIsValid() {
      return true;
    },
    directionIsValid() {
      return /([top|bottom]-[left|right])/.test(this.direction);
    }
  }
};
</script>

<style lang="scss" scoped>
.bubble-caret {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 3px;
  border-color: none;

  &.bubble-caret--bottom-left,
  &.bubble-caret--bottom-right,
  &.bubble-caret--top-left,
  &.bubble-caret--top-right {
    height: 8px;
    @include transform(rotate(-45deg));
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.bubble-caret--left-top,
  &.bubble-caret--left-bottom,
  &.bubble-caret--right-top,
  &.bubble-caret--right-bottom {
    width: 16px;
  }

  &.bubble-caret--top-left,
  &.bubble-caret--top-right {
    top: -4px;
  }

  &.bubble-caret--right-top,
  &.bubble-caret--right-bottom {
    right: -5px;
  }

  &.bubble-caret--bottom-left,
  &.bubble-caret--bottom-right {
    bottom: -4px;
  }

  &.bubble-caret--left-top,
  &.bubble-caret--left-bottom {
    left: -5px;
  }

  &.bubble-caret--top-left,
  &.bubble-caret--bottom-left {
    left: 0;
  }

  &.bubble-caret--top-right,
  &.bubble-caret--bottom-right {
    right: 0;
  }

  &.bubble-caret--left-top,
  &.bubble-caret--right-top {
    top: 0;
  }

  &.bubble-caret--left-bottom,
  &.bubble-caret--right-bottom {
    bottom: 0;
  }

  &.bubble-caret--left-top,
  &.bubble-caret--right-bottom {
    @include transform(skewX(50deg));
  }

  &.bubble-caret--left-bottom,
  &.bubble-caret--right-top {
    @include transform(skewX(-50deg));
  }
}
</style>
