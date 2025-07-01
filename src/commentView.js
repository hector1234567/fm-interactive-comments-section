export class CommentView {
  constructor(parentEl, currentUser) {
    this._parentEl = parentEl;
    this._currentUser = currentUser;
  }

  render(data) {
    this._data = data;
    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup());
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
                ${this._renderYouBadge(user.username)}
                <p class="comment__created-at">${createdAt}</p>
            </div>
            <div class="comment__actions">
                ${this._renderActionButtons(user.username)}
            </div>
            <div class="comment__content">${content}</div>
        </div>
        <div class="replies" id="replies--${id}"></div>
        `;
  }

  _renderYouBadge(username) {
    if (username === this._currentUser.username) {
      return '<p class="comment__badge">you</p>';
    }
    return "";
  }

  _renderActionButtons(username) {
    if (username === this._currentUser.username) {
      return `
        <button class="btn-danger">
            <img src="/images/icon-delete.svg" alt="Delete" /><span
            >Delete</span
            >
        </button>
        <button class="btn-primary">
            <img src="/images/icon-edit.svg" alt="Edit" /><span>Edit</span>
        </button>
        `;
    }
    return `
        <button class="btn-primary">
            <img src="/images/icon-reply.svg" alt="Reply" /><span>Reply</span>
        </button>
        `;
  }
}
