export class FormView {
  constructor(id, currentUser) {
    this._id = id;
    this._currentUser = currentUser;
  }

  render() {
    document
      .querySelector("#comment--" + this._id)
      .insertAdjacentHTML("afterend", this._generateMarkup());
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
