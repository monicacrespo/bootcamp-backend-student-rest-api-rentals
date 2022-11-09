import { ListingAndReviewsRepository } from './listingAndReviews.repository';
import { ListingAndReviews, Review } from '../listingAndReviews.model';
import { db } from '../../mock-data';

const insertReview = (id: string, review: Review) => {
  const listingsAndReviews = db.listingsAndReviews;
  let newReview: Review = {
    ...review
  };
  const listingIndex = listingsAndReviews.findIndex(l => l._id ===  id);
  if (listingIndex != -1) {
    listingsAndReviews[listingIndex].reviews.push(newReview);
  }
  else {
    newReview = { date: new Date(), reviewer_name: "", comments: "", listing_id: "0" }    
  }
  return newReview;
};

const paginateListingAndReviewsList = (
  listingAndReviewsList: ListingAndReviews[],
  country: string,
  page: number,
  pageSize: number
): ListingAndReviews[] => {
  let paginatedListingAndReviewsList = [...listingAndReviewsList];
  if (country !== 'undefined') {
    paginatedListingAndReviewsList = paginatedListingAndReviewsList.filter((l) => l.address.country === country);
  }
  if (paginatedListingAndReviewsList.length > 0 && page && pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, paginatedListingAndReviewsList.length);
    paginatedListingAndReviewsList = paginatedListingAndReviewsList.slice(startIndex, endIndex);
  }
  return paginatedListingAndReviewsList;
};

export const mockRepository: ListingAndReviewsRepository = {
  getListingAndReviewsList: async (country?: string, page?: number, pageSize?: number) =>
    paginateListingAndReviewsList(db.listingsAndReviews, country, page, pageSize),
  getListingAndReviews: async (id: string) => db.listingsAndReviews.find((b) => b._id === id),
  insertReview: async (id: string, review: Review) => insertReview(id, review),
};