import DashboardIcon from '../assets/icons/dashboard.svg';

import AddFlight from '../assets/images/AddFlights.jpeg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';


const sidebar_menu = [
    
    {
        id: 1,
        icon: UserIcon,
        path: '/dashboard/profile',
        title: 'My account',
    },
    {
        id: 2,
        icon: DashboardIcon,
        path: '/dashboard',
        title: 'Dashboard',
    },
    {
        id: 3,
        icon: AddFlight,
        path: '/dashboard/AddFlight',
        title: 'Add Flights',
    },
    {
        id: 4,
        icon: DashboardIcon,
        path: '/dashboard/EnableGate',
        title: 'Enable Gate',
    }
    ,
    {
        id: 5,
        icon: ProductIcon,
        path: '/dashboard/DisableGate',
        title: 'Disable Gate',
    }
]

export default sidebar_menu;