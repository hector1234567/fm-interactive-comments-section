export class FormView {
  _parentEl = document.querySelector("main");

  constructor(currentUser) {
    this._currentUser = currentUser;
  }

  render() {
    this._parentEl.insertAdjacentHTML("afterbegin", this._generateMarkup());
    return this;
  }

  _generateMarkup() {
    return `
        <form>
            <figure>
                <img src="${this._currentUser.image.png}" alt="Avatar" />
            </figure>
            <textarea
                name="reply"
                id="reply"
                rows="3"
                placeholder="Add a comment..."
            ></textarea>
            <button type="submit">SEND</button>
        </form>
      `;
  }
}

export class ReplyFormView extends FormView {
  constructor(id, currentUser) {
    super(currentUser);
    this._id = id;
    this._commentEl = document.querySelector("#comment--" + this._id);
  }

  render() {
    this._commentEl.insertAdjacentHTML("afterend", this._generateMarkup());
  }

  _generateMarkup() {
    return `
        <form id="form--${this._id}">
            <figure>
                <img src="${this._currentUser.image.png}" alt="Avatar" />
            </figure>
            <textarea
                name="reply"
                id="reply"
                rows="3"
                placeholder="Add a comment..."
            ></textarea>
            <button type="submit">Reply</button>
        </form>
      `;
  }
}

export class EditFormView {
  constructor(id) {
    this._id = id;
    this._commentEl = document.querySelector("#comment--" + this._id);
  }

  render() {
    this._commentEl.querySelector(".comment__content").innerHTML =
      this._generateMarkup();
  }

  _generateMarkup() {
    return `
        <form id="editForm--${this._id}">
            <textarea
                name="reply"
                id="reply"
                rows="3"
                placeholder="Add a comment..."
            >${
              this._commentEl.querySelector(".comment__content").innerText
            }</textarea>
            <button type="submit">Update</button>
        </form>
      `;
  }
}
