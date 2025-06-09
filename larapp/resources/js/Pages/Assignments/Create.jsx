import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Stack,
    Breadcrumbs,
    Alert
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Save as SaveIcon,
    Assignment as AssignmentIcon,
    School as SchoolIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Layout from '../../Layouts/Layout';

export default function AssignmentCreate({ auth, subject, assignmentTypes = [], errors: serverErrors }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        type: assignmentTypes.length > 0 ? assignmentTypes[0].name : '',
        due_date: '',
        points: '',
        is_completed: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/subjects/${subject.id}/assignments`, {
            onSuccess: () => {
                // Will be redirected by controller
            },
            onError: (errors) => {
                console.error('Assignment creation failed:', errors);
            }
        });
    };

    // Get current date and time for default due date
    const getCurrentDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    return (
        <Layout auth={auth} title={`Create Assignment - ${subject.name}`}>
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
                    <Link
                        href={`/subjects/${subject.id}`}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        {subject.name}
                    </Link>
                    <Link
                        href={`/subjects/${subject.id}/assignments`}
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        <AssignmentIcon fontSize="small" />
                        {t('assignments')}
                    </Link>
                    <Typography color="text.primary">{t('createAssignment')}</Typography>
                </Breadcrumbs>

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h3" component="h1" fontWeight={600} gutterBottom>
                            {t('createAssignment')}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {t('assignmentFor', { subject: `${subject.name} (${subject.subject_code})` })}
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        component={Link}
                        href={`/subjects/${subject.id}/assignments`}
                    >
                        {t('backToAssignments')}
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
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {/* Basic Information */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom color="primary">
                                        {t('basicInformation')}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={8}>
                                    <TextField
                                        fullWidth
                                        label={t('assignmentName')}
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        required
                                        placeholder={t('assignmentNamePlaceholder')}
                                    />
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl fullWidth error={!!errors.type}>
                                        <InputLabel required>{t('assignmentType')}</InputLabel>
                                        <Select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            label={`${t('assignmentType')} *`}
                                        >
                                            {assignmentTypes.map((type) => (
                                                <MenuItem key={type.name} value={type.name}>
                                                    {type.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.type && (
                                            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                                                {errors.type}
                                            </Typography>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label={t('description')}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        error={!!errors.description}
                                        helperText={errors.description || t('assignmentDescriptionHelper')}
                                        placeholder={t('assignmentDescriptionPlaceholder')}
                                    />
                                </Grid>

                                {/* Due Date & Points */}
                                <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                                        {t('schedulingAndGrading')}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        type="datetime-local"
                                        label={t('dueDateAndTime')}
                                        value={data.due_date}
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        error={!!errors.due_date}
                                        helperText={errors.due_date}
                                        required
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            min: getCurrentDateTime()
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label={t('points')}
                                        value={data.points}
                                        onChange={(e) => setData('points', e.target.value)}
                                        error={!!errors.points}
                                        helperText={errors.points || t('pointsHelper')}
                                        placeholder={t('pointsPlaceholder')}
                                        inputProps={{
                                            min: 0,
                                            max: 1000
                                        }}
                                    />
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
                                                checked={data.is_completed}
                                                onChange={(e) => setData('is_completed', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={t('markAsCompleted')}
                                    />
                                </Grid>

                                {/* Actions */}
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            startIcon={<SaveIcon />}
                                            disabled={processing}
                                            size="large"
                                        >
                                            {processing ? t('creatingAssignment') : t('createAssignment')}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            component={Link}
                                            href={`/subjects/${subject.id}/assignments`}
                                            disabled={processing}
                                            size="large"
                                        >
                                            {t('cancel')}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </Layout>
    );
}
