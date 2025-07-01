import { CommentView } from "./commentView.js";
import { getComments, state } from "./model.js";

const mainEl = document.querySelector("main");

(async function () {
  try {
    await getComments();
    CommentView.renderCommentsInsideDiv(state.comments, mainEl);
  } catch (e) {
    console.error(e);
  }
})();
