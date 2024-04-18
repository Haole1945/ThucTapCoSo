import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductPage from "../pages/ProductsPage/ProductsPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import SigninPage from "../pages/SigninPage/SigninPage";
import TyproductPage from "../pages/TypeProductPage/TyproductPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true

    },
    {
        path: '/products',
        page: ProductPage,
        isShowHeader: true

    },
    {
        path: '/:type',
        page: TyproductPage,
        isShowHeader: true

    },
    {
        path: '/sign-in',
        page: SigninPage,
        isShowHeader: true

    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: true

    },
    {
        path: '/product-details',
        page: ProductDetailsPage,
        isShowHeader: true

    },
    {
        path: '*',
        page: NotFoundPage
    }
]