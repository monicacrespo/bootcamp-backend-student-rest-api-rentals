import { ListingAndReviews, Review } from '../listingAndReviews.model';

export interface ListingAndReviewsRepository {
  getListingAndReviewsList: (country?: string, page?: number, pageSize?: number) => Promise<ListingAndReviews[]>;
  getListingAndReviews: (id: string) => Promise<ListingAndReviews>;
  insertReview: (review: Review) => Promise<Review>;
}