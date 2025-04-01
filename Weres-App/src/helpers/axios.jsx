import axios from 'axios';
import { urlAPI, configTokenAXI, configTokenAXIFormData } from './utils';

const instance = axios.create({
  baseURL: urlAPI,
  headers: {
    'content-type': 'application/json',
  },
});

const showSpinner = () => {
  const spinnerContainer = document.getElementById('spinner-container');
  if (spinnerContainer) spinnerContainer.style.display = 'block';
};

const hideSpinner = () => {
  const spinnerContainer = document.getElementById('spinner-container');
  if (spinnerContainer) spinnerContainer.style.display = 'none';
};

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    hideSpinner();
    return Promise.reject(error);
  }
);

export default {
  get: (url) =>
    instance({
      method: 'GET',
      url,
      headers: configTokenAXI,
    }),

  silentGet: (url, params = {}) =>
    instance({
      method: 'GET',
      url,
      params,
      headers: {
        ...configTokenAXI,
        'X-Silent-Request': 'true',
      },
    }),

  silenceGet: (url, silent = false) =>
    instance({
      method: 'GET',
      url,
      headers: configTokenAXI,
      data: { silent },
    }),

  post: (url, params = {}) =>
    instance({
      method: 'POST',
      url,
      data: params,
      headers: configTokenAXI,
    }),

  postFormData: (url, params = {}) =>
    instance({
      method: 'POST',
      url,
      data: params,
      headers: configTokenAXIFormData,
    }),

  patch: (url, params = {}) =>
    instance({
      method: 'PATCH',
      url,
      data: params,
      headers: configTokenAXI,
    }),

  post_public: (url, params = {}) =>
    instance({
      method: 'POST',
      url,
      data: params,
    }),

  delete: (url) =>
    instance({
      method: 'DELETE',
      url,
      headers: configTokenAXI,
    }),
};