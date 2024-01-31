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
import { useDrawerContext } from '../../contexts';

export const MenuLateral = ({ children }: PropsWithChildren) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

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
              <ListItemButton>
                <ListItemIcon>
                  <Icon>home</Icon>
                </ListItemIcon>
                <ListItemText primary='Pagina Inicial' />
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
