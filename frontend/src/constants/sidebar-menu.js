import DashboardIcon from '../assets/icons/dashboard.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/AddFlight',
        title: 'Add Flights',
    },
    {
        id: 3,
        icon: UserIcon,
        path: '/profile',
        title: 'My account',
    }
]

export default sidebar_menu;