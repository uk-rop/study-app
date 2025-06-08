import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    Alert,
    Stack,
    Divider
} from '@mui/material';
import {
    Login as LoginIcon,
    PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Layout from '../Layouts/Layout';

export default function MuiLogin({ auth, errors: serverErrors }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login', {
            onSuccess: () => {
                // Refresh page to ensure clean session state
                window.location.href = '/dashboard';
            },
            onError: (errors) => {
                console.error('Login failed:', errors);

                // Check for 419 CSRF token errors
                if (errors?.status === 419 ||
                    Object.values(errors).some(error =>
                        typeof error === 'string' && error.includes('419')
                    )) {
                    console.log('CSRF error detected, refreshing page');
                    window.location.reload();
                }
            }
        });
    };

    return (
        <Layout auth={auth} title={t('signIn')} maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                    py: 4
                }}
            >
                <Card sx={{ width: '100%', maxWidth: 400 }}>
                    <CardContent sx={{ p: 4 }}>
                        {/* Header */}
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <LoginIcon
                                sx={{
                                    fontSize: 48,
                                    color: 'primary.main',
                                    mb: 2
                                }}
                            />
                            <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
                                {t('signIn')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {t('signInSubtitle')}
                            </Typography>
                        </Box>

                        {/* Server Errors */}
                        {Object.keys(serverErrors || {}).length > 0 && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {Object.values(serverErrors)[0]}
                            </Alert>
                        )}

                        {/* Login Form */}
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label={t('emailAddress')}
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    autoComplete="email"
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label={t('password')}
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    autoComplete="current-password"
                                    required
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label={t('rememberMe')}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={processing}
                                    startIcon={<LoginIcon />}
                                    sx={{
                                        mt: 3,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        fontWeight: 600
                                    }}
                                >
                                    {processing ? t('loading') : t('signIn')}
                                </Button>
                            </Stack>
                        </Box>

                        {/* Register Link */}
                        <Box sx={{ mt: 4 }}>
                            <Divider sx={{ mb: 3 }}>
                                <Typography variant="body2" color="text.secondary">
                                    OR
                                </Typography>
                            </Divider>
                            <Button
                                fullWidth
                                variant="outlined"
                                component={Link}
                                href="/register"
                                startIcon={<PersonAddIcon />}
                                size="large"
                                sx={{
                                    py: 1.5,
                                    fontSize: '1rem'
                                }}
                            >
                                {t('createAccount')}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    );
}
