export type Status = {
  language: "english" | "french";
  time: number;
  wpm: wpmType[];
};

export type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  email?: string;
};
