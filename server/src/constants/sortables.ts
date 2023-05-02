export enum SORT_KEY {
  DISTANCE = "distance",
  FOODS = "foods",
  REVIEWS = "reviews",
  RATING = "rating",
  LAST_UPDATED = "last_updated",
}

export type SortKey =
  | SORT_KEY.DISTANCE
  | SORT_KEY.FOODS
  | SORT_KEY.REVIEWS
  | SORT_KEY.RATING
  | SORT_KEY.LAST_UPDATED;

export enum SORT_DIRECTION {
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export type SortDirection =
  | SORT_DIRECTION.ASCENDING
  | SORT_DIRECTION.DESCENDING;

export const SORT_DIRECTION_MAPPING = {
  [SORT_DIRECTION.ASCENDING]: 1,
  [SORT_DIRECTION.DESCENDING]: -1,
};
