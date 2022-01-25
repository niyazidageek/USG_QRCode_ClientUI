// assets
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import { IconHome, IconSettings,IconWindmill } from '@tabler/icons';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';

// constant
const icons = {
    HomeOutlinedIcon,
    SettingsOutlinedIcon,
    HomeRepairServiceOutlinedIcon,
    LibraryBooksOutlinedIcon,
    NewspaperOutlinedIcon
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const navigation = {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'home-page',
            title: 'Home',
            type: 'item',
            url: '/',
            icon: icons.HomeOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'settings-page',
            title: 'Settings',
            type: 'item',
            url: '/settings',
            icon: icons.SettingsOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'services-page',
            title: 'Services',
            type: 'item',
            url: '/services',
            icon: icons.HomeRepairServiceOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'books-page',
            title: 'Books',
            type: 'item',
            url: '/books',
            icon: icons.LibraryBooksOutlinedIcon,
            breadcrumbs: false
        },
        {
            id: 'issues-page',
            title: 'Issues',
            type: 'item',
            url: '/issues',
            icon: icons.NewspaperOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default navigation;
