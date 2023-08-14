import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo, User } from './type'

export const todoApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
        credentials: "include",
        prepareHeaders: (headers, { getState }: any) => {
            const accessToken = window.localStorage.getItem("token");
            if (accessToken) {
                headers.set("token", `${accessToken}`);
            }

            return headers;
        }
    }),

    endpoints: (builder) => ({
        getTodos: builder.query<{ todo: Todo[], user: User[] }, {}>({
            query: () => '/todos',
        }),
        getTodo: builder.query<{}, number>({
            query: (id) => `/todos/${id}`
        }),
        addTodo: builder.mutation<{}, string>({
            query: description => ({
                url: '/todos',
                method: 'POST',
                body: { description }
            })
        }),
        updateTodo: builder.mutation<{}, { id: number, description: string }>({
            query: ({ id, description }) => ({
                url: `/todos/${id}`,
                method: 'PUT',
                body: { description }
            })
        }),
        deleteTodo: builder.mutation<{}, number>({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const {
    useGetTodosQuery,
    useGetTodoQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = todoApi