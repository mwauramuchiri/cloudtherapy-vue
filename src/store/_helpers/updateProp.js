export default function updateProp(state, propData) {
  state[propData.name] = propData.value;
}
