export default class EditFormView {
  constructor(id) {
    this._id = id;
    this._commentEl = document.querySelector("#comment--" + this._id);
  }

  render() {
    this._commentEl.querySelector(".comment__content").innerHTML =
      this._generateMarkup();
    return this;
  }

  addHandlerSubmitEvent(submitHandler) {
    this._commentEl
      .querySelector("#editForm--" + this._id)
      .addEventListener("submit", (ev) => {
        ev.preventDefault();
        submitHandler(new FormData(ev.target), this._id);
      });
  }

  _generateMarkup() {
    return `
        <form id="editForm--${this._id}">
            <textarea
                name="content"
                class="edit-form"
                rows="3"
                placeholder="Add a comment..."
            >${
              this._commentEl.querySelector(".comment__content").innerText
            }</textarea>
            <button type="submit" class="btn">Update</button>
        </form>
      `;
  }
}
