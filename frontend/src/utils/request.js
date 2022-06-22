const request = (url, opt) =>new Promise((resolve, reject)=> {
  if (!url) {
    throw 'Invalid request url';
  }
  const defaultOpt = {
    method: 'GET',
    headers: {
      'content-type':'application/json'
    }
  }
  const option = Object.assign({}, defaultOpt, opt);
  return fetch(url, option)
    .then(x => {
      if (x.status === 204) {
        resolve();
      }
      return x.json();
    })
    .then(x => resolve(x))
    .catch(err => reject(err));
})

export default request;
