/* eslint-disable prettier/prettier */
import axios from 'axios';

const baseUrl =
  'http://cvchecker.eba-7yjf2tfh.ap-southeast-3.elasticbeanstalk.com/api/';

export const post = async (path, data) => {
  return await axios({
    url: baseUrl + path,
    method: 'POST',
    data: data,
    headers: {'Content-Type': 'multipart/form-data'},
  });
};

export const get = async (path, data) => {
  return await axios.get(baseUrl + path, data);
};
