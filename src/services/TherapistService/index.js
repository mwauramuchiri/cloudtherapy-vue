//* IMPORTS
/* 
    This file acts as an aggregator for functions related to the `TherapistService`
    Each function corresponds to a file in the `services/TherapistService` directory
*/
import diagnosePeer from "./diagnosis/diagnosePeer";
import getDiagnosis from "./diagnosis/getDiagnosis";
import getSingleTherapist from "./getSingleTherapist";
import getTherapists from "./getTherapists";
import updateTherapist from "./updateTherapist";

//* EXPORTS
export default {
  diagnosePeer,
  getDiagnosis,
  getSingleTherapist,
  getTherapists,
  updateTherapist
};
