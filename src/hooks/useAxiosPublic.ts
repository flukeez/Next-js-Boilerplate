import { axiosPublic } from '@/utils/axios';

const useAxiosUnAuth = () => {
  const axiosUnAuth = axiosPublic;
  return axiosUnAuth;
};

export default useAxiosUnAuth;
