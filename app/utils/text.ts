import words from "@/assets/constant/words.json";

export const generateText = (
  textLength: number,
  lang: "french" | "english",
): string => {
  const randomWords: string[] = [];
  for (let index = 0; index < textLength; index++) {
    const randomIndex = Math.floor(Math.random() * 1001);
    if (lang === "french") randomWords.push(words.french[randomIndex]);
    else randomWords.push(words.english[randomIndex]);
  }

  return randomWords.join(" ");
};
