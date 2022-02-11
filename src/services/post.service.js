//api here is an axios instance which has the baseURL set according to the env.
import axiosClient from '../axiosSetup';
class PostService {
    getAll(page, search) {
        return axiosClient.get('/posts/explore' + `?page=${page}` + `&search=${search}` + '&limit=3').then(response => {
            return response.data;
        })
    }
    getCount() {
        return axiosClient.get('/posts/explore').then(response => {
            return response.data;
        })
    }
}
export default new PostService();