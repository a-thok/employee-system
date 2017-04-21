export const ajax = {
  json(res: Response) {
    return res.json();
  },

  requestWithoutBody(method: string, url: string, credentials: boolean  = false) {
    return fetch(url, {
      method,
      credentials: credentials ? 'same-origin' : 'omit',
    })
      .then(this.json);
  },

  requestWithBody(method: string, url: string, body: any, credentials = false) {
    const isFormData = body instanceof FormData;

    return fetch(url, {
      method,
      headers: isFormData ? {} : {
        'Content-Type': 'application/json',
      },
      credentials: credentials ? 'same-origin' : 'omit',
      body: isFormData ? body : JSON.stringify(body),
    })
      .then(this.json);
  },

  get(url: string, credentials: boolean) {
    return this.requestWithoutBody('GET', url, credentials);
  },

  post(url: string, body: any, credentials: boolean) {
    return this.requestWithBody('POST', url, body, credentials);
  },

  patch(url: string, body: any, credentials: boolean) {
    return this.requestWithBody('PATCH', url, body, credentials);
  },

  delete(url: string, credentials: boolean) {
    return this.requestWithoutBody('DELETE', url, credentials);
  },
};
