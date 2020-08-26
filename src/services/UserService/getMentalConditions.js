// Utils
import { db } from "../../utils/firebase";

const _mentalConditionsRef = db.collection("mentalConditions");

/** Get mental conditions*/
const getMentalConditions = async (beforeFn = () => {}, afterFn = () => {}) => {
  // Only run the before function if it is defined
  if (beforeFn) {
    beforeFn();
  }

  // Sets up realtime listener for chat
  return _mentalConditionsRef.get().then((querySnapshot) => {
    const mentalConditions = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    afterFn(mentalConditions);
  });
};

//* EXPORTS
export default getMentalConditions;
