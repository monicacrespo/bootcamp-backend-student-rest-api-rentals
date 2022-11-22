import { ListingAndReviewsRepository } from './listingAndReviews.repository';
import { ListingAndReviews, Review } from '../listingAndReviews.model';
import { listingAndReviewsContext } from '../listingAndReviews.context';

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
      { $push: { reviews: review } },
       // If the value already exists in the array, $push will still append the value (resulting in duplicate values). 
      // However, $addToSet only appends the value if it doesn't already exist in the array. 
      // Therefore, if the value already exists, $addToSet won't append it (it will do nothing).
      { upsert: true, returnDocument: "after" }
      // upsert: true indicates to insert the new review if the filter doesn't get the match (the listing does not exist).
      // returnDocument: "after" indicates to return the document after the update, replacement, or insert occurred.
    );
    return review;
  },
 
  updateListingAndReviews: async (id: string, listingAndReviews: ListingAndReviews) => {
    await listingAndReviewsContext.updateOne(
      { _id: id },
      {
        $set: {         
          listing_url: listingAndReviews.listing_url,
          description: listingAndReviews.description,
          address: {
            street: listingAndReviews.address.street,
            market: listingAndReviews.address.market,
            country: listingAndReviews.address.country
          },
          bedrooms: listingAndReviews.bedrooms,
          beds: listingAndReviews.beds,
          bathrooms: listingAndReviews.bathrooms,
          reviews: listingAndReviews.reviews
        },
      },
      { upsert: false }
    ).lean();
    return listingAndReviews;
    },
  insertListingAndReviews: async (listingAndReviews: ListingAndReviews) => {
    await listingAndReviewsContext.create(      
      {
        _id: listingAndReviews._id,
        listing_url: listingAndReviews.listing_url,
        description: listingAndReviews.description,
        address: {
          street: listingAndReviews.address.street,
          market: listingAndReviews.address.market,
          country: listingAndReviews.address.country
        },
        bedrooms: listingAndReviews.bedrooms,
        beds: listingAndReviews.beds,
        bathrooms: listingAndReviews.bathrooms,
        reviews: listingAndReviews.reviews
      },
    );
    return listingAndReviews;
  },
}