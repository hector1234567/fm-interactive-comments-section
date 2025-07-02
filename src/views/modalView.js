class ModalView {
  _parentEl = document.body;

  render(id) {
    this._id = id;
    this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup());
    return this;
  }

  remove() {
    this._parentEl.querySelector(".modal-view")?.remove();
  }

  addHandlersClickEvent(handleCloseModal, handleDelete) {
    this._parentEl
      .querySelector(".modal-view")
      .addEventListener("click", (ev) => {
        if (
          ev.target.closest(".btn--secondary") ||
          ev.target.closest(".overlay")
        ) {
          handleCloseModal();
        } else if (ev.target.closest(".btn--danger")) {
          handleDelete();
        }
      });
  }

  _generateMarkup() {
    return `
        <div class="modal-view d-contents">
            <div class="overlay"></div>
            <div class="modal">
                <h3>Delete comment</h3>
                <p>
                    Are you sure you want to delete this comment? This will remove the
                    comment and ca't be undone.
                </p>
                <div class="modal__buttons">
                    <button class="btn btn--secondary">No, cancel</button>
                    <button class="btn btn--danger">Yes, delete</button>
                </div>
            </div>
        </div>
      `;
  }
}

export default new ModalView();
