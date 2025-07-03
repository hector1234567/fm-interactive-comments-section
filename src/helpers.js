export function generateRandomId() {
  return Math.floor(Math.random() * 1000000000000000);
}

export function getNowDateFormmatted() {
  return "Today at " + new Date().toLocaleTimeString();
}
