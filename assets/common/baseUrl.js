import { Platform } from 'react-native';

let baseURL = '';
let imageURL = '';
console.log(process.env);
if (process.env.NODE_ENV === 'development') {
  {
    Platform.OS === 'android'
      ? [
          (baseURL = 'http://192.168.1.107:3000/api/v1/'),
          (imageURL = 'http://192.168.1.107:3000/public/uploads'),
        ]
      : [
          (baseURL = 'http://localhost:3000/api/v1/'),
          (imageURL = 'http://localhost:3000/public/uploads'),
        ];
  }
}

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://rn--server.herokuapp.com/api/v1/';
}

export default { baseURL, imageURL };
