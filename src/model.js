export let state = {};

export async function getComments() {
  const response = await fetch("/data.json");
  const data = await response.json();
  state = data;
}
