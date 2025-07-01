export class CommentView {
  constructor(parentEl) {
    this._parentEl = parentEl;
  }

  static renderCommentsInsideDiv(comments, divEl) {
    comments.forEach((comment) => {
      new CommentView(divEl).render(comment);
    });
  }

  render(data) {
    this._data = data;
    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup());

    if (!data.replies) return;
    const repliesEl = this._parentEl.querySelector("#replies--" + data.id);
    CommentView.renderCommentsInsideDiv(data.replies, repliesEl);
  }

  _generateMarkup() {
    const { id, content, createdAt, score, user } = this._data;

    return `
        <div class="comment" id="comment--${id}">
            <div class="comment__counter">
                <img src="/images/icon-plus.svg" alt="Plus" />
                <p class="counter__number">${score}</p>
                <img src="/images/icon-minus.svg" alt="Minus" />
            </div>
            <div class="comment__data">
                <figure>
                    <img src="${user.image.png}" alt="Avatar" />
                </figure>
                <p class="comment__user-name">${user.username}</p>
                <p class="comment__created-at">${createdAt}</p>
            </div>
            <div class="comment__actions">
                <button class="btn-danger">
                    <img src="/images/icon-delete.svg" alt="Delete" /><span
                    >Delete</span
                    >
                </button>
                <button class="btn-primary">
                    <img src="/images/icon-reply.svg" alt="Reply" /><span>Reply</span>
                </button>
            </div>
            <div class="comment__content">${content}</div>
        </div>
        <div class="replies" id="replies--${id}"></div>
        `;
  }
}
