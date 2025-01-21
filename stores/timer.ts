export const useTimerStore = defineStore("timer", () => {
  const { getItem, setItem } = localStorageUtil<number>("time");

  const timer = reactive<{ init: number; counter: number }>({
    init: getItem() || 15,
    counter: getItem() || 15,
  });

  const setTimer = (value: number) => {
    setItem(value);
    timer.counter = value;
    timer.init = value;
  };

  let timerInterval: ReturnType<typeof setInterval>;
  const startTimer = () => {
    timerInterval = setInterval(() => {
      timer.counter--;
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timerInterval);
  };
  const resetTimer = () => {
    clearInterval(timerInterval);
    timer.counter = getItem() || 15;
  };

  return { timer, setTimer, startTimer, stopTimer, resetTimer };
});
