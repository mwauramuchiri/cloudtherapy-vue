import { BASE_API_URL } from "../../constants";

/** Get therapists
 * @param {Object} filters Optional filters to filter what kind of therapists we want
 */
const getTherapists = async (filters = {}) => {
  const _requestUrl = `${BASE_API_URL}/therapists`;

  return fetch(_requestUrl);
};

//* EXPORTS
export default getTherapists;
