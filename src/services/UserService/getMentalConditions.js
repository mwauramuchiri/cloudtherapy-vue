// Utils
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";

const _mentalConditionsRef = collection(db, "mentalConditions");

/** Get mental conditions*/
const getMentalConditions = async (beforeFn = () => {}, afterFn = () => {}) => {
  // Only run the before function if it is defined
  if (beforeFn) {
    beforeFn();
  }

  const q = query(_mentalConditionsRef, orderBy("name", "asc"))

  return getDocs(q)
    .then((querySnapshot) => {
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
