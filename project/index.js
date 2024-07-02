import {
	setLocalStorage,
	getLocalStorage,
} from './helpers/localstorage.js';

// General
const storageName = 'todo-list';

// Selectors and elements.
const ratingTemplate = document.querySelector('.js-rating-template');
const reviewsList = document.querySelector('.js-ratings-list');
const ratingOverview = document.querySelector('.js-rating-overview');

const form = document.querySelector('.js-form');
const formText = form.querySelector('.js-form-text');
const formValue = form.querySelector('.js-form-value');

// Mock data.
const mockReviews = [
	{
		title: 'Review 1',
		rating: 1,
	},
	{
		title: 'Review 2',
		rating: 2,
	},
	{
		title: 'Review 3',
		rating: 3,
	},
];

function initStorage() {
	const reviews = getLocalStorage(storageName);

	if (!reviews) {
		setLocalStorage(storageName, mockReviews);
	}
}

function initForm() {
	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const review = {
			title: formText.value,
			rating: parseInt(formValue.value, 10),
		};

		const newReviews = getLocalStorage(storageName).concat(review);

		setLocalStorage(storageName, newReviews);
		calcOverview();
		renderReviews(newReviews);

		event.target.reset();
	});
}

function calcOverview() {
	let totalRating = 0;

	const reviews = getLocalStorage(storageName);

	reviews.forEach((review) => totalRating += review.rating);

	return ratingOverview.textContent = totalRating / reviews.length;
}

/**
 * Get rating template item and populate it with content.
 *
 * @param {string} content Rating content.
 * @param {int} value Rating value.
 *
 * @returns {Node} Rating item.
 */
function getReviewItem(content, value) {
	const clone = ratingTemplate.content.cloneNode(true);

	const ratingItemContent = clone.querySelector('.js-rating-template-content');
	const ratingItemValue = clone.querySelector('.js-rating-template-value');
	const ratingItemButton = clone.querySelector('.js-rating-template-delete');

	ratingItemContent.textContent = content;
	ratingItemValue.textContent = value;
	ratingItemButton.onclick = () => {
		console.log('a');
	};

	return clone;
}

/**
 * Render reviews.
 *
 * @param {array} reviews Review list.
 *
 * @returns {void}
 */
function renderReviews() {
	reviewsList.innerHTML = '';

	getLocalStorage(storageName).forEach((review) => {
		const item = getReviewItem(review.title, review.rating);
		reviewsList.appendChild(item);
	});
}

initStorage();
renderReviews();
initForm();
calcOverview();
