/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */

import config from '../_config/config';
import { authHeader } from '../_helpers/auth-header';


const http = require('http');

const https = require('https');

const httpAgent = new http.Agent({
  keepAlive: true,
});
const httpsAgent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: false,
});

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}


const options = {
  agent(_parsedURL) {
    if (_parsedURL.protocol === 'http:') {
      return httpAgent;
    }
    return httpsAgent;
  },
};


function getUniqueApplications() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    agent: httpsAgent,

  };
  return fetch(`${config.apiUrl}/data/uniqueApps`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function getDevicesByApp(appName) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    agent: httpsAgent,

  };
  return fetch(`${config.apiUrl}/data/deviceByApp/${appName}`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}

function getDeviceDataByTimeRange(device, startDate, endDate) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    agent: httpsAgent,

  };
  return fetch(`${config.apiUrl}/data/device/${device}/data/${startDate}/${endDate}`, requestOptions)
    .then(handleResponse)
    .then((data) => data);
}


export const deviceService = {
  getUniqueApplications,
  getDevicesByApp,
  getDeviceDataByTimeRange,

};
