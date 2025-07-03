export function generateRandomId() {
  return Math.floor(Math.random() * 1000000000000000);
}

export function getNowDateFormmatted() {
  return "Today at " + new Date().toLocaleTimeString();
}

export async function saveState(state) {
  if ("indexedDB" in window) {
    return new Promise((resolve, reject) => {
      const open = indexedDB.open("InteractiveCommentsSectionDB", 1);

      open.onupgradeneeded = function (event) {
        const db = event.target.result;

        db.createObjectStore("Store", {
          keyPath: "id",
        });
      };

      open.onsuccess = () => {
        const db = open.result;
        const transaction = db.transaction(["Store"], "readwrite");
        const store = transaction.objectStore("Store");

        resolve(store.put({ id: 1, state }));
      };

      open.onerror = () => {
        reject("Error opening indexedDB");
      };
    });
  } else {
    console.log("No IndexedDB");
  }
}

export async function loadState(state) {
  return new Promise((resolve, reject) => {
    if ("indexedDB" in window) {
      const open = indexedDB.open("InteractiveCommentsSectionDB", 1);

      open.onupgradeneeded = function (event) {
        const db = event.target.result;

        db.createObjectStore("Store", {
          keyPath: "id",
        });
      };

      open.onsuccess = () => {
        const db = open.result;
        const transaction = db.transaction(["Store"], "readonly");
        const store = transaction.objectStore("Store");

        const newState = store.get(1);

        newState.onsuccess = () => {
          if (!newState.result) {
            fetch("/data.json")
              .then((res) => res.json())
              .then((data) => resolve(data));
          } else {
            resolve(newState.result.state);
          }
        };
      };

      open.onerror = () => {
        reject("Error opening indexedDB");
      };
    } else {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => resolve(data));
    }
  });
}
