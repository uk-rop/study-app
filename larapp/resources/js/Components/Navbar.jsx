import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Avatar,
    Tooltip,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle,
    Home,
    Dashboard,
    Login,
    PersonAdd,
    Logout,
    School,
    Language
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function MuiNavbar({ auth }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { t } = useTranslation();

    const { post } = useForm();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        post('/logout', {
            onSuccess: () => {
                // Refresh page to ensure clean logout
                window.location.href = '/';
            },
            onError: (errors) => {
                console.error('Logout failed:', errors);

                // For logout, always refresh page regardless of error type
                // This ensures user is logged out even if CSRF fails
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            },
            onFinish: () => {
                console.log('Logout request completed');

                // Fallback: if neither onSuccess nor onError triggered refresh
                setTimeout(() => {
                    if (window.location.pathname !== '/') {
                        window.location.href = '/';
                    }
                }, 2000);
            }
        });
    };

    const navigationItems = [
        { text: t('home'), href: '/', icon: <Home /> },
        { text: t('localizationDemo'), href: '/localization-demo', icon: <Language /> },
        ...(auth?.user ? [
            { text: t('dashboard'), href: '/dashboard', icon: <Dashboard /> },
            { text: t('subjects'), href: '/subjects', icon: <School /> }
        ] : [])
    ];

    const drawer = (
        <Box sx={{ width: 250 }} role="presentation">
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Laravel App
                </Typography>
            </Box>
            <Divider />
            <List>
                {navigationItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={item.href}
                            onClick={handleDrawerToggle}
                        >
                            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                {item.icon}
                            </Box>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {auth?.user ? (
                    <>
                        <ListItem>
                            <ListItemText
                                primary={`Welcome, ${auth.user.name}!`}
                                secondary={auth.user.email}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    handleDrawerToggle();
                                    handleLogout();
                                }}
                            >
                                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                    <Logout />
                                </Box>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href="/login"
                                onClick={handleDrawerToggle}
                            >
                                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                    <Login />
                                </Box>
                                <ListItemText primary={t('signIn')} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href="/register"
                                onClick={handleDrawerToggle}
                            >
                                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                    <PersonAdd />
                                </Box>
                                <ListItemText primary={t('signUp')} />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
            <Divider />
            <Box sx={{ p: 2 }}>
                <LanguageSwitcher />
            </Box>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky" elevation={1}>
                <Toolbar>
                    {/* Mobile menu button */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {/* Logo */}
                    <Typography
                        variant="h6"
                        component={Link}
                        href="/"
                        sx={{
                            flexGrow: isMobile ? 1 : 0,
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 'bold',
                            mr: 4
                        }}
                    >
                        Laravel App
                    </Typography>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                            {navigationItems.map((item) => (
                                <Button
                                    key={item.text}
                                    color="inherit"
                                    component={Link}
                                    href={item.href}
                                    startIcon={item.icon}
                                    sx={{ textTransform: 'none' }}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* Desktop Authentication */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LanguageSwitcher />
                            {auth?.user ? (
                                <>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }}>
                                                {auth.user.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem disabled>
                                            <Box>
                                                <Typography variant="subtitle2">
                                                    {auth.user.name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {auth.user.email}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem
                                            onClick={() => {
                                                handleClose();
                                                handleLogout();
                                            }}
                                        >
                                            <Logout fontSize="small" sx={{ mr: 1 }} />
                                            {t('logout')}
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        href="/login"
                                        startIcon={<Login />}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        {t('signIn')}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        component={Link}
                                        href="/register"
                                        startIcon={<PersonAdd />}
                                        sx={{
                                            textTransform: 'none',
                                            borderColor: 'rgba(255, 255, 255, 0.5)',
                                            '&:hover': {
                                                borderColor: 'white',
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                            }
                                        }}
                                    >
                                        {t('signUp')}
                                    </Button>
                                </>
                            )}
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                }}
            >
                {drawer}
            </Drawer>
        </>
    );
}
