<template>
  <v-sheet>
    <v-overlay :value="openModal" z-index="40">
      <v-date-picker
        v-model="date"
        reactive
        :max="maxDate"
        :min="minDate"
      ></v-date-picker>
    </v-overlay>
    <v-sheet
      background-color="transparent"
      class="date-picker-wrapper"
      @click="openModal = true"
      outline
    >
      <v-icon>
        mdi-calendar
      </v-icon>
      <div class="date-picker align-self-center">
        <h6 v-html="label" v-if="label" class="date-picker--label"></h6>
        <h4 class="mdi-opacity" v-if="date">{{ date | formatDate }}</h4>
        <h4 class="mdi-opacity" v-else>-- ---- ---</h4>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    label: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      date: this.value,
      openModal: false,
      minDate: undefined,
      maxDate: undefined
    };
  },
  watch: {
    date(newVal) {
      this.$emit("input", newVal);
    }
  },
  created() {
    this.date = this.value;
    this.minDate = new Date().setFullYear(1900, 0, 0);
    this.maxDate = new Date().setFullYear(2010, 0, 0);

    console.log("Min: %s | Max: %s", this.minDate, this.maxDate);
  }
};
</script>

<style scoped lang="scss">
.date-picker-wrapper {
  border: 1px solid #000;
  border-radius: 3px;
  padding: 8px 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.date-picker {
  display: flex;
  flex-direction: column;

  .date-picker--label {
    opacity: 0.54;
  }

  .v-messaages {
    display: none;
  }
}
</style>
