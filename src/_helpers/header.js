

const token = window.localStorage.getItem('token');
export const headers = {
    Authorization: token ? `${token}` : '',
    'Content-Type': 'application/json',
};