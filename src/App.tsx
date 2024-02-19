import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { MenuLateral } from './shared/components';
import { AuthProvider, DrawerProvider } from './shared/contexts';

import './shared/forms/TranducoesYup';

const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>
            <MenuLateral>
              <AppRoutes />
            </MenuLateral>
          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>
    </AuthProvider>
  );
};

export default App;
