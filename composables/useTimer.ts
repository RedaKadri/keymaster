export default function (valueInSeconds = 15) {
  const timer = reactive<{
    counter: number;
    status: "idle" | "active" | "done";
  }>({ counter: valueInSeconds, status: "idle" });

  let timerInterval: ReturnType<typeof setInterval>;

  const startTimer = () => {
    timer.status = "active";
    timerInterval = setInterval(() => {
      timer.counter--;
    }, 1000);
  };

  const stopTimer = () => {
    timer.status = "done";
    clearInterval(timerInterval);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    timer.counter = valueInSeconds;
    timer.status = "idle";
  };

  return { timer, startTimer, stopTimer, resetTimer };
}
