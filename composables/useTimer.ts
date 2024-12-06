export default function () {
  const { getItem, setItem } = useLocalStorage<number>("time");

  const timer = useState("timer", () => getItem() || 15);

  const setTimer = (value: number) => {
    setItem(value);
    timer.value = value;
  };

  let timerInterval: ReturnType<typeof setInterval>;
  const startTimer = () => {
    timerInterval = setInterval(() => {
      timer.value--;
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(timerInterval);
  };
  const resetTimer = () => {
    clearInterval(timerInterval);
    timer.value = getItem() || 15;
  };

  return { timer, setTimer, startTimer, stopTimer, resetTimer };
}
