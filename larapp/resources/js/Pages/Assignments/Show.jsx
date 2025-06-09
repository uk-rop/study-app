import React, { useState } from 'react';
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
    Alert,
    Paper,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider
} from '@mui/material';
import {
    Assignment as AssignmentIcon,
    School as SchoolIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    NavigateNext as NavigateNextIcon,
    CalendarToday as CalendarIcon,
    Grade as GradeIcon,
    Category as CategoryIcon,
    Description as DescriptionIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Layout from '../../Layouts/Layout';

export default function AssignmentShow({ auth, subject, assignment, flash }) {
    const { t } = useTranslation();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(`/subjects/${subject.id}/assignments/${assignment.id}`, {
            onSuccess: () => {
                setDeleteDialogOpen(false);
            },
            onError: (errors) => {
                console.error('Assignment deletion failed:', errors);
            }
        });
    };

    const getTypeColor = (type) => {
        const colors = {
            homework: 'primary',
            project: 'secondary',
            exam: 'error',
            quiz: 'warning',
            presentation: 'info',
            lab: 'success'
        };
        return colors[type] || 'default';
    };

    const formatDate = (dateString) => {
        if (!dateString) return t('notSet');
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const isOverdue = (dueDateString) => {
        if (!dueDateString || assignment.is_completed) return false;
        return new Date(dueDateString) < new Date();
    };

    return (
        <Layout auth={auth} title={`${assignment.name} - ${subject.name}`}>
            <Box sx={{ p: 3 }}>
                {/* Flash Messages */}
                {flash?.success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {flash.success}
                    </Alert>
                )}
                {flash?.error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {flash.error}
                    </Alert>
                )}

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
                    <Typography color="text.primary">{assignment.name}</Typography>
                </Breadcrumbs>

                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h3" component="h1" fontWeight={600} gutterBottom>
                            {assignment.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {t('assignmentFor', { subject: `${subject.name} (${subject.subject_code})` })}
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            component={Link}
                            href={`/subjects/${subject.id}/assignments`}
                        >
                            {t('backToAssignments')}
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            component={Link}
                            href={`/subjects/${subject.id}/assignments/${assignment.id}/edit`}
                        >
                            {t('editAssignment')}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            {t('delete')}
                        </Button>
                    </Stack>
                </Box>

                <Grid container spacing={3}>
                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent sx={{ p: 4 }}>
                                {/* Status */}
                                <Box sx={{ mb: 3 }}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {assignment.is_completed ? (
                                            <Chip
                                                icon={<CheckCircleIcon />}
                                                label={t('completed')}
                                                color="success"
                                                variant="outlined"
                                            />
                                        ) : (
                                            <Chip
                                                icon={<RadioButtonUncheckedIcon />}
                                                label={t('pending')}
                                                color="warning"
                                                variant="outlined"
                                            />
                                        )}

                                        <Chip
                                            icon={<CategoryIcon />}
                                            label={t(`assignmentTypes.${assignment.type}`)}
                                            color={getTypeColor(assignment.type)}
                                            variant="outlined"
                                        />

                                        {isOverdue(assignment.due_date) && (
                                            <Chip
                                                label={t('overdue')}
                                                color="error"
                                                variant="filled"
                                            />
                                        )}
                                    </Stack>
                                </Box>

                                <Divider sx={{ mb: 3 }} />

                                {/* Description */}
                                {assignment.description && (
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <DescriptionIcon color="primary" />
                                            {t('description')}
                                        </Typography>
                                        <Typography variant="body1" sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                                            {assignment.description}
                                        </Typography>
                                    </Box>
                                )}

                                {/* Additional Details */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                {t('dueDate')}
                                            </Typography>
                                            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarIcon fontSize="small" />
                                                {formatDate(assignment.due_date)}
                                            </Typography>
                                        </Paper>
                                    </Grid>

                                    {assignment.points && (
                                        <Grid item xs={12} sm={6}>
                                            <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                    {t('points')}
                                                </Typography>
                                                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <GradeIcon fontSize="small" />
                                                    {assignment.points}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    )}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {t('subjectInformation')}
                                </Typography>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {t('subjectName')}
                                        </Typography>
                                        <Typography variant="body1">
                                            {subject.name}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {t('subjectCode')}
                                        </Typography>
                                        <Typography variant="body1">
                                            {subject.subject_code}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {t('professor')}
                                        </Typography>
                                        <Typography variant="body1">
                                            {subject.professor || t('notSpecified')}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {t('credits')}
                                        </Typography>
                                        <Typography variant="body1">
                                            {subject.credits || t('notSpecified')}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        <Card sx={{ mt: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {t('assignmentDetails')}
                                </Typography>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {t('created')}
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate(assignment.created_at)}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {t('lastUpdated')}
                                        </Typography>
                                        <Typography variant="body1">
                                            {formatDate(assignment.updated_at)}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {t('deleteAssignment')}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {t('confirmDeleteAssignment', { name: assignment.name })}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        disabled={processing}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                        disabled={processing}
                    >
                        {processing ? t('deletingAssignment') : t('delete')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
}
