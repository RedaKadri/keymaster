import type { wpmType } from "~/types";

export const getWpmErrors = (
  prevUserInputIndex: number,
  userInput: string,
  text: string,
) => {
  let wpmErrors = 0;
  for (let index = prevUserInputIndex; index < userInput.length; index++) {
    if (userInput[index] !== text[index]) wpmErrors++;
  }
  return wpmErrors;
};

export const getAllWpmErrors = (wpm: wpmType[]) => {
  let allErrorsCount = 0;
  for (let index = 0; index < wpm.length; index++) {
    allErrorsCount += wpm[index].errors;
  }
  return allErrorsCount;
};
