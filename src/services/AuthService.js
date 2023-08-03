import $api from "../http";

export default class AuthService {
    static async comePeople(data) {
        return $api.post('/wedding/post', {...data})
    }
}