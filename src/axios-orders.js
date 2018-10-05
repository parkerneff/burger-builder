import axios from 'axios';

const axiosOrders = axios.create({
    baseURL: "https://react-my-burger-pneff.firebaseio.com/"
});

export default axiosOrders;