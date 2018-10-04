import axios from 'axios';

const axiosBurger = axios.create({
    baseURL: "https://react-my-burger-pneff.firebaseio.com/"
});

export default axiosBurger;