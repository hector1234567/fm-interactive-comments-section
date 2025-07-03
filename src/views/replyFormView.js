export default class ReplyFormView {
  constructor(id, currentUser) {
    this._currentUser = currentUser;
    this._id = id;
    this._commentEl = document.querySelector("#comment--" + this._id);
  }

  render() {
    this._commentEl.insertAdjacentHTML("afterend", this._generateMarkup());
    return this;
  }

  addHandlerSubmitEvent(submitHandler) {
    document
      .querySelector("#form--" + this._id)
      .addEventListener("submit", () => submitHandler(this._id));
  }

  addHandlerSubmitEvent(submitHandler) {
    document
      .querySelector("#form--" + this._id)
      .addEventListener("submit", (ev) => {
        ev.preventDefault();
        submitHandler(new FormData(ev.target), this._id);
      });
  }

  _generateMarkup() {
    return `
        <form id="form--${this._id}">
            <figure>
                <img src="${this._currentUser.image.png}" alt="Avatar" />
            </figure>
            <textarea
                name="content"
                id="reply"
                rows="3"
                placeholder="Add a comment..."
            ></textarea>
            <button type="submit" class="btn">Reply</button>
        </form>
      `;
  }
}
