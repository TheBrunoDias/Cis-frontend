import { Close, Menu } from '@mui/icons-material';
import { AppBar, Button, IconButton, List, ListItemButton, SwipeableDrawer, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuth } from '../hooks/useAuth';

const routes = [
  {
    id: 1,
    title: 'Inicio',
    path: '/painel',
  },
  {
    id: 2,
    title: 'Pacientes',
    path: '/painel/pacientes',
  },
  {
    id: 3,
    title: 'Profissionais',
    path: '/painel/profissionais',
  },
  {
    id: 4,
    title: 'Estagiários',
    path: '/painel/estagiarios',
  },
  {
    id: 5,
    title: 'Salas',
    path: '/painel/salas',
  },
  {
    id: 6,
    title: 'Especialidades',
    path: '/painel/especialidades',
  },
  {
    id: 7,
    title: 'Consultas',
    path: '/painel/consultas',
  },
  {
    id: 8,
    title: 'Pacotes de Consultas',
    path: '/painel/pacotes',
  },
];

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ username: string }>();
  const { getAuthUser, handleSignOut } = useAuth();

  useEffect(() => {
    const user = getAuthUser();

    if (!user) {
      window.location.replace('/');
      return;
    }

    setUser(user);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return user ? (
    <>
      <AppBar color="secondary" elevation={1} position="sticky">
        <Toolbar>
          <div className="container mx-auto flex justify-start items-center">
            <IconButton onClick={handleOpen}>
              <Menu />
            </IconButton>
            <p className="flex-1">Painel Administrativo</p>

            <Button variant="contained" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <main className="container mx-auto my-5">{children}</main>
      <SwipeableDrawer anchor="left" open={open} onClose={handleClose} onOpen={handleOpen}>
        <div className="relative w-screen max-w-[50vw] lg:max-w-[20vw] bg-secondary-30 h-full flex justify-start items-start flex-col py-20">
          <div className="absolute top-5 right-5">
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </div>
          <img src={logo} alt="Cis" className="object-contain w-full pl-10 max-w-xs mb-20" />
          <List className="w-full my-3 flex justify-center items-stretch flex-col">
            {routes.map((route) => (
              <Link to={route.path} key={route.id}>
                <ListItemButton onClick={handleClose}>
                  <span className="pl-10">{route.title.toUpperCase()}</span>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </>
  ) : (
    <></>
  );
};
