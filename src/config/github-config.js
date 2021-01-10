// https://docs.github.com/es/free-pro-team@latest/rest/guides/getting-started-with-the-rest-api
// https://api.github.com/search/repositories?q=framework%2Blanguage%3Ajavascript&page=1&per_page=100&sort=stars&order=desc

export const GITHUB_BASE_URL = 'https://api.github.com';
export const GITHUB_ENDPOINTS = {
  REPOSITORIES: '/repositories',
  SEARCH: '/search',
};
