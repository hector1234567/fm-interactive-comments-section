import { CommentView } from "./views/commentView.js";
import FormView from "./views/formView.js";
import EditFormView from "./views/editFormView.js";
import ReplyFormView from "./views/replyFormView.js";
import modalView from "./views/modalView.js";
import model, { state } from "./model.js";

const mainEl = document.querySelector("main");

(async function () {
  try {
    await model.getComments();
    renderComments();
  } catch (e) {
    console.error(e);
  }
})();

function renderComments() {
  mainEl.innerHTML = "";
  new FormView(state.currentUser)
    .render()
    .addHandlerSubmitEvent(handleSubmitNewComment);
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
  comment.replies.forEach((com) => addComment(com, repliesEl));
}

function handleShowReplyForm(id) {
  new ReplyFormView(id, state.currentUser)
    .render()
    .addHandlerSubmitEvent(handleSubmitReply);
}

function handleShowEditForm(id) {
  new EditFormView(id).render().addHandlerSubmitEvent(handleSubmitEdit);
}

function handleShowDeleteModal(id) {
  modalView
    .render(id)
    .addHandlersClickEvent(handleCloseModal, handleDeleteComment);
}

function handleScore(direction, commentId) {
  model.updateScoreCount(direction, commentId);
  renderComments();
}

function handleCloseModal() {
  modalView.remove();
}

function handleDeleteComment(id) {
  model.deleteComment(id);
  modalView.remove();
  renderComments();
}

function handleSubmitNewComment(formData) {
  model.createNewComment(formData.get("content"));
  renderComments();
}

function handleSubmitReply(formData, id) {
  model.createNewReply(formData.get("content"), id);
  renderComments();
}

function handleSubmitEdit(formData, id) {
  model.editComment(formData.get("content"), id);
  renderComments();
}
