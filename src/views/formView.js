export default class FormView {
  _parentEl = document.querySelector("main");

  constructor(currentUser) {
    this._currentUser = currentUser;
  }

  render() {
    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup());
    return this;
  }

  addHandlerSubmitEvent(submitHandler) {
    this._parentEl
      .querySelector("#newCommentForm")
      .addEventListener("submit", (ev) => {
        ev.preventDefault();
        submitHandler(new FormData(ev.target));
      });
  }

  _generateMarkup() {
    return `
        <form id="newCommentForm">
            <figure>
                <img src="${this._currentUser.image.png}" alt="Avatar" />
            </figure>
            <textarea
                name="content"
                id="content"
                rows="3"
                placeholder="Add a comment..."
            ></textarea>
            <button type="submit" class="btn">SEND</button>
        </form>
      `;
  }
}
