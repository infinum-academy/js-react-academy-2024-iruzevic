export function setLocalStorage(name, todoList) {
	localStorage.setItem(name, JSON.stringify(todoList));
}

export function getLocalStorage(name) {
	const todoList = localStorage.getItem(name);

	if (todoList) {
		return JSON.parse(todoList);
	}
}
