export let state = {};

export async function getComments() {
  const response = await fetch("/data.json");
  const data = await response.json();
  state = data;
}

export function updateScoreCount(direction, commentId) {
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
