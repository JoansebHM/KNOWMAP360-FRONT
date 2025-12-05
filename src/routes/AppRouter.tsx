import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map(({ path, element, subRoutes }) => (
                    <Route key={path} path={path} element={element}>
                        {subRoutes?.map((child) => (
                            <Route key={child.path} path={child.path} element={child.element} />
                        ))}
                    </Route>
                ))}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
