/* eslint-disable @typescript-eslint/no-explicit-any */

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
};

export type Label = {
  __typename?: "Label";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createLabel: Label;
  createPriority: Priority;
  createStatus: Status;
  createTodo: Todo;
  deleteTodo: Scalars["Boolean"]["output"];
  updateTodo: Todo;
};

export type MutationCreateLabelArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCreatePriorityArgs = {
  name: Scalars["String"]["input"];
  order: Scalars["Int"]["input"];
};

export type MutationCreateStatusArgs = {
  name: Scalars["String"]["input"];
  order: Scalars["Int"]["input"];
};

export type MutationCreateTodoArgs = {
  input: TodoInput;
};

export type MutationDeleteTodoArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationUpdateTodoArgs = {
  id: Scalars["ID"]["input"];
  input: TodoInput;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]["output"]>;
  hasNextPage: Scalars["Boolean"]["output"];
};

export type Priority = {
  __typename?: "Priority";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  order: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  labels: Array<Label>;
  priorities: Array<Priority>;
  statuses: Array<Status>;
  todo?: Maybe<Todo>;
  todos: TodoConnection;
};

export type QueryTodoArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTodosArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  filter?: InputMaybe<TodoFilterInput>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  sort?: InputMaybe<TodoSortInput>;
};

export type SortOrder = "ASC" | "DESC";

export type Status = {
  __typename?: "Status";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  order: Scalars["Int"]["output"];
};

export type Todo = {
  __typename?: "Todo";
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  endDate?: Maybe<Scalars["Date"]["output"]>;
  id: Scalars["ID"]["output"];
  labels: Array<Label>;
  priority: Priority;
  startDate?: Maybe<Scalars["Date"]["output"]>;
  status: Status;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type TodoConnection = {
  __typename?: "TodoConnection";
  edges: Array<TodoEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars["Int"]["output"];
};

export type TodoEdge = {
  __typename?: "TodoEdge";
  cursor: Scalars["String"]["output"];
  node: Todo;
};

export type TodoFilterInput = {
  keywordDescription?: InputMaybe<Scalars["String"]["input"]>;
  keywordTitle?: InputMaybe<Scalars["String"]["input"]>;
  labelIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  priorityIds?: InputMaybe<Scalars["ID"]["input"]>;
  statusIds?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type TodoInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  endDate?: InputMaybe<Scalars["Date"]["input"]>;
  labelIds: Array<Scalars["ID"]["input"]>;
  priorityId: Scalars["ID"]["input"];
  startDate?: InputMaybe<Scalars["Date"]["input"]>;
  statusId: Scalars["ID"]["input"];
  title: Scalars["String"]["input"];
};

export type TodoSortInput = {
  order?: InputMaybe<SortOrder>;
};

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteTodoMutation = { __typename?: "Mutation"; deleteTodo: boolean };

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
  input: TodoInput;
}>;

export type UpdateTodoMutation = { __typename?: "Mutation"; updateTodo: { __typename?: "Todo"; id: string; title: string; description?: string | null; startDate?: any | null; endDate?: any | null; priority: { __typename?: "Priority"; id: string; name: string; order: number }; status: { __typename?: "Status"; id: string; name: string; order: number }; labels: Array<{ __typename?: "Label"; id: string; name: string }> } };

export type GetLabelsQueryVariables = Exact<{ [key: string]: never }>;

export type GetLabelsQuery = { __typename?: "Query"; labels: Array<{ __typename?: "Label"; id: string; name: string }> };

export type GetPrioritiesQueryVariables = Exact<{ [key: string]: never }>;

export type GetPrioritiesQuery = { __typename?: "Query"; priorities: Array<{ __typename?: "Priority"; id: string; name: string; order: number }> };

export type GetStatusesQueryVariables = Exact<{ [key: string]: never }>;

export type GetStatusesQuery = { __typename?: "Query"; statuses: Array<{ __typename?: "Status"; id: string; name: string; order: number }> };

export type CreateTodoMutationVariables = Exact<{
  input: TodoInput;
}>;

export type CreateTodoMutation = { __typename?: "Mutation"; createTodo: { __typename?: "Todo"; id: string } };

