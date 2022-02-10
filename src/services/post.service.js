//api here is an axios instance which has the baseURL set according to the env.
import axiosClient from '../axiosSetup';
class PostService {
    getAll(page) {
        return axiosClient.get('/posts/explore' + `?page=${page}`).then(response => {
            console.log(response.data);
            return response.data;
        })
    }
}
export default new PostService();