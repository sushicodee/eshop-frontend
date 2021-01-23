import URLS from './../assets/common/baseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const http = axios.create({
  baseURL: URLS.baseURL,
  responseType: 'json',
});

const httpHeaders = (isSecure) =>
  new Promise(async (resolve, rejectj) => {
    let options = {
      'Content-Type': 'application/json',
    };
    if (isSecure) {
      try {
        const token = await AsyncStorage.getItem('x-access-token');
        options['Authorization'] = `Bearer ${token}`;
        resolve(options);
      } catch (err) {
        reject(err);
      }
    } else {
      resolve(options);
    }
  });

const get = (url, { params = {} } = {}, isSecure = false) => {
  return new Promise(async (resolve, reject) => {
    const headers = await httpHeaders(isSecure);
    http
      .get(url, {
        headers,
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const post = (url, data = {}, { params = {} } = {}, isSecure) => {
  return new Promise(async (resolve, reject) => {
    const headers = await httpHeaders(isSecure);
    http
      .post(url, data, { headers, params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

const postFile = (url, data = {}, { params = {} } = {}, isSecure) => {
  return new Promise(async (resolve, reject) => {
    try {
      const headers = await httpHeaders(isSecure);
      headers['Content-Type'] = 'multipart/form-data';
      http
        .post(url, data, { headers, params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    } catch (err) {
      reject(err);
    }
  });
};

const putFile = (url, data = {}, { params = {} } = {}, isSecure) => {
  return new Promise(async (resolve, reject) => {
    const headers = await httpHeaders(isSecure);
    try {
      const headers = await httpHeaders(isSecure);
      headers['Content-Type'] = 'multipart/form-data';
      http
        .put(url, data, { headers, params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    } catch (err) {
      reject(err);
    }
  });
};

const put = (url, data = {}, { params = {} } = {}, isSecure) => {
  return new Promise((resolve, reject) => {
    httpHeaders(isSecure)
      .then((headers) => {
        http
          .put(url, data, { headers, params })
          .then((res) => resolve(res.data))
          .catch((err) => {
            reject(err.response);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const patch = (url, data = {}, { params = {} } = {}, isSecure) => {
  return new Promise(async (resolve, reject) => {
    const headers = await httpHeaders(isSecure);
    http
      .patch(url, data, { headers, params })
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err.response);
      });
  });
};

const remove = (url, { params = {} } = {}, isSecure) => {
  return new Promise(async (resolve, reject) => {
    const headers = await httpHeaders(isSecure);
    http
      .delete(url, { headers, params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export default { get, post, patch, remove, put, postFile, putFile };
