export const registerUserService = (request) => {
    const REGISTER_API_ENDPOINT = '/api/v1/register';
    
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.user)
    };
  
    return fetch(REGISTER_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  };
  
  export const loginUserService = (request) => {
    const LOGIN_API_ENDPOINT = '/api/v1/login';
    console.log("Service")
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(request.user)
    };
  
    return fetch(LOGIN_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  };

  export const logoutUserService = (request) => {
    const LOGIN_API_ENDPOINT = '/api/v1/logout';
    console.log("Service")
    const parameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
    };
  
    return fetch(LOGIN_API_ENDPOINT, parameters)
      .then(response => {
        return response.json();
      })
      .then(json => {
        return json;
      });
  };