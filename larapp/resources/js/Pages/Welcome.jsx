import React from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Avatar,
    Alert,
    Stack,
    Chip,
    Container
} from '@mui/material';
import {
    Bolt as LightningIcon,
    Security as SecurityIcon,
    DevicesOther as DevicesIcon,
    Dashboard as DashboardIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Layout from '../Layouts/Layout';

export default function MuiWelcome({ auth, laravelVersion, phpVersion }) {
    const { post } = useForm();
    const { t } = useTranslation();

    const handleLogout = () => {
        post('/logout', {
            onSuccess: () => {
                // Refresh page to ensure clean logout
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Logout failed:', errors);

                // For logout, always refresh page regardless of error type
                // This ensures user is logged out even if CSRF fails
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            },
            onFinish: () => {
                console.log('Logout request completed');

                // Fallback: if neither onSuccess nor onError triggered refresh
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        });
    };

    return (
        <Layout auth={auth} title={t('welcome')}>
            <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 6, md: 8 } }}>
                {/* Hero Section */}
                <Box sx={{ mb: { xs: 6, sm: 8, md: 10 } }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            mb: 3,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' }
                        }}
                    >
                        {t('welcomeToLaravel')}
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            maxWidth: 600,
                            mx: 'auto',
                            mb: 4,
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
                        }}
                    >
                        {t('laravelDescription')}
                    </Typography>
                </Box>

                {/* Authentication Section */}
                <Box sx={{ mb: { xs: 6, sm: 8, md: 10 } }}>
                    {auth.user ? (
                        <Alert
                            severity="success"
                            sx={{
                                maxWidth: 500,
                                mx: 'auto',
                                mb: 3,
                                '& .MuiAlert-message': {
                                    width: '100%'
                                }
                            }}
                        >
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {t('welcomeBack', { name: auth.user.name })}
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href="/dashboard"
                                    startIcon={<DashboardIcon />}
                                    size="large"
                                >
                                    {t('goToDashboard')}
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleLogout}
                                    startIcon={<LogoutIcon />}
                                    size="large"
                                >
                                    {t('logout')}
                                </Button>
                            </Stack>
                        </Alert>
                    ) : (
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            justifyContent="center"
                            sx={{ maxWidth: 400, mx: 'auto' }}
                        >
                            <Button
                                variant="contained"
                                component={Link}
                                href="/login"
                                size="large"
                                sx={{
                                    py: 1.5,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    boxShadow: 3,
                                    '&:hover': {
                                        boxShadow: 6,
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease-in-out'
                                }}
                            >
                                {t('signIn')}
                            </Button>
                            <Button
                                variant="outlined"
                                component={Link}
                                href="/register"
                                size="large"
                                sx={{
                                    py: 1.5,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    boxShadow: 2,
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-2px)'
                                    },
                                    transition: 'all 0.3s ease-in-out'
                                }}
                            >
                                {t('signUp')}
                            </Button>
                        </Stack>
                    )}
                </Box>

                {/* Features Section */}
                <Grid container spacing={4} sx={{ mb: { xs: 6, sm: 8, md: 10 } }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureCard
                            icon={<LightningIcon />}
                            title={t('fastSecure')}
                            description={t('fastSecureDesc')}
                            color="primary"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureCard
                            icon={<SecurityIcon />}
                            title={t('authentication')}
                            description={t('authenticationDesc')}
                            color="secondary"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <FeatureCard
                            icon={<DevicesIcon />}
                            title={t('reactInertia')}
                            description={t('reactInertiaDesc')}
                            color="success"
                        />
                    </Grid>
                </Grid>

                {/* Footer */}
                <Box
                    sx={{
                        pt: 4,
                        borderTop: 1,
                        borderColor: 'divider'
                    }}
                >
                    <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
                        <Chip label={`Laravel v${laravelVersion}`} variant="outlined" size="small" />
                        <Chip label={`PHP v${phpVersion}`} variant="outlined" size="small" />
                        <Chip label="React" variant="outlined" size="small" />
                        <Chip label="Inertia.js" variant="outlined" size="small" />
                    </Stack>
                </Box>
            </Box>
        </Layout>
    );
}

function FeatureCard({ icon, title, description, color = 'primary' }) {
    return (
        <Card
            sx={{
                height: '100%',
                textAlign: 'center',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                }
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Avatar
                    sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: `${color}.main`,
                        color: 'white'
                    }}
                >
                    {icon}
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
