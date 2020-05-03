<template>
  <svg
    :width="size"
    :class="['loader', { 'loader--center': center }]"
    viewBox="0 0 100 100"
  >
    <g class="points">
      <circle class="ciw" cx="50" cy="50" r="50" :fill="color" />
      <circle class="ci2" cx="5" cy="50" r="4" />
      <circle class="ci1" cx="95" cy="50" r="4" />
    </g>
  </svg>
</template>

<script>
export default {
  name: "LoadingSpinner",
  props: {
    center: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: 100
    },
    color: {
      type: String,
      default: "#EFEBE9"
    }
  }
};
</script>

<style>
/* Loader borrowed from : https://codepen.io/uchardon/pen/VEBbdw */
.loader {
  width: 8rem;

  transform-origin: 50% 50%;
  overflow: visible !important;
}

.loader.loader--center {
  margin: 0 auto;
}

.loader .ci1 {
  fill: var(--loaderColor);
  animation: toBig 3s infinite -1.5s;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
.loader .ciw {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: breath 3s infinite;
}
.loader .ci2 {
  fill: var(--loaderColor);
  animation: toBig2 3s infinite;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
.points {
  animation: rot 3s infinite;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}
@keyframes rot {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(360deg);
  }
  50% {
    transform: rotate(360deg);
  }
  80% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes toBig {
  0% {
    transform: scale(1) translateX(0px);
  }
  30% {
    transform: scale(1) translateX(0px);
  }
  50% {
    transform: scale(10) translateX(-4.5px);
  }
  80% {
    transform: scale(10) translateX(-4.5px);
  }
  100% {
    transform: scale(1) translateX(0px);
  }
}
@keyframes toBig2 {
  0% {
    transform: scale(1) translateX(0px);
  }
  30% {
    transform: scale(1) translateX(0px);
  }
  50% {
    transform: scale(10) translateX(4.5px);
  }
  80% {
    transform: scale(10) translateX(4.5px);
  }
  100% {
    transform: scale(1) translateX(0px);
  }
}
@keyframes breath {
  15% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.1);
  }
  65% {
    transform: scale(1);
  }
  90% {
    transform: scale(1.1);
  }
}
</style>
