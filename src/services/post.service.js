//api here is an axios instance which has the baseURL set according to the env.
import axiosClient from "../axiosSetup";
class PostService {
  getAll(page, search) {
    return axiosClient
      .get("/posts" + `?page=${page}` + `&search=${search}` + "&limit=3")
      .then((response) => {
        return response.data;
      });
  }
  getWarning(page, search) {
    return axiosClient
      .get("/posts" + `?page=${page}` + `&search=${search}` + "&limit=3" + "&warning=true")
      .then((response) => {
        return response.data;
      });
  }

  getSummary() {
    return axiosClient.get("/posts/summary").then((response) => {
      return response.data;
    });
  }
  updateStatus(id, data) {
    return axiosClient.put(`/posts/${id}/update_status`, data).then((response) => {
      return response;
    });
  }
}
export default new PostService();
