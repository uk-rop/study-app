import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    Paper,
    Stack,
    LinearProgress,
    Divider
} from '@mui/material';
import {
    Person as PersonIcon,
    Analytics as AnalyticsIcon,
    Settings as SettingsIcon,
    TrendingUp as TrendingUpIcon,
    Notifications as NotificationsIcon,
    Security as SecurityIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Layout from '../Layouts/Layout';

export default function MuiDashboard({ auth }) {
    const { t } = useTranslation();

    return (
        <Layout auth={auth} title={t('dashboard')}>
            <Box sx={{ py: 3 }}>
                {/* Welcome Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h3" component="h1" fontWeight={600} gutterBottom>
                        {t('dashboard')}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        {t('welcomeBack', { name: auth.user.name })} {t('dashboardSubtitle')}
                    </Typography>
                </Box>

                {/* User Info Card */}
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    bgcolor: 'primary.main',
                                    fontSize: '2rem'
                                }}
                            >
                                {auth.user.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                                <Typography variant="h5" fontWeight={600} gutterBottom>
                                    {auth.user.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" gutterBottom>
                                    {auth.user.email}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ mt: 1 }} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                                    <Chip label="Active User" color="success" size="small" />
                                    <Chip label="Member" variant="outlined" size="small" />
                                </Stack>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>

                {/* Dashboard Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <DashboardCard
                            icon={<PersonIcon />}
                            title="Profile"
                            description="Manage your account settings and personal information"
                            color="primary"
                            progress={85}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <DashboardCard
                            icon={<AnalyticsIcon />}
                            title="Analytics"
                            description="View your activity stats and performance metrics"
                            color="success"
                            progress={72}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <DashboardCard
                            icon={<SettingsIcon />}
                            title="Settings"
                            description="Configure your preferences and application settings"
                            color="secondary"
                            progress={60}
                        />
                    </Grid>
                </Grid>

                {/* Activity Overview */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Recent Activity
                                </Typography>
                                <Stack spacing={2} sx={{ mt: 2 }}>
                                    <ActivityItem
                                        icon={<TrendingUpIcon />}
                                        title="Profile Updated"
                                        description="You updated your profile information"
                                        time="2 hours ago"
                                        color="success"
                                    />
                                    <ActivityItem
                                        icon={<SecurityIcon />}
                                        title="Password Changed"
                                        description="Your password was successfully updated"
                                        time="1 day ago"
                                        color="primary"
                                    />
                                    <ActivityItem
                                        icon={<NotificationsIcon />}
                                        title="Welcome!"
                                        description="Welcome to your new dashboard"
                                        time="3 days ago"
                                        color="secondary"
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    Quick Stats
                                </Typography>
                                <Stack spacing={3} sx={{ mt: 2 }}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Account Completion
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={85}
                                            sx={{ height: 8, borderRadius: 4 }}
                                        />
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            85% Complete
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Profile Views
                                        </Typography>
                                        <Typography variant="h4" fontWeight={600} color="primary.main">
                                            1,234
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Last Login
                                        </Typography>
                                        <Typography variant="body1">
                                            Today at 2:30 PM
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
}

function DashboardCard({ icon, title, description, color = 'primary', progress }) {
    return (
        <Card
            sx={{
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                }
            }}
        >
            <CardContent>
                <Stack spacing={2}>
                    <Avatar
                        sx={{
                            bgcolor: `${color}.main`,
                            color: 'white',
                            width: 56,
                            height: 56
                        }}
                    >
                        {icon}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {description}
                        </Typography>
                        <Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Progress
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={progress}
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: `${color}.50`,
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: `${color}.main`
                                    }
                                }}
                            />
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {progress}% Complete
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

function ActivityItem({ icon, title, description, time, color = 'primary' }) {
    return (
        <Box>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                    sx={{
                        bgcolor: `${color}.main`,
                        color: 'white',
                        width: 40,
                        height: 40
                    }}
                >
                    {icon}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {time}
                    </Typography>
                </Box>
            </Stack>
            <Divider sx={{ mt: 2 }} />
        </Box>
    );
}
