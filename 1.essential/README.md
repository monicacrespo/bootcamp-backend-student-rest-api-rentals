## Requirements
1. Install and configure the proper libraries that will be used in the project: Express, TypeScript, Babel, etc.

2. Structure your backend project using pods. Pods (Product Oriented Delivery) are a way of structuring your project by feature, instead of type. Instead of having a directory structure with several types (controllers, models, templates...), everything is grouped around a feature (comments, posts...).

3. Expose three endpoints:

   * Get a list of houses with the country as an optional filter
   * Get the details of a house
   * Add a review: Name and review. Each time you add a new review, the date is generated automatically.

For each endpoint, return only the relevant fields that will be used by the front application (clue: Api Model <-> mapper <-> Model)

Implement the endpoints in mock mode.
Implement the endpoints with MongoDB (using the mongo driver).

Add unit tests of the mappers and helpers files.

Add pagination to the enpdoint that gets list of houses.
