import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromItems from '@store/reducers/item.reducer';

export const selectItemsState = createFeatureSelector<fromItems.ItemsState>('items');

export const getItemsLoading = createSelector(
  selectItemsState,
  items => items.isLoading
);

export const getAllItems = createSelector(
  selectItemsState,
  fromItems.selectAll
);
export const getAllItemsTotal = createSelector(
  selectItemsState,
  fromItems.selectTotal
);

export const getItemById = (id: number) => createSelector(
  selectItemsState,
  items => items.entities[id]
);

export const getAllStories =  createSelector(
  getAllItems,
  items => items.filter(item => item.type === 'story')
);

export const getAllStoriesTotal = createSelector(
  getAllStories,
  items => items.length
);

export const getAllJobs =  createSelector(
  getAllItems,
  items => items.filter(item => item.type === 'job')
);
export const getAllJobsTotal = createSelector(
  getAllJobs,
  items => items.length
);

export const getAllComments =  createSelector(
  getAllItems,
  items => items.filter(item => item.type === 'comment')
);
export const getAllCommentsTotal = createSelector(
  getAllComments,
  items => items.length
);

export const getAllPolls =  createSelector(
  getAllItems,
  items => items.filter(item => item.type === 'poll')
);
export const getAllPollsTotal = createSelector(
  getAllPolls,
  items => items.length
);

export const getAllPollopts =  createSelector(
  getAllItems,
  items => items.filter(item => item.type === 'pollopt')
);
export const getAllPolloptsTotal = createSelector(
  getAllPollopts,
  items => items.length
);

export const getItemsErrorMessage = createSelector(
  selectItemsState,
  items => items.errorMessage
);
