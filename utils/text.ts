import words from "@/assets/constant/words.json";
console.log(words);

export const generateText = (
  textLength: number,
  lang: "french" | "english",
): string => {
  const randomWords: string[] = [];
  for (let index = 0; index < textLength; index++) {
    const randomIndex = Math.floor(Math.random() * 1001);
    if (lang === "english") randomWords.push(words.english[randomIndex]);
    else randomWords.push(words.french[randomIndex]);
  }

  return randomWords.join(" ");
};
