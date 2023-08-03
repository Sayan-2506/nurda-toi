import { makeAutoObservable } from "mobx";
import axios from "axios";
import AuthService from "../services/AuthService";
import { API_URL } from "../http";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    getUser() {
        return this.user
    }

    
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.post(`${API_URL}login/refresh/`, {withCredentials: true, refresh: localStorage.getItem('refreshToken')})
            localStorage.setItem('accessToken', response.data.access)
            this.setUser(JSON.parse(localStorage.getItem('user')))
            this.setAuth(true)
        } catch (e) {
            console.log(e.response)
        } finally {
            this.setLoading(false);
        }
    }

    async ComePeople(data) {
        this.setLoading(true);
        try {
            const response = await AuthService.comePeople(data)
            return {success: true}
        } catch (e) {
            return {error: e}
        }
    }
}