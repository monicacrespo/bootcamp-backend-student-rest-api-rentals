import { model, Schema } from 'mongoose';
import { ListingAndReviews, Review } from './listingAndReviews.model';

const reviewSchema = new Schema<Review>({
    date: { type: Schema.Types.Date, required: true },
    reviewer_name: { type: Schema.Types.String, required: true },
    comments: { type: Schema.Types.String, required: true },
    listing_id: { type: Schema.Types.String, required: true }
})

const listingAndReviewsSchema = new Schema<ListingAndReviews>({
    // Note that the _id is here because is string. Otherwise Mongoose will generate it automatically if it was ObjectId.
    _id: { type: Schema.Types.String, required: true },
    listing_url: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    bedrooms: { type: Schema.Types.Number, required: true },
    beds: { type: Schema.Types.Number, required: true },
    bathrooms: { type: Schema.Types.Number, required: true },
    address: {
        street: { type: Schema.Types.String, required: true },
        market: { type: Schema.Types.String, required: true },
        country: { type: Schema.Types.String, required: true },
    },
    // reviews: [ reviewSchema ]
    reviews: { type: Schema.Types.Mixed, required: true }
})

export const listingAndReviewsContext = model<ListingAndReviews>('listingsAndReviews', listingAndReviewsSchema);