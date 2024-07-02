import { BASE_API_URL } from "../../constants";

/** Get a single therapist */
const getSingleTherapist = async therapistId => {
  const _requestUrl = `${BASE_API_URL}/therapists/${therapistId}`;

  return fetch(_requestUrl);
};

//* EXPORTS
export default getSingleTherapist;
