import $api from "../http";

export default class AuthService {
  static async comePeople(data) {
    return $api.post("wedding/post/?slug=sm", { ...data });
  }

  static async getDetail() {
    return $api.get("page/wedding_detail/?slug=sm");
  }
}
