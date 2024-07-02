//! Remove lodash as a dependency in future
import * as _ from "lodash";

/** Gets a random positive integer within the range of `min`(include) to `max`(exclude)
 * `max` is excluded, meaning the actual highest value random number is `max-1`
 * @param {Number} min The minimum random number
 * @param {Number} max The maximum random number. It is excluded and the actual max is `max-1`
 * @return {Number} A random number in the range of `min` to `max-1`
 */
const getRandomNumInRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

/** Get a random list of array values (Primitives) in an array
 * @param {Array} array The array to select random values fromm
 * @param {Number}numItemsToReturn The number of array items we want to return
 * @notes This function relies on Lodash's shuffle function ~ find a way to get rid of this dependency
 */
const getRandomArrayValues = (array, numItemsToReturn) => {
  if (numItemsToReturn > array.length || numItemsToReturn <= 0) {
    throw new Error(
      `Cannot select more values (${numItemsToReturn}) than the length of the array (${array.length}) or less than 1 random`
    );
  }

  // Getting here means we can
  const randomArray = _.shuffle(array).filter(
    (val, index) => index < numItemsToReturn
  );
  return randomArray;
};

//* EXPORTS
export { getRandomNumInRange, getRandomArrayValues };
