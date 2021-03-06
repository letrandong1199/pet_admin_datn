import axiosClient from "../axiosSetup";
class UserService {
  async getInfo() {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log("Got a token in the localStorage");
      axiosClient.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axiosClient.get("users/me");
      return user;
    }
  }
  getSummary() {
    return axiosClient.get("/users/summary").then((response) => {
      return response.data;
    });
  }
  getAll() {
    return axiosClient
      .get("/users")
      .then((response) => {
        return response?.data || [];
      })
      .catch((e) => {
        console.log(e);
        return [];
      });
  }
}
export default new UserService();
