import {
  generateRandomId,
  getNowDateFormmatted,
  loadState,
  saveState,
} from "./helpers.js";

export let state = {};

window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  saveState(state);
});

async function getComments() {
  state = await loadState();
}

function updateScoreCount(direction, commentId) {
  const updatedComments = state.comments.map((comment) =>
    updateCommentScore(direction, comment, commentId)
  );
  state = { ...state, comments: updatedComments };
}

function updateCommentScore(direction, comment, commentId) {
  if (comment.id === commentId && comment.voted !== direction) {
    const score = direction === "up" ? comment.score + 1 : comment.score - 1;
    const voted = comment.voted ? null : direction;
    return { ...comment, score, voted };
  } else if (comment.replies) {
    const updatedReplies = comment.replies.map((reply) =>
      updateCommentScore(direction, reply, commentId)
    );
    return { ...comment, replies: updatedReplies };
  } else {
    return comment;
  }
}

function deleteComment(commentId) {
  const updatedComments = state.comments.map((comment) =>
    updateDeleteComent(comment, commentId)
  );
  state = { ...state, comments: updatedComments };
}

function updateDeleteComent(comment, commentId) {
  if (comment.id === commentId) {
    return { ...comment, deleted: true };
  } else if (comment.replies) {
    const updatedReplies = comment.replies.map((reply) =>
      updateDeleteComent(reply, commentId)
    );
    return { ...comment, replies: updatedReplies };
  } else {
    return comment;
  }
}

function createNewComment(content) {
  const comment = {
    id: generateRandomId(),
    content,
    createdAt: getNowDateFormmatted(),
    score: 0,
    user: state.currentUser,
    replies: [],
  };

  state.comments.push(comment);
}

function createNewReply(content, id) {
  const reply = {
    id: generateRandomId(),
    content,
    createdAt: getNowDateFormmatted(),
    score: 0,
    user: state.currentUser,
    replies: [],
  };

  state.comments.forEach((comment) => addNewReply(comment, id, reply));
}

function addNewReply(comment, id, reply) {
  if (comment.id === id) {
    comment.replies = comment.replies ? [...comment.replies, reply] : [reply];
  } else if (comment.replies) {
    comment.replies.forEach((comment) => addNewReply(comment, id, reply));
  }
}

function editComment(content, id) {
  state.comments.forEach((comment) => modifyComment(comment, content, id));
}

function modifyComment(comment, content, id) {
  if (comment.id === id) {
    comment.content = content;
  } else if (comment.replies) {
    comment.replies.forEach((comment) => modifyComment(comment, content, id));
  }
}

export default {
  state,
  getComments,
  updateScoreCount,
  deleteComment,
  createNewComment,
  createNewReply,
  editComment,
};
