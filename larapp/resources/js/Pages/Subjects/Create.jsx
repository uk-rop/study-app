import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Alert,
    Stack,
    Breadcrumbs
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    School as SchoolIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Layout from '../../Layouts/Layout';

export default function SubjectCreate({ auth, errors: serverErrors }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        teacher_name: '',
        period_of_study: '',
        credit_hours: 3,
        subject_code: '',
        difficulty_level: 'intermediate',
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/subjects', {
            onSuccess: () => {
                // Will be redirected by controller
            },
            onError: (errors) => {
                console.error('Subject creation failed:', errors);
            }
        });
    };

    const periodOptions = [
        { key: 'fall2024', value: 'Fall 2024' },
        { key: 'spring2025', value: 'Spring 2025' },
        { key: 'summer2025', value: 'Summer 2025' },
        { key: 'fall2025', value: 'Fall 2025' },
        { key: 'academicYear2024-2025', value: 'Academic Year 2024-2025' },
        { key: 'semester1', value: 'Semester 1' },
        { key: 'semester2', value: 'Semester 2' },
        { key: 'quarter1', value: 'Quarter 1' },
        { key: 'quarter2', value: 'Quarter 2' },
        { key: 'quarter3', value: 'Quarter 3' },
        { key: 'quarter4', value: 'Quarter 4' }
    ];

    return (
        <Layout auth={auth} title={t('createSubject')}>
            <Box sx={{ p: 3 }}>
                {/* Breadcrumbs */}
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    sx={{ mb: 3 }}
                >
                    <Link
                        href="/subjects"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        <SchoolIcon fontSize="small" />
                        {t('subjects')}
                    </Link>
                    <Typography color="text.primary">{t('createSubject')}</Typography>
                </Breadcrumbs>

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1" fontWeight={600}>
                        {t('createNewSubject')}
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        component={Link}
                        href="/subjects"
                    >
                        {t('backToSubjects')}
                    </Button>
                </Box>

                {/* Server Errors */}
                {Object.keys(serverErrors || {}).length > 0 && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {t('fixErrorsMessage')}
                    </Alert>
                )}

                {/* Form */}
                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Basic Information */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom color="primary">
                                        {t('basicInformation')}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label={t('subjectName')}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        required
                                        placeholder={t('subjectNamePlaceholder')}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label={t('subjectCode')}
                                        value={data.subject_code}
                                        onChange={(e) => setData('subject_code', e.target.value.toUpperCase())}
                                        error={!!errors.subject_code}
                                        helperText={errors.subject_code || t('subjectCodeHelper')}
                                        required
                                        placeholder={t('subjectCodePlaceholder')}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label={t('description')}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        error={!!errors.description}
                                        helperText={errors.description}
                                        multiline
                                        rows={3}
                                        placeholder={t('descriptionPlaceholder')}
                                    />
                                </Grid>

                                {/* Teacher & Schedule Information */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                                        {t('teacherSchedule')}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label={t('teacherName')}
                                        value={data.teacher_name}
                                        onChange={(e) => setData('teacher_name', e.target.value)}
                                        error={!!errors.teacher_name}
                                        helperText={errors.teacher_name}
                                        required
                                        placeholder={t('teacherNamePlaceholder')}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth error={!!errors.period_of_study}>
                                        <InputLabel required>{t('periodOfStudy')}</InputLabel>
                                        <Select
                                            value={data.period_of_study}
                                            onChange={(e) => setData('period_of_study', e.target.value)}
                                            label={`${t('periodOfStudy')} *`}
                                        >
                                            {periodOptions.map((period) => (
                                                <MenuItem key={period.key} value={period.value}>
                                                    {t(`periods.${period.key}`)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.period_of_study && (
                                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                                {errors.period_of_study}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                {/* Academic Details */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                                        {t('academicDetails')}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label={t('creditHours')}
                                        type="number"
                                        value={data.credit_hours}
                                        onChange={(e) => setData('credit_hours', parseInt(e.target.value) || 0)}
                                        error={!!errors.credit_hours}
                                        helperText={errors.credit_hours || t('creditHoursHelper')}
                                        required
                                        inputProps={{ min: 1, max: 10 }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth error={!!errors.difficulty_level}>
                                        <InputLabel required>{t('difficultyLevel')}</InputLabel>
                                        <Select
                                            value={data.difficulty_level}
                                            onChange={(e) => setData('difficulty_level', e.target.value)}
                                            label={`${t('difficultyLevel')} *`}
                                        >
                                            <MenuItem value="beginner">{t('beginner')}</MenuItem>
                                            <MenuItem value="intermediate">{t('intermediate')}</MenuItem>
                                            <MenuItem value="advanced">{t('advanced')}</MenuItem>
                                        </Select>
                                        {errors.difficulty_level && (
                                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                                {errors.difficulty_level}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                {/* Status */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                                        {t('status')}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={data.is_active}
                                                onChange={(e) => setData('is_active', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={t('activeSubjectLabel')}
                                    />
                                </Grid>

                                {/* Submit Buttons */}
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            startIcon={<SaveIcon />}
                                            disabled={processing}
                                            sx={{ minWidth: 200 }}
                                        >
                                            {processing ? t('creatingSubject') : t('createSubject')}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            component={Link}
                                            href="/subjects"
                                            disabled={processing}
                                        >
                                            {t('cancel')}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    );
}