export type GetTodosQueryVariables = Exact<{
  filter?: InputMaybe<TodoFilterInput>;
  sort?: InputMaybe<TodoSortInput>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type GetTodosQuery = {
  __typename?: "Query";
  todos: {
    __typename?: "TodoConnection";
    totalCount: number;
    edges: Array<{ __typename?: "TodoEdge"; cursor: string; node: { __typename?: "Todo"; id: string; title: string; description?: string | null; startDate?: any | null; endDate?: any | null; createdAt: any; updatedAt: any; priority: { __typename?: "Priority"; id: string; name: string; order: number }; status: { __typename?: "Status"; id: string; name: string; order: number }; labels: Array<{ __typename?: "Label"; id: string; name: string }> } }>;
    pageInfo: { __typename?: "PageInfo"; endCursor?: string | null; hasNextPage: boolean };
  };
};

export type GetTodoQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type GetTodoQuery = { __typename?: "Query"; todo?: { __typename?: "Todo"; id: string; title: string; description?: string | null; startDate?: any | null; endDate?: any | null; createdAt: any; updatedAt: any; priority: { __typename?: "Priority"; id: string; name: string; order: number }; status: { __typename?: "Status"; id: string; name: string; order: number }; labels: Array<{ __typename?: "Label"; id: string; name: string }> } | null };

export const DeleteTodoDocument = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
}
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const UpdateTodoDocument = gql`
  mutation UpdateTodo($id: ID!, $input: TodoInput!) {
    updateTodo(id: $id, input: $input) {
      id
      title
      description
      startDate
      endDate
      priority {
        id
        name
        order
      }
      status {
        id
        name
        order
      }
      labels {
        id
        name
      }
    }
  }
`;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
}
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const GetLabelsDocument = gql`
  query GetLabels {
    labels {
      id
      name
    }
  }
`;

