import { Student } from "@reducers/students";
import { Teacher } from "@reducers/teachers";

export const isAllFormsAreValid = (records: Teacher[] | Student[]) => {
  for (let i = 0; i < records.length; i++) {
    if (!records[i].isValid) return false;
  }
  return true;
};
