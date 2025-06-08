import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Grid,
    Chip,
    Stack,
    Breadcrumbs,
    Divider,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    School as SchoolIcon,
    Person as PersonIcon,
    Schedule as ScheduleIcon,
    Grade as GradeIcon,
    Info as InfoIcon,
    ToggleOn as ToggleOnIcon,
    ToggleOff as ToggleOffIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Layout from '../../Layouts/Layout';
import { useState } from 'react';

export default function SubjectShow({ auth, subject, flash }) {
    const { t } = useTranslation();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { delete: destroy, patch } = useForm();

    const handleDelete = () => {
        destroy(`/subjects/${subject.id}`, {
            onSuccess: () => {
                // Will redirect to subjects index
            }
        });
    };

    const handleToggleStatus = () => {
        patch(`/subjects/${subject.id}/toggle-status`);
    };

    const getDifficultyColor = (level) => {
        switch (level) {
            case 'beginner': return 'success';
            case 'intermediate': return 'warning';
            case 'advanced': return 'error';
            default: return 'default';
        }
    };

    const getPeriodTranslationKey = (period) => {
        // Map period values to translation keys
        const periodMap = {
            'Fall 2024': 'fall2024',
            'Spring 2025': 'spring2025',
            'Summer 2025': 'summer2025',
            'Fall 2025': 'fall2025',
            'Academic Year 2024-2025': 'academicYear2024-2025',
            'Semester 1': 'semester1',
            'Semester 2': 'semester2',
            'Quarter 1': 'quarter1',
            'Quarter 2': 'quarter2',
            'Quarter 3': 'quarter3',
            'Quarter 4': 'quarter4'
        };
        return periodMap[period] || period; // fallback to original value if not found
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Layout auth={auth} title={subject.name}>
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
                    <Typography color="text.primary">{subject.name}</Typography>
                </Breadcrumbs>

                {/* Flash Messages */}
                {flash?.success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {flash.success}
                    </Alert>
                )}

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                        <Typography variant="h3" component="h1" fontWeight={600} gutterBottom>
                            {subject.name}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <Chip label={subject.subject_code} variant="outlined" size="medium" />
                            <Chip
                                label={subject.difficulty_level}
                                color={getDifficultyColor(subject.difficulty_level)}
                                size="medium"
                            />
                            <Chip
                                label={subject.is_active ? t('active') : t('inactive')}
                                color={subject.is_active ? 'success' : 'default'}
                                size="medium"
                            />
                        </Stack>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            component={Link}
                            href="/subjects"
                        >
                            {t('backToSubjects')}
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            component={Link}
                            href={`/subjects/${subject.id}/edit`}
                        >
                            {t('editSubject')}
                        </Button>
                    </Stack>
                </Box>

                <Grid container spacing={3}>
                    {/* Main Information */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <InfoIcon />
                                    {t('subjectInformation')}
                                </Typography>

                                <Stack spacing={3}>
                                    {/* Description */}
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            {t('description')}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                            {subject.description || t('noDescriptionProvided')}
                                        </Typography>
                                    </Box>

                                    <Divider />

                                    {/* Teacher Information */}
                                    <Box>
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PersonIcon fontSize="small" />
                                            {t('teacherInformation')}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                                            {subject.teacher_name}
                                        </Typography>
                                    </Box>

                                    <Divider />

                                    {/* Academic Details */}
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            {t('academicDetails')}
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <ScheduleIcon fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {t('periodOfStudy')}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {t(`periods.${getPeriodTranslationKey(subject.period_of_study)}`)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <GradeIcon fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {t('creditHours')}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body1" fontWeight={500}>
                                                    {subject.credit_hours} {subject.credit_hours === 1 ? t('hour') : t('hours')}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <SchoolIcon fontSize="small" color="action" />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {t('difficultyLevel')}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={subject.difficulty_level}
                                                    color={getDifficultyColor(subject.difficulty_level)}
                                                    size="small"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {t('status')}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={subject.is_active ? t('active') : t('inactive')}
                                                    color={subject.is_active ? 'success' : 'default'}
                                                    size="small"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Actions & Metadata */}
                    <Grid item xs={12} md={4}>
                        <Stack spacing={3}>
                            {/* Quick Actions */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {t('quickActions')}
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<EditIcon />}
                                            component={Link}
                                            href={`/subjects/${subject.id}/edit`}
                                        >
                                            {t('editSubject')}
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={subject.is_active ? <ToggleOffIcon /> : <ToggleOnIcon />}
                                            onClick={handleToggleStatus}
                                            color={subject.is_active ? 'warning' : 'success'}
                                        >
                                            {subject.is_active ? t('deactivate') : t('activate')}
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => setDeleteDialogOpen(true)}
                                            color="error"
                                        >
                                            {t('deleteSubject')}
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>

                            {/* Metadata */}
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {t('metadata')}
                                    </Typography>
                                    <Stack spacing={2}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {t('created')}
                                            </Typography>
                                            <Typography variant="body2">
                                                {formatDate(subject.created_at)}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {t('lastUpdated')}
                                            </Typography>
                                            <Typography variant="body2">
                                                {formatDate(subject.updated_at)}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {t('subjectId')}
                                            </Typography>
                                            <Typography variant="body2" fontFamily="monospace">
                                                {subject.id}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>{t('confirmDeleteTitle')}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {t('areYouSureDelete', { name: subject.name, code: subject.subject_code })}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>
                            {t('cancel')}
                        </Button>
                        <Button onClick={handleDelete} color="error" variant="contained">
                            {t('deleteConfirm')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
}
