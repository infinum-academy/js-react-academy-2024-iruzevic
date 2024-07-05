import {
	setLocalStorage,
	getLocalStorage,
} from './helpers/localstorage.js';

// General
const storageName = 'todo-list';

// Selectors and elements.
const ratingTemplate = document.querySelector('.js-rating-template');
const reviewsList = document.querySelector('.js-ratings-list');
const ratingOverviewValue = document.querySelector('.js-rating-overview-value');
const ratingOverviewRating = document.querySelector('.js-rating-overview-rating');

const form = document.querySelector('.js-form');
const formRating = form.querySelector('.js-form-rating');
const formRatingItem = form.querySelectorAll('.js-form-rating-item');
const formText = form.querySelector('.js-form-text');

// Mock data.
const mockReviews = [
	{
		content: 'Review 1',
		rating: 1,
	},
	{
		content: 'Review 2',
		rating: 2,
	},
	{
		content: 'Review 3',
		rating: 3,
	},
];

/**
 * Initialize the storage with the mock data if it doesn't exist.
 *
 * @returns {void}
 */
function initStorage() {
	const reviews = getLocalStorage(storageName);

	if (!reviews) {
		setLocalStorage(storageName, mockReviews);
	}
}

/**
 * Re-render the reviews list.
 *
 * @param {Array} data
 *
 * @returns {void}
 */
function reRenderReviews(data) {
	setLocalStorage(storageName, data);
	calcOverview();
	renderReviews();
}

/**
 * Initialize the star rating logic.
 *
 * @returns {void}
 */
function initStarRating() {
	formRatingItem.forEach((item) => {
		item.addEventListener('click', (event) => {
			formRating.setAttribute('data-rating', event.target.getAttribute('data-rate'));
		});
	});
}

/**
 * Initialize the form logic.
 *
 * @returns {void}
 */
function initForm() {
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		reRenderReviews([
			...getLocalStorage(storageName) ?? [],
			{
				content: formText.value,
				rating: parseInt(formRating.getAttribute('data-rating'), 10),
			}
		]);

		event.target.reset();
	});

	initStarRating();
}

/**
 * Calculate the average rating and update the overview element.
 *
 * @returns {void}
 */
function calcOverview() {
	let totalRating = 0;

	const reviews = getLocalStorage(storageName);

	reviews.forEach((review) => totalRating += review.rating);

	ratingOverviewValue.textContent = (reviews.length >0) ? Math.round((totalRating / reviews.length) * 100) / 100 : 0;
	ratingOverviewRating.setAttribute('data-rating', parseInt(ratingOverviewValue.textContent, 10));
}

/**
 * Get the review item from template.
 *
 * @param {object} review The review object.
 * @param {array} reviews The reviews array.
 *
 * @returns {Node} The review item.
 */
function getReviewItem(review, reviews) {
	const { rating, content } = review;

	if (!rating || !content) {
		return '';
	}

	const clone = ratingTemplate.content.cloneNode(true);

	const ratingItemContent = clone.querySelector('.js-rating-template-content');
	const ratingItemValue = clone.querySelector('.js-rating-template-value');
	const ratingItemButton = clone.querySelector('.js-rating-template-delete');
	const ratingItemRating = clone.querySelector('.js-rating-template-rating');

	ratingItemContent.textContent = content;
	ratingItemValue.textContent = rating;
	ratingItemRating.setAttribute('data-rating', rating);

	ratingItemButton.onclick = () => {
		reRenderReviews(
			reviews.filter((t) => t !== review)
		)
	};

	return clone;
}

/**
 * Render the reviews list.
 *
 * @returns {void}
 */
function renderReviews() {
	reviewsList.innerHTML = '';

	const reviews = getLocalStorage(storageName);

	reviews.forEach((review) => {
		const item = getReviewItem(review, reviews);
		reviewsList.prepend(item);
	});
}

initStorage();
renderReviews();
initForm();
calcOverview();
