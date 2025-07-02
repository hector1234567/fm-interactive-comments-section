import { CommentView } from "./commentView.js";
import { FormView, ReplyFormView } from "./formView.js";
import { updateScoreCount, getComments, state } from "./model.js";

const mainEl = document.querySelector("main");

(async function () {
  try {
    await getComments();
    renderComments();
  } catch (e) {
    console.error(e);
  }
})();

function renderComments() {
  mainEl.innerHTML = "";
  new FormView(state.currentUser).render();
  state.comments.forEach((comment) => addComment(comment, mainEl));
}

function addComment(comment, divEl) {
  new CommentView(divEl, state.currentUser)
    .render(comment)
    .addHandlersClickEvent(handleShowReplyForm, handleScore);

  if (!comment.replies) return;
  const repliesEl = document.querySelector("#replies--" + comment.id);
  comment.replies.forEach((comment) => addComment(comment, repliesEl));
}

function handleShowReplyForm(id) {
  new ReplyFormView(id, state.currentUser).render();
}

function handleScore(direction, commentId) {
  updateScoreCount(direction, commentId);
  renderComments();
}
