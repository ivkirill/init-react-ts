
import { routes } from './routes';
import { ROUTES_MAIN_MENU } from 'consts';

export const navMain = ROUTES_MAIN_MENU.map(route => routes[route]);
