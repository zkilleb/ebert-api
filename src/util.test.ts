import { fetchGreatMovie, fetchReview } from './util';

describe('Test fetchGreatMovie', () => {
  const SUCCESS_TEST_OBJ = {
    cast: [],
    crew: [],
    datePublished: 'February 25, 2005',
    rating: 'Rated NR',
    releaseYear: '1957',
    runtime: '88 minutes',
    title: 'Paths of Glory',
    url: 'https://www.rogerebert.com/reviews/great-movie-paths-of-glory-1957',
  };

  test('fetchGreatMovie returns error if not found with year type string', async () => {
    const data = await fetchGreatMovie('this is not a real movie', '0000');
    expect(data).toEqual({ error: 'Review not found' });
  });

  test('fetchGreatMovie returns error if not found with year type number', async () => {
    const data = await fetchGreatMovie('this is not a real movie', 3333);
    expect(data).toEqual({ error: 'Review not found' });
  });

  test('fetchReview returns valid data if review is found with year type number', async () => {
    const data = await fetchGreatMovie('Paths of Glory', '1957');
    expect(data).toEqual(SUCCESS_TEST_OBJ);
  });

  test('fetchReview returns valid data if review is found with year type string', async () => {
    const data = await fetchGreatMovie('Paths of Glory', '1957');
    expect(data).toEqual(SUCCESS_TEST_OBJ);
  });
});

describe('Test fetchReview', () => {
  const SUCCESS_TEST_OBJ = {
    cast: [
      'Kyle MacLachlan',
      'Isabella Rossellini',
      'Dennis Hopper',
      'Laura Dern',
      'Hope Lange',
      'Dean Stockwell',
      'George Dickerson',
      'Richard Roth',
    ],
    crew: [
      'David Lynch',
      'Richard Roth',
      'Frderick Elmes',
      'Duwayne Dunham',
      'Angelo Badalamenti',
    ],
    datePublished: 'September 19, 1986',
    rating: 'Rated R',
    releaseYear: '1986',
    reviewWriter: 'Roger Ebert',
    runtime: '120 minutes',
    starRating: 1,
    title: 'Blue Velvet',
    url: 'https://www.rogerebert.com/reviews/blue-velvet-1986',
  };

  test('fetchReview returns error if not found with year type string', async () => {
    const data = await fetchReview('this is not a real movie', '0000');
    expect(data).toEqual({ error: 'Review not found' });
  });

  test('fetchReview returns error if not found with year type number', async () => {
    const data = await fetchReview('this is not a real movie', 3333);
    expect(data).toEqual({ error: 'Review not found' });
  });

  test('fetchReview returns valid data if review is found with year type number', async () => {
    const data = await fetchReview('Blue Velvet', 1986);
    expect(data).toEqual(SUCCESS_TEST_OBJ);
  });

  test('fetchReview returns valid data if review is found with year type string', async () => {
    const data = await fetchReview('Blue Velvet', '1986');
    expect(data).toEqual(SUCCESS_TEST_OBJ);
  });
});
