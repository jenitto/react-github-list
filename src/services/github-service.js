import axios from 'axios';
import { GITHUB_BASE_URL, GITHUB_ENDPOINTS } from '../config/github-config';

export const getRepositories = async (params) => {
  const search = params.q ? params.q + '+language:javascript' : 'language:javascript';
  return axios(GITHUB_BASE_URL + GITHUB_ENDPOINTS.SEARCH + GITHUB_ENDPOINTS.REPOSITORIES, {
    method: 'GET',
    params: { ...params, q: search },
  });
};
