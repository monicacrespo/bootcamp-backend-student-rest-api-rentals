import { Router } from 'express';
import { listingAndReviewsRepository, Review } from 'dals';
import {
  mapListingAndReviewsListFromModelToApi,
  mapListingAndReviewsFromModelToApi,
  mapReviewFromApiToModel,
  mapReviewFromModelToApi,
} from './listingAndReviews.mappers';

export const listingsAndReviewsApi = Router();

listingsAndReviewsApi
  // Display all listings and its reviews. If country is given, returns the listings that matches that criteria. Sames happens with page & pageSize
  .get('/', async (req, res, next) => {
    try {
      const country = String(req.query.country);
      const pageSize = Number(req.query.pageSize);
      const page = Number(req.query.page);
      const listingList = await listingAndReviewsRepository.getListingAndReviewsList(country, page, pageSize);
      listingList.length >= 1
        ? res.send(mapListingAndReviewsListFromModelToApi(listingList))
        : res.send('We could not find what you are looking for right now')
    } catch (error) {
      next(error);
    }
  })
   // Display all details of a listing
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const listing = await listingAndReviewsRepository.getListingAndReviews(id);
      listing
        ? res.send(mapListingAndReviewsFromModelToApi(listing))
        : res.send('The property requested is not found');
    } catch (error) {
      next(error);
    }
  }) 
  // Add a new review
  .post('/', async (req, res, next) => {
    try {
      const review = mapReviewFromApiToModel(req.body);
      let newReview = await listingAndReviewsRepository.insertReview(review);
      res.send(mapReviewFromModelToApi(newReview));
    } catch (error) {
      next(error);
    }
  });