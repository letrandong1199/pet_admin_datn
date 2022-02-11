import axiosClient from '../axiosSetup';
class UserService {
    async getInfo() {
        const token = localStorage.getItem('access_token');
        if (token) {
            console.log('Got a token in the localStorage');
            axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
            const { data: user } = await axiosClient.get('users/me');
            console.log(user)
            return user;
        }
    }
}
export default new UserService();