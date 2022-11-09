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
  insertReview: async (id: string, review: Review) => {
    await listingAndReviewsContext.findOneAndUpdate(
      {
        _id: id,
        "reviews.reviewer_name":  { $ne: review.reviewer_name }
      },
      { $push: { reviews:  { ...review } } },  
      // If the value already exists in the array, $push will still append the value (resulting in duplicate values). 
      // However, $addToSet only appends the value if it doesn't already exist in the array. 
      // Therefore, if the value already exists, $addToSet won't append it (it will do nothing).
      { upsert: true, returnDocument: "after" }
      // upsert: true indicates to insert the new review if the filter doesn't get the match (the listing does not exist).
      // returnDocument: "after" indicates to return the document after the update, replacement, or insert occurred.
    ).lean();
    return review;
  }
}