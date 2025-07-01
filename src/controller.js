import { CommentView } from "./commentView.js";
import { FormView } from "./formView.js";
import { getComments, state } from "./model.js";

const mainEl = document.querySelector("main");

(async function () {
  try {
    await getComments();
    state.comments.forEach((comment) => addComment(comment, mainEl));
  } catch (e) {
    console.error(e);
  }
})();

function addComment(comment, divEl) {
  new CommentView(divEl, state.currentUser).render(comment);
  new FormView(comment.id, state.currentUser).render();

  if (!comment.replies) return;
  const repliesEl = document.querySelector("#replies--" + comment.id);
  comment.replies.forEach((comment) => addComment(comment, repliesEl));
}
