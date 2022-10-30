import { MAIN_URL } from './constants/constants';

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export function register(regData) {
  return fetch(`${MAIN_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(regData)
    })
    .then(res => handleResponse(res))
}

export function authorize(loginData) {
  return fetch(`${MAIN_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  .then(res => handleResponse(res))
  .then(data => {
    if (data){
      localStorage.setItem('token', data.token);
      return data;
    }
  })
}

export function getUserData() {
  const token = localStorage.getItem('token');
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => handleResponse(res))
}

export function editUserData(userData) {
  const token = localStorage.getItem('token');
  return fetch(`${MAIN_URL}/users/me`, {
    method: 'PATCH',
    headers: {'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
    body: JSON.stringify(userData)
  })
  .then(res => handleResponse(res))
}