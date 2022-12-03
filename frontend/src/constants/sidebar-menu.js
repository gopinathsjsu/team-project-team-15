import DashboardIcon from '../assets/icons/dashboard.svg';

import AddFlight from '../assets/images/AddFlights.jpeg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';
import EnableGate from '../pages/EnableGate';
import DisableGate from '../pages/DisableGate';
import AssignGate from '../pages/AssignGate';
import assignBaggageCarousel from '../pages/AssignBaggageCarousel';


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
    },
    {
        id: 6,
        icon: ShippingIcon,
        path: '/dashboard/AssignGate',
        title: 'Assign Gate',
    },
    {
        id: 7,
        icon: UserIcon,
        path: '/dashboard/assignBaggageCarousel',
        title: 'Assign Baggage Carousel number'
    }
]

export default sidebar_menu;