import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PropsWithChildren } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { useDrawerContext } from '../../contexts';
import { useAppThemeContext } from '../../contexts/useAppThemeContext';
import { LightTheme } from '../../themes/Light';

interface IListItemLink {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink = ({ to, icon, label, onClick }: IListItemLink) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  const { themeName, toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height='100%' display='flex' flexDirection='column'>
          <Box width='100%' height={theme.spacing(20)} display={'flex'} alignItems='center' justifyContent='center'>
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              src='https://th.bing.com/th/id/R.e5460972a01fe10b6b513f47c9fabe2b?rik=f%2bjpB2eihDEitA&riu=http%3a%2f%2fwww.animaatjes.nl%2favatars%2fdisney%2fmickey-mouse%2fmickey-mouse-avatar-13.jpg&ehk=j3tSLdjecjdWwK%2btrm9sCEHv9mDu5CAr7vfz0lQAeF8%3d&risl=&pid=ImgRaw&r=0'
            />
          </Box>
          <Divider />

          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  key={drawerOption.path}
                  label={drawerOption.label}
                  icon={drawerOption.icon}
                  to={drawerOption.path}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component='nav'>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>{themeName === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
                </ListItemIcon>
                <ListItemText primary='Alternar tema' />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
