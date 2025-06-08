import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    Paper,
    Grid,
    Card,
    CardContent,
    AppBar,
    Toolbar,
    Alert,
    Snackbar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Components/LanguageSwitcher';
import useLocalization from '../hooks/useLocalization';

export default function LocalizationDemo({ auth }) {
    const { t } = useTranslation();
    const { formatDate, formatNumber, formatCurrency } = useLocalization();
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAlert(true);
    };

    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    return (
        <>
            <Head title={t('welcome')} />

            {/* App Bar with Language Switcher */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {t('welcome')}
                    </Typography>
                    <LanguageSwitcher />
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={4}>
                    {/* Welcome Section */}
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h4" gutterBottom>
                                {t('welcome')}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                This is a demonstration of the localization system with React i18next and Laravel.
                                Use the language switcher in the top right to change between English and Ukrainian.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Navigation Demo */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {t('home')}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    <Button variant="outlined">{t('home')}</Button>
                                    <Button variant="outlined">{t('about')}</Button>
                                    <Button variant="outlined">{t('contact')}</Button>
                                    <Button variant="outlined">{t('settings')}</Button>
                                    <Button variant="outlined">{t('profile')}</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Form Demo */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {t('register')}
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                    <TextField
                                        fullWidth
                                        label={t('name')}
                                        value={formData.name}
                                        onChange={handleInputChange('name')}
                                        margin="normal"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label={t('email')}
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange('email')}
                                        margin="normal"
                                        required
                                    />
                                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                        <Button type="submit" variant="contained">
                                            {t('submit')}
                                        </Button>
                                        <Button variant="outlined">
                                            {t('cancel')}
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Actions Demo */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {t('actions')}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    <Button variant="contained" color="primary">
                                        {t('create')}
                                    </Button>
                                    <Button variant="contained" color="secondary">
                                        {t('edit')}
                                    </Button>
                                    <Button variant="contained" color="success">
                                        {t('save')}
                                    </Button>
                                    <Button variant="contained" color="error">
                                        {t('delete')}
                                    </Button>
                                    <Button variant="outlined">
                                        {t('search')}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Formatting Demo */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Formatting Demo
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    <strong>{t('date')}:</strong> {formatDate(new Date())}
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    <strong>Number:</strong> {formatNumber(1234567.89)}
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    <strong>Currency (USD):</strong> {formatCurrency(1234.56, 'USD')}
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    <strong>Currency (UAH):</strong> {formatCurrency(1234.56, 'UAH')}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Status Messages Demo */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {t('status')} Messages
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Alert severity="success">{t('loginSuccess')}</Alert>
                                    <Alert severity="error">{t('loginError')}</Alert>
                                    <Alert severity="warning">{t('warning')}</Alert>
                                    <Alert severity="info">{t('info')}</Alert>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Success Snackbar */}
                <Snackbar
                    open={showAlert}
                    autoHideDuration={3000}
                    onClose={() => setShowAlert(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        onClose={() => setShowAlert(false)}
                        severity="success"
                        sx={{ width: '100%' }}
                    >
                        {t('saveSuccess')}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
}
