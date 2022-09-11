import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const pageBtn = e.target.closest('.btn--inline');

      if (!pageBtn) return;

      const goToPage = +pageBtn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    //  When we on page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
      <button data-goto =" ${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${currentPage + 1} </span>
      </button>
      `;
    }

    //  When are on the last page
    if (currentPage === numPages && numPages > 1) {
      // Go to next Page
      return `
        <button data-goto =" ${
          currentPage - 1
        }"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1} </span>
        </button>
        `;
    }

    // when we are on other page
    if (currentPage < numPages) {
      return `
        <button data-goto =" ${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
         <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
         </svg>
         <span>Page ${currentPage - 1} </span>
        </button>
        
      <button  data-goto =" ${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1} </span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `;
    }

    //  When we on page 1 and there are NO other pages
    return '';
  }
}
export default new PaginationView();
