import DashboardIcon from '../assets/icons/dashboard.svg';
import AddFlight from '../assets/images/AddFlights.jpeg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/dashboard',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: AddFlight,
        path: '/dashboard/AddFlight',
        title: 'Add Flights',
    },
    {
        id: 3,
        icon: UserIcon,
        path: '/dashboard/profile',
        title: 'My account',
    }
]

export default sidebar_menu;