/**
 * __useGetLabelsQuery__
 *
 * To run a query within a React component, call `useGetLabelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLabelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLabelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLabelsQuery(baseOptions?: Apollo.QueryHookOptions<GetLabelsQuery, GetLabelsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLabelsQuery, GetLabelsQueryVariables>(GetLabelsDocument, options);
}
export function useGetLabelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLabelsQuery, GetLabelsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLabelsQuery, GetLabelsQueryVariables>(GetLabelsDocument, options);
}
export function useGetLabelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLabelsQuery, GetLabelsQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetLabelsQuery, GetLabelsQueryVariables>(GetLabelsDocument, options);
}
export type GetLabelsQueryHookResult = ReturnType<typeof useGetLabelsQuery>;
export type GetLabelsLazyQueryHookResult = ReturnType<typeof useGetLabelsLazyQuery>;
export type GetLabelsSuspenseQueryHookResult = ReturnType<typeof useGetLabelsSuspenseQuery>;
export type GetLabelsQueryResult = Apollo.QueryResult<GetLabelsQuery, GetLabelsQueryVariables>;
export const GetPrioritiesDocument = gql`
  query GetPriorities {
    priorities {
      id
      name
      order
    }
  }
`;

/**
 * __useGetPrioritiesQuery__
 *
 * To run a query within a React component, call `useGetPrioritiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrioritiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrioritiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPrioritiesQuery(baseOptions?: Apollo.QueryHookOptions<GetPrioritiesQuery, GetPrioritiesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPrioritiesQuery, GetPrioritiesQueryVariables>(GetPrioritiesDocument, options);
}
export function useGetPrioritiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrioritiesQuery, GetPrioritiesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPrioritiesQuery, GetPrioritiesQueryVariables>(GetPrioritiesDocument, options);
}
export function useGetPrioritiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPrioritiesQuery, GetPrioritiesQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetPrioritiesQuery, GetPrioritiesQueryVariables>(GetPrioritiesDocument, options);
}
export type GetPrioritiesQueryHookResult = ReturnType<typeof useGetPrioritiesQuery>;
export type GetPrioritiesLazyQueryHookResult = ReturnType<typeof useGetPrioritiesLazyQuery>;
export type GetPrioritiesSuspenseQueryHookResult = ReturnType<typeof useGetPrioritiesSuspenseQuery>;
export type GetPrioritiesQueryResult = Apollo.QueryResult<GetPrioritiesQuery, GetPrioritiesQueryVariables>;
export const GetStatusesDocument = gql`
  query GetStatuses {
    statuses {
      id
      name
      order
    }
  }
`;

/**
 * __useGetStatusesQuery__
 *
 * To run a query within a React component, call `useGetStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatusesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatusesQuery(baseOptions?: Apollo.QueryHookOptions<GetStatusesQuery, GetStatusesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetStatusesQuery, GetStatusesQueryVariables>(GetStatusesDocument, options);
}
export function useGetStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatusesQuery, GetStatusesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetStatusesQuery, GetStatusesQueryVariables>(GetStatusesDocument, options);
}
export function useGetStatusesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatusesQuery, GetStatusesQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetStatusesQuery, GetStatusesQueryVariables>(GetStatusesDocument, options);
}
export type GetStatusesQueryHookResult = ReturnType<typeof useGetStatusesQuery>;
export type GetStatusesLazyQueryHookResult = ReturnType<typeof useGetStatusesLazyQuery>;
export type GetStatusesSuspenseQueryHookResult = ReturnType<typeof useGetStatusesSuspenseQuery>;
export type GetStatusesQueryResult = Apollo.QueryResult<GetStatusesQuery, GetStatusesQueryVariables>;
export const CreateTodoDocument = gql`
  mutation CreateTodo($input: TodoInput!) {
    createTodo(input: $input) {
      id
    }
  }
`;
export type CreateTodoMutationFn = Apollo.MutationFunction<CreateTodoMutation, CreateTodoMutationVariables>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTodoMutation, CreateTodoMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, options);
}
export type CreateTodoMutationHookResult = ReturnType<typeof useCreateTodoMutation>;
export type CreateTodoMutationResult = Apollo.MutationResult<CreateTodoMutation>;
export type CreateTodoMutationOptions = Apollo.BaseMutationOptions<CreateTodoMutation, CreateTodoMutationVariables>;
export const GetTodosDocument = gql`
  query GetTodos($filter: TodoFilterInput, $sort: TodoSortInput, $first: Int, $after: String) {
    todos(filter: $filter, sort: $sort, first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          startDate
          endDate
          priority {
            id
            name
            order
          }
          status {
            id
            name
            order
          }
          labels {
            id
            name
          }
          createdAt
          updatedAt
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
}
export function useGetTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
}
export function useGetTodosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, options);
}
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosSuspenseQueryHookResult = ReturnType<typeof useGetTodosSuspenseQuery>;
export type GetTodosQueryResult = Apollo.QueryResult<GetTodosQuery, GetTodosQueryVariables>;
export const GetTodoDocument = gql`
  query GetTodo($id: ID!) {
    todo(id: $id) {
      id
      title
      description
      startDate
      endDate
      priority {
        id
        name
        order
      }
      status {
        id
        name
        order
      }
      labels {
        id
        name
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetTodoQuery__
 *
 * To run a query within a React component, call `useGetTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTodoQuery(baseOptions: Apollo.QueryHookOptions<GetTodoQuery, GetTodoQueryVariables> & ({ variables: GetTodoQueryVariables; skip?: boolean } | { skip: boolean })) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTodoQuery, GetTodoQueryVariables>(GetTodoDocument, options);
}
export function useGetTodoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodoQuery, GetTodoQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTodoQuery, GetTodoQueryVariables>(GetTodoDocument, options);
}
export function useGetTodoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTodoQuery, GetTodoQueryVariables>) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetTodoQuery, GetTodoQueryVariables>(GetTodoDocument, options);
}
export type GetTodoQueryHookResult = ReturnType<typeof useGetTodoQuery>;
export type GetTodoLazyQueryHookResult = ReturnType<typeof useGetTodoLazyQuery>;
export type GetTodoSuspenseQueryHookResult = ReturnType<typeof useGetTodoSuspenseQuery>;
export type GetTodoQueryResult = Apollo.QueryResult<GetTodoQuery, GetTodoQueryVariables>;
