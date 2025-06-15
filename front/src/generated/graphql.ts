import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Label = {
  __typename?: 'Label';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLabel: Label;
  createPriority: Priority;
  createStatus: Status;
  createTodo: Todo;
  deleteTodo: Scalars['Boolean']['output'];
  updateTodo: Todo;
};


export type MutationCreateLabelArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreatePriorityArgs = {
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};


export type MutationCreateStatusArgs = {
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  order: Scalars['Int']['input'];
};


export type MutationCreateTodoArgs = {
  input: TodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateTodoArgs = {
  id: Scalars['ID']['input'];
  input: TodoInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Priority = {
  __typename?: 'Priority';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  labels: Array<Label>;
  priorities: Array<Priority>;
  statuses: Array<Status>;
  todo?: Maybe<Todo>;
  todos: TodoConnection;
};


export type QueryTodoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTodosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<TodoFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<TodoSortInput>;
};

export type SortOrder =
  | 'ASC'
  | 'DESC';

export type Status = {
  __typename?: 'Status';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Int']['output'];
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  labels: Array<Label>;
  priority: Priority;
  startDate?: Maybe<Scalars['Date']['output']>;
  status: Status;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TodoConnection = {
  __typename?: 'TodoConnection';
  edges: Array<TodoEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type TodoEdge = {
  __typename?: 'TodoEdge';
  cursor: Scalars['String']['output'];
  node: Todo;
};

export type TodoFilterInput = {
  keywordDescription?: InputMaybe<Scalars['String']['input']>;
  keywordTitle?: InputMaybe<Scalars['String']['input']>;
  labelIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  statusIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type TodoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  labelIds: Array<Scalars['ID']['input']>;
  priorityId: Scalars['ID']['input'];
  startDate?: InputMaybe<Scalars['Date']['input']>;
  statusId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type TodoSortInput = {
  order?: InputMaybe<SortOrder>;
};

export type GetLabelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLabelsQuery = { __typename?: 'Query', labels: Array<{ __typename?: 'Label', id: string, name: string }> };

export type GetPrioritiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrioritiesQuery = { __typename?: 'Query', priorities: Array<{ __typename?: 'Priority', id: string, name: string, order: number }> };

export type GetStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatsQuery = { __typename?: 'Query', statuses: Array<{ __typename?: 'Status', id: string, code: string, name: string, order: number }> };


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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLabelsQuery, GetLabelsQueryVariables>(GetLabelsDocument, options);
      }
export function useGetLabelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLabelsQuery, GetLabelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLabelsQuery, GetLabelsQueryVariables>(GetLabelsDocument, options);
        }
export function useGetLabelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLabelsQuery, GetLabelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrioritiesQuery, GetPrioritiesQueryVariables>(GetPrioritiesDocument, options);
      }
export function useGetPrioritiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrioritiesQuery, GetPrioritiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrioritiesQuery, GetPrioritiesQueryVariables>(GetPrioritiesDocument, options);
        }
export function useGetPrioritiesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPrioritiesQuery, GetPrioritiesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPrioritiesQuery, GetPrioritiesQueryVariables>(GetPrioritiesDocument, options);
        }
export type GetPrioritiesQueryHookResult = ReturnType<typeof useGetPrioritiesQuery>;
export type GetPrioritiesLazyQueryHookResult = ReturnType<typeof useGetPrioritiesLazyQuery>;
export type GetPrioritiesSuspenseQueryHookResult = ReturnType<typeof useGetPrioritiesSuspenseQuery>;
export type GetPrioritiesQueryResult = Apollo.QueryResult<GetPrioritiesQuery, GetPrioritiesQueryVariables>;
export const GetStatsDocument = gql`
    query GetStats {
  statuses {
    id
    code
    name
    order
  }
}
    `;

/**
 * __useGetStatsQuery__
 *
 * To run a query within a React component, call `useGetStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatsQuery(baseOptions?: Apollo.QueryHookOptions<GetStatsQuery, GetStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, options);
      }
export function useGetStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatsQuery, GetStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, options);
        }
export function useGetStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStatsQuery, GetStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStatsQuery, GetStatsQueryVariables>(GetStatsDocument, options);
        }
export type GetStatsQueryHookResult = ReturnType<typeof useGetStatsQuery>;
export type GetStatsLazyQueryHookResult = ReturnType<typeof useGetStatsLazyQuery>;
export type GetStatsSuspenseQueryHookResult = ReturnType<typeof useGetStatsSuspenseQuery>;
export type GetStatsQueryResult = Apollo.QueryResult<GetStatsQuery, GetStatsQueryVariables>;