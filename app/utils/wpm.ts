export const wpmUtils = (
  wpm: wpmType[],
  userInputLength: number,
  timerInitValue: number,
  timerCounter: number,
) => {
  const wpmRaw = Math.floor(
    userInputLength / 5 / ((timerInitValue - timerCounter) / 60),
  );

  const allErrors = wpm.reduce((sum, entry) => sum + entry.errors, 0);
  const wpmNet = Math.floor(
    (userInputLength / 5 - allErrors) / ((timerInitValue - timerCounter) / 60),
  );

  return { wpmRaw, wpmNet: Math.max(0, wpmNet) };
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

const getHighestWpmForTime = (gamesArray: Game[]) => {
  return [15, 30, 60, 120].map((time) => {
    const wpmValues = gamesArray
      .filter((game) => game.stats.time === time)
      .map((game) => game.stats.wpm);

    const wpm = wpmValues.length > 0 ? Math.max(...wpmValues) : null;

    return { time, wpm };
  });
};

export const getWpmUserStats = (games: Game[]) => {
  const testPlayed = games.length;

  const secondsPlayed = games.reduce((sec, game) => sec + game.stats.time, 0);
  const timePlayed = formatSecondsToHMS(secondsPlayed);

  const frenchGames = games.filter((game) => game.stats.language === "french");
  const englishGames = games.filter(
    (game) => game.stats.language === "english",
  );
  const highestWpm = {
    english: getHighestWpmForTime(englishGames),
    french: getHighestWpmForTime(frenchGames),
  };

  const avgRaw = Math.floor(
    games.reduce((count, game) => count + game.stats.raw, 0) / testPlayed,
  );
  const avgWpm = Math.floor(
    games.reduce((count, game) => count + game.stats.wpm, 0) / testPlayed,
  );

  return { testPlayed, timePlayed, avgWpm, avgRaw, highestWpm };
};
