import cheerio from 'cheerio';
import axios from 'axios';

const INPUT_ERRROR_MESSAGE =
  'Invalid input. Name is required with type string and year formatted with 4 characters';
const NOT_FOUND_ERROR_MESSAGE = 'Review not found';
const FORMATTING_REGEX = /[^-a-z0-9]/g;

const api = axios.create({
  baseURL: 'https://www.rogerebert.com',
});

function stripReviewInformation(response: any, config: any): IReview {
  let starRating = 0;
  const cast: string[] = [];
  const crew: string[] = [];
  const $ = cheerio.load(response);
  $('.page-content--star-rating i').each((i: number, el: any) => {
    if ($(el).attr('class') === 'icon-star-full') starRating += 1;
    if ($(el).attr('class') === 'icon-star-half') starRating += 0.5;
  });
  $('.cast-and-crew--detail span').each((i: number, el: any) => {
    cast.push($(el).text().replace(/\n/g, ''));
  });
  $('.cast-and-crew--detail li a').each((i: number, el: any) => {
    crew.push($(el).text().replace(/\n/g, ''));
  });
  const titleYear = $('.cast-and-crew--movie-title').text();
  return {
    title: titleYear
      .substring(0, titleYear.lastIndexOf('(') - 1)
      .replace(/\n/g, ''),
    releaseYear: titleYear.substring(
      titleYear.lastIndexOf('(') + 1,
      titleYear.lastIndexOf(')'),
    ),
    starRating,
    cast,
    crew,
    runtime: $('.cast-and-crew--running-time').text().replace(/\n/g, ''),
    rating: $('.cast-and-crew--mpaa-rating').text().replace(/\n/g, ' ').trim(),
    reviewWriter: $('.byline').find('a').text(),
    datePublished: $('.time').text(),
    url: config.baseURL + config.url,
  };
}

function stripGreatMovieInformation(
  response: any,
  config: any,
): IGreatMovie {
  const cast: string[] = [];
  const crew: string[] = [];
  const $ = cheerio.load(response);
  $('.cast-and-crew--detail span').each((i: number, el: any) => {
    cast.push($(el).text().replace(/\n/g, ''));
  });
  $('.cast-and-crew--detail li a').each((i: number, el: any) => {
    crew.push($(el).text().replace(/\n/g, ''));
  });
  const titleYear = $('.cast-and-crew--movie-title').text();
  return {
    title: titleYear
      .substring(0, titleYear.lastIndexOf('(') - 1)
      .replace(/\n/g, ''),
    releaseYear: titleYear.substring(
      titleYear.lastIndexOf('(') + 1,
      titleYear.lastIndexOf(')'),
    ),
    cast,
    crew,
    runtime: $('.cast-and-crew--running-time').text().replace(/\n/g, ''),
    rating: $('.cast-and-crew--mpaa-rating').text().replace(/\n/g, ' ').trim(),
    datePublished: $('.time').text(),
    url: config.baseURL + config.url,
  };
}

export async function fetchGreatMovie(name: string, year: string | number) {
    try {
      if (
        year &&
        year.toString().length === 4 &&
        name &&
        typeof name === 'string'
      ) {
        const formattedUrl = `/reviews/great-movie-${name
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(FORMATTING_REGEX, '')}-${year.toString()}`;
        const response = await api.get(`${formattedUrl}`);
        if (response.status === 200)
          return stripGreatMovieInformation(response.data, response.config);
      } else return { error: INPUT_ERRROR_MESSAGE };
    } catch (e: any) {
      if (e.response && e.response.status === 404)
        return { error: NOT_FOUND_ERROR_MESSAGE };
      else return { error: e.message };
    }
  }
  
export async function fetchReview(name: string, year: string | number) {
    try {
      if (
        year &&
        year.toString().length === 4 &&
        name &&
        typeof name === 'string'
      ) {
        const formattedUrl = `/reviews/${name
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(FORMATTING_REGEX, '')}-${year.toString()}`;
        const response = await api.get(formattedUrl);
        if (response.status === 200) {
          return stripReviewInformation(response.data, response.config);
        } else return { error: INPUT_ERRROR_MESSAGE };
      }
    } catch (e: any) {
      if (e.response && e.response.status === 404) {
        try {
          const formattedUrl = `/reviews/${name
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(FORMATTING_REGEX, '')}-movie-review-${year.toString()}`;
          const response = await api.get(`${formattedUrl}`);
          if (response.status === 200)
            return stripReviewInformation(response.data, response.config);
        } catch (retryError: any) {
          if (retryError.response && retryError.response.status === 404)
            return { error: NOT_FOUND_ERROR_MESSAGE };
        }
      } else return { error: e.message };
    }
  }

interface IReview extends IGreatMovie {
  starRating: number;
  reviewWriter: string;
}

interface IGreatMovie {
  title: string;
  releaseYear: string;
  cast: string[];
  crew: string[];
  runtime: string;
  rating: string;
  datePublished: string;
  url: string;
}
