import { ListingAndReviewsRepository } from './listingAndReviews.repository';
import { Review } from '../listingAndReviews.model';
import { listingAndReviewsContext } from '../listingAndReviews.context';

// Due to Mongoose models provide several static helper functions, each of these functions returns mongoose query objects.
// Using lean method to get a better performance.
export const dbRepository: ListingAndReviewsRepository = {
  getListingAndReviewsList: async (country?: string, page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = Boolean(pageSize) ? pageSize : 0;  
    var query  = {};
    if (country !== 'undefined') query = {"address.country": country}
    return await listingAndReviewsContext
      .find(query)
      .skip(skip)
      .limit(limit)
      .lean();
  },
  getListingAndReviews: async (id: string) => {
    return await listingAndReviewsContext.findOne({_id: id}).lean();
  },
  insertReview: async (review: Review) => {
   return await listingAndReviewsContext.findOneAndUpdate(
      {
        _id: review.listing_id,
        "reviews.reviewer_name":  { $ne: review.reviewer_name }
      },
      { $push: { reviews:  { ...review, date: new Date() } } }, //"$$NOW"   
      // If the value already exists in the array, $push will still append the value (resulting in duplicate values). 
      // However, $addToSet only appends the value if it doesn't already exist in the array. 
      // Therefore, if the value already exists, $addToSet won't append it (it will do nothing).
    ).lean();
  }
}