const axios = require('axios')

const fetch = function(options) {
  return axios(options)
    .then(function(res) {
      return res.data;
    })
    .catch(function(error) {
      // TO DO business might need handle errors in some way in which case use Promise.reject(error) instead
      console.error(error);
    });
};

const get = function(url) {
  return fetch({ url });
};

const post = function(url, data, options) {
  return fetch(Object.assign(options, {
    url,
    method: 'POST',
    data,
  }));
};

const put = function(url, data) {
  return fetch({
    url,
    method: 'PUT',
    data,
  });
};

const del = function(url) {
  return fetch({
    url,
    method: 'DELETE',
  });
};

module.exports = {
  get: get,
  post: post,
  put: put,
  del: del
}

// window.__fetch = {
//   get,
//   put,
//   post,
//   del
// }
