/**
 * Admissions content for v1. Process and eligibility are framed generally and
 * truthfully; exact dates and fees must be confirmed by the office before being
 * presented as fact — left as clearly-marked TODO until then.
 */

export const ADMISSION_STEPS = [
  {
    step: 1,
    title: "Enquire",
    description:
      "Submit the enquiry form below with your details and the class you are interested in. Our office will be in touch.",
  },
  {
    step: 2,
    title: "Visit & discuss",
    description:
      "Visit the campus, meet our team and discuss your child's needs, eligibility and the right starting point.",
  },
  {
    step: 3,
    title: "Apply",
    description:
      "Complete the application form and submit the required documents for the class you are applying to.",
  },
  {
    step: 4,
    title: "Confirmation",
    description:
      "On acceptance, complete the admission formalities and fee payment to confirm your child's place.",
  },
];

export const ELIGIBILITY = [
  "Admission is open to children across all classes, subject to age criteria and seat availability.",
  "Pre-primary (LKG) admission follows the age norms prescribed for Kerala schools.", // TODO(office): confirm exact age cut-off
  "Admission to higher classes may be subject to an interaction and previous academic records.",
];

export const DOCUMENTS = [
  "Birth certificate",
  "Transfer Certificate (TC) from the previous school, where applicable",
  "Previous year's report card / mark list, where applicable",
  "Passport-size photographs",
  "Address proof",
];

/** TODO(office): replace with confirmed dates for the relevant academic year. */
export const KEY_DATES = [
  { label: "Applications open", value: "To be announced" },
  { label: "Last date to apply", value: "To be announced" },
  { label: "Academic year begins", value: "To be announced" },
];

/** TODO(office): replace with the confirmed fee structure. */
export const FEE_NOTE =
  "Fee details vary by class. Please contact the school office or submit an enquiry for the current fee structure.";
