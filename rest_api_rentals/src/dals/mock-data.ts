import { ObjectId } from 'mongodb';
import { ListingAndReviews } from './listingAndReviews';
import { User } from './user';

export interface DB {
  listingsAndReviews: ListingAndReviews[];
  users: User[];
}

export const db: DB = {
  users: [
    {
      _id: new ObjectId(),
      email: 'admin@email.com',
      password: 'test',
      salt: '',
      role: 'admin'
    },
    {
      _id: new ObjectId(),
      email: 'user@email.com',
      password: 'test',
      salt: '',
      role: 'standard-user'
    },
  ],
  listingsAndReviews: [
    {
      _id: '01',
      listing_url: '/01-listado-casas.png',
      description: 'description',
      bedrooms: 2,
      beds: 3,
      bathrooms: 2,
      address: {
        street: 'Calle Camino Cupiana',
        market: 'Málaga',
        country: 'Spain',
      },
      reviews: [
        {
          date: new Date('2022-10-06'),
          reviewer_name: 'Monica',
          comments: 'Extremely Nice',
          listing_id: '01',
        }
      ]
    },
    {
      _id: '02',
      listing_url: '/02-detalle-casa.png',
      description: 'description',
      bedrooms: 2,
      beds: 3,
      bathrooms: 2,
      address: {
        street: 'Av. Duque de Nájera, 9',
        market: 'Cadiz',
        country: 'Spain',
      },
      reviews: [
        {
          date: new Date('2022-10-07'),
          reviewer_name: 'Monica',
          comments: 'Nice',
          listing_id: '02',
       }
      ]
    },
    {
      _id: '10082422',
      listing_url: '',
      description: 'description',
      bedrooms: 2,
      beds: 3,
      bathrooms: 2,
      address: {
        street: 'C. Colegios, 8',
        market: 'Alcalá de Henares',
        country: 'Spain',
      },
      reviews: [
        {
          date: new Date('2022-10-08'),
          reviewer_name: 'Monica',
          comments: 'Very Nice',
          listing_id: '10082422',
        },
        {
          date: new Date('2022-10-10'),
          reviewer_name: 'Maria',
          comments: 'Very cosy',
          listing_id: '10082422',
        },
        {
          date: new Date('2022-10-11'),
          reviewer_name: 'Miriam',
          comments: 'Very cosy',
          listing_id: '10082422',
        },
        {
          date: new Date('2022-10-12'),
          reviewer_name: 'Aroa',
          comments: 'Very cosy',
          listing_id: '10082422',
        },
        {
          date: new Date('2022-10-13'),
          reviewer_name: 'Mari Cruz',
          comments: 'Very cosy',
          listing_id: '10082422',
        },
        {
          date: new Date('2022-10-14'),
          reviewer_name: 'Ana',
          comments: 'Very cosy',
          listing_id: '10082422',
        },
      ]
    },
    {
      _id: '10545725',
      listing_url: '',
      description: 'description 4',
      bedrooms: 2,
      beds: 3,
      bathrooms: 2,
      address: {
        street: 'street',
        market: 'Oporto',
        country: 'Portugal',
      },
      reviews: [
        {
          date: new Date('2022-10-09'),
          reviewer_name: 'Marta',
          comments: 'Very Nice flat',
          listing_id: '10545725',
        }
      ]
    },
  ],
};