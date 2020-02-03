
const getHeaders = async () => {

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return headers;
};

class Api {
  config = { baseURL: process.env.ENDPOINT };

  dispatch = null;

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }

    throw new Error(response.statusText);
  }

  async get(uri) {
    const response = await fetch(`${this.config.baseURL}${uri}`, { headers: await getHeaders() });

    this.checkStatus(response);

    return response.json();
  }

  async post(uri, params = {}) {
    const response = await fetch(`${this.config.baseURL}${uri}`, {
      method: 'POST',
      headers: await getHeaders(),
      body: JSON.stringify(params),
    });

    this.checkStatus(response);

    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  async put(uri, params = {}) {
    const response = await fetch(`${this.config.baseURL}${uri}`, {
      method: 'PUT',
      headers: await getHeaders(),
      body: JSON.stringify(params),
    });

    this.checkStatus(response);

    return response.json();
  }
}

export default Api;
