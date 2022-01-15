# eberts-api

A promise based node library for getting Roger Ebert review data.

## Usage

```javascript
import { fetchReview, fetchGreatMovie } from 'eberts-api';
await fetchReview('Blue Velvet', 1986);
await fetchGreatMovie('Paths of Glory', '1957');
```

**Example output**

```
{
  title: 'Blue Velvet',
  releaseYear: '1986',
  starRating: 1,
  cast: [
    'Kyle MacLachlan',
    'Isabella Rossellini',
    'Dennis Hopper',
    'Laura Dern',
    'Hope Lange',
    'Dean Stockwell',
    'George Dickerson',
    'Richard Roth'
  ],
  crew: [
    'David Lynch',
    'Richard Roth',
    'Frderick Elmes',
    'Duwayne Dunham',
    'Angelo Badalamenti'
  ],
  runtime: '120 minutes',
  rating: 'Rated R',
  reviewWriter: 'Roger Ebert',
  datePublished: 'September 19, 1986',
  url: 'https://www.rogerebert.com/reviews/blue-velvet-1986'
}
```

`fetchGreatMovie` returns all of the same information as `fetchReview` with the exception of `reviewWriter` and `starRating`

`fetchGreatMovie` retrieves data from Ebert's Great Movies reviews

`fetchReview` retrieves data from Ebert's standard reviews

Both functions will return an error if the provided information is incorrect or not found.

## license

MIT
