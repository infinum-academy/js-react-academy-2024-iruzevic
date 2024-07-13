import { ITodoList } from "@/typings/Todo.type";
import { fetcher } from "./fetcher";

interface ITodoListsResponse {
	todoLists: Array<ITodoList>;
};

export function getTodoLists() {
	return fetcher<ITodoListsResponse>('/api/todo-lists');
}

export function getTodoList(id: string) {
	return fetcher<ITodoList>(`/api/todo-lists/${id}`);
}
