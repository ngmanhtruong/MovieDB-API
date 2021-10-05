import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
  UPCOMING_BASE_URL
} from './config';

const defaultConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const apiSettings = {
  // FETCH MOVIES
  fetchMovies: async (searchTerm, page) => {
    const endpoint = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
      : `${POPULAR_BASE_URL}&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchUpcoming: async (searchTerm, page) => {
    const endpoint = searchTerm
      ? `${SEARCH_BASE_URL}${searchTerm}&page=${page}`
      : `${UPCOMING_BASE_URL}&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchMovie: async movieId => {
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,external_ids,images,reviews,similar`;
    return await (await fetch(endpoint)).json();
  },
  fetchMoviesWithGenres: async (page, genreforURL) =>{
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreforURL}`;
    return await (await fetch(endpoint)).json();
  },
  fetchMovieRecommendations : async (movieId, page) => {
    const endpoint = `${API_URL}movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchNowPlaying: async (page) => {
    const endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchTopRated: async (type, page) => {
    const endpoint = `${API_URL}${type}/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchTrending: async (time, type) => {
    const endpoint = `${API_URL}trending/${type}/${time}?api_key=${API_KEY}&language=en-US`;
    return await (await fetch(endpoint)).json();
  },
  fetchLatest: async () => {
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc&include_video=true&page=1`;
    return await (await fetch(endpoint)).json();
  },

  //FETCH TV
  fetchPopularTV: async (page) => {
    const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchTVAiring: async (page) => {
    const endpoint = `${API_URL}tv/airing_today?api_key=${API_KEY}&language=en-US&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchGenres: async (type) => {
    const endpoint = `${API_URL}genre/${type}/list?api_key=${API_KEY}&language=en-US`;
    return await (await fetch(endpoint)).json();
  },
  fetchTV: async (id) => {
    const endpoint = `${API_URL}tv/${id}?api_key=${API_KEY}&append_to_response=videos&language=en-US`;
    return await (await fetch(endpoint)).json();
  },  
  fetchTopRatedTV: async (page) => {
    const endpoint = `${API_URL}tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchLatestTV: async () => {
    const endpoint = `${API_URL}discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_video=true&page=1`;
    return await (await fetch(endpoint)).json();
  },

  //FETCH TRENDING
  fetchTrendingSearch : async () => {
    const endpoint = `${API_URL}trending/all/week?api_key=${API_KEY}`;
    return await (await fetch(endpoint)).json();
  },

  //MULTI SEARCH
  fetchMultiSearch : async (searchTerm) => {
    const endpoint = `${API_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    return await (await fetch(endpoint)).json();
  },

  //FETCH PEOPLE
  fetchPeople : async (searchTerm, page) => {
    const endpoint = searchTerm 
    ? `${API_URL}search/person?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}`
    : `${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchPerson : async (personId) => {
    const endpoint = `${API_URL}person/${personId}?api_key=${API_KEY}&language=en-US&append_to_response=movie_credits,tv_credits,translations,external_ids`;
    return await (await fetch(endpoint)).json();
  },
  fetchIMDB : async (id) => {
    const endpoint = `${API_URL}find/${id}?api_key=${API_KEY}&language=en-US&external_source=imdb_id`;
    return await (await fetch(endpoint)).json();
  },

  //FETCH CREDITS
  fetchCredits: async movieId => {
    const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    return await (await fetch(creditsEndpoint)).json();
  },
  fetchTVCredits: async movieId => {
    const creditsEndpoint = `${API_URL}tv/${movieId}/credits?api_key=${API_KEY}`;
    return await (await fetch(creditsEndpoint)).json();
  },

  // Bonus material below for login
  getRequestToken: async () => {
    const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
    return reqToken.request_token;
  },
  authenticate: async (requestToken, username, password) => {
    const bodyData = {
      username,
      password,
      request_token: requestToken
    };
    // First authenticate the requestToken
    const data = await (
      await fetch(LOGIN_URL, {
        ...defaultConfig,
        body: JSON.stringify(bodyData)
      })
    ).json();
    // Then get the sessionId with the requestToken
    if (data.success) {
      const sessionId = await (
        await fetch(SESSION_ID_URL, {
          ...defaultConfig,
          body: JSON.stringify({ request_token: requestToken })
        })
      ).json();
      return sessionId;
    }
  },
  rateMovie: async (sessionId, movieId, value) => {
    const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

    const rating = await (
      await fetch(endpoint, {
        ...defaultConfig,
        body: JSON.stringify({ value })
      })
    ).json();

    return rating;
  }
};

export default apiSettings;
