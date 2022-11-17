import DashboardIcon from '../assets/icons/dashboard.svg';
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
        icon: DashboardIcon,
        path: '/EnableGate',
        title: 'Enable Gate',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/DisableGate',
        title: 'Disable Gate',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/AssignGate',
        title: 'Assign Gate',
    },
    {
        id: 4,
        icon: UserIcon,
        path: '/assignBaggageCarousel',
        title: 'Assign Baggage Carousel number',
    }
]

export default sidebar_menu;