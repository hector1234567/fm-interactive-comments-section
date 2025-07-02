import { CommentView } from "./views/commentView.js";
import { EditFormView, FormView, ReplyFormView } from "./views/formView.js";
import modalView from "./views/modalView.js";
import {
  updateScoreCount,
  getComments,
  state,
  deleteComment,
} from "./model.js";

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
  if (comment.deleted === true) return;
  new CommentView(divEl, state.currentUser)
    .render(comment)
    .addHandlersClickEvent(
      handleShowReplyForm,
      handleScore,
      handleShowEditForm,
      handleShowDeleteModal
    );

  if (!comment.replies) return;
  const repliesEl = document.querySelector("#replies--" + comment.id);
  comment.replies.forEach((comment) => addComment(comment, repliesEl));
}

function handleShowReplyForm(id) {
  new ReplyFormView(id, state.currentUser).render();
}

function handleShowEditForm(id) {
  new EditFormView(id).render();
}

function handleShowDeleteModal(id) {
  modalView
    .render(id)
    .addHandlersClickEvent(handleCloseModal, handleDeleteComment);
}

function handleScore(direction, commentId) {
  updateScoreCount(direction, commentId);
  renderComments();
}

function handleCloseModal() {
  modalView.remove();
}

function handleDeleteComment(id) {
  deleteComment(id);
  modalView.remove();
  renderComments();
}
