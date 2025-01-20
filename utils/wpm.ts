import type { wpmType } from "~/types";

export const wpmUtils = (
  wpm: wpmType[],
  userInputLength: number,
  timerInitValue: number,
  timerCounter: number,
) => {
  const wpmRaw = Math.floor(
    userInputLength / 5 / ((timerInitValue - timerCounter) / 60),
  );

  let allErrors = 0;
  for (let index = 0; index < wpm.length; index++) {
    allErrors += wpm[index].errors;
  }

  const wpmNet = Math.floor(
    (userInputLength / 5 - allErrors) / ((timerInitValue - timerCounter) / 60),
  );

  return { wpmRaw, wpmNet: wpmNet < 0 ? 0 : wpmNet };
};

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
