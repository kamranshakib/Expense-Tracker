import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosinstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/apiPaths";

export const useUserAuth = () => {
    const { user, updateUser, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. اول چک کن آیا token وجود دارد
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        // 2. اگر user data داریم، نیاز به fetch نیست
        if (user) return;

        let isMounted = true;

        const fetchUserInfo = async () => {
            try {
                const response = await axiosinstance.get(API_PATHS.AUTH.GET_USER_INFO);

                if (isMounted && response.data) {
                    updateUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
                
                if (isMounted) {
                    // فقط در صورت خطای 401 (Unauthorized) به login برو
                    if (error.response?.status === 401) {
                        clearUser();
                        localStorage.removeItem("token");
                        navigate("/login");
                    }
                    // برای خطاهای دیگر (مثل 404) فقط log کن ولی redirect نکن
                    // این اجازه می‌دهد صفحه با داده‌های خالی نمایش داده شود
                }
            }
        };

        fetchUserInfo();
        return () => {
            isMounted = false;
        };
    }, [user, updateUser, clearUser, navigate]);

    return { user, updateUser, clearUser };
};