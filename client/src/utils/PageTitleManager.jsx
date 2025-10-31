import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const defaultTitle = '| SMCC';

//Title name of the page based on route name
const routeTitles = {
    '/': `Dashboard ${defaultTitle}`,
    '/dashboard': `Dashboard ${defaultTitle}`,
    '/purchase': `Purchase ${defaultTitle}`,
    '/project': `Project ${defaultTitle}`,
    '/master': `Master ${defaultTitle}`,
    '/petty-cash': `Petty Cash ${defaultTitle}`,
    '/labour': `Labour ${defaultTitle}`,
    '/inventory': `Inventory ${defaultTitle}`,
    '/admin': `Admin ${defaultTitle}`,
    '/settings': `Settings ${defaultTitle}`,
    '/profile': `Profile ${defaultTitle}`,
};

const PageTitleManager = () => {
    const location = useLocation();

    useEffect(() => {
        const title = routeTitles[location.pathname] || 'SMCC';
        document.title = title;
    }, [location.pathname]);

    return null;
};

export default PageTitleManager;