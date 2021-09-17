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
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
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
    const endpoint = `${API_URL}movie/latest?api_key=${API_KEY}&language=en-US`;
    return await (await fetch(endpoint)).json();
  },
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
  fetchMoviesWithGenres: async (page, genreforURL) =>{
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreforURL}`;
    return await (await fetch(endpoint)).json();
  },
  fetchMovieRecommendations : async (movieId, page) => {
    const endpoint = `${API_URL}movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchPeople : async (searchTerm, page) => {
    const endpoint = searchTerm 
    ? `${API_URL}search/person?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}`
    : `${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    return await (await fetch(endpoint)).json();
  },
  fetchPerson : async (personId) => {
    const endpoint = `${API_URL}person/${personId}?api_key=${API_URL}&language=en-US`;
    return await (await fetch(endpoint)).json();
  },
  fetchCredits: async movieId => {
    const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
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
