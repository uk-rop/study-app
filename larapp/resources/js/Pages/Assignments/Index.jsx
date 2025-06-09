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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    InputAdornment
} from '@mui/material';
import {
    Add as AddIcon,
    Assignment as AssignmentIcon,
    School as SchoolIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as RadioButtonUncheckedIcon,
    Search as SearchIcon,
    NavigateNext as NavigateNextIcon,
    CalendarToday as CalendarIcon,
    Grade as GradeIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Layout from '../../Layouts/Layout';

export default function AssignmentsIndex({ auth, subject, assignments, assignmentTypes = [], flash }) {
    const { t } = useTranslation();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState(null);
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { delete: destroy, patch } = useForm();

    const handleDelete = () => {
        if (assignmentToDelete) {
            destroy(`/subjects/${subject.id}/assignments/${assignmentToDelete.id}`, {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setAssignmentToDelete(null);
                }
            });
        }
    };

    const handleToggleComplete = (assignment) => {
        patch(`/subjects/${subject.id}/assignments/${assignment.id}/toggle-complete`);
    };

    const getTypeColor = (typeName) => {
        const assignmentType = assignmentTypes.find(type => type.name === typeName);
        return assignmentType ? assignmentType.color : 'default';
    };

    const getTypeLabel = (typeName) => {
        const assignmentType = assignmentTypes.find(type => type.name === typeName);
        return assignmentType ? assignmentType.label : typeName;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isOverdue = (dueDate, isCompleted) => {
        return !isCompleted && new Date(dueDate) < new Date();
    };

    const filteredAssignments = assignments.data.filter(assignment => {
        const matchesSearch = assignment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            assignment.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !filterType || assignment.type === filterType;
        const matchesStatus = !filterStatus ||
                            (filterStatus === 'completed' && assignment.is_completed) ||
                            (filterStatus === 'pending' && !assignment.is_completed) ||
                            (filterStatus === 'overdue' && isOverdue(assignment.due_date, assignment.is_completed));

        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <Layout auth={auth} title={`${subject.name} - Assignments`}>
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
                    <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <AssignmentIcon fontSize="small" />
                        {t('assignments')}
                    </Typography>
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
                            {t('assignmentsForSubject', { subject: subject.name })}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {t('manageAssignmentsForSubject', { code: subject.subject_code })}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        component={Link}
                        href={`/subjects/${subject.id}/assignments/create`}
                    >
                        {t('addAssignment')}
                    </Button>
                </Box>

                {/* Filters */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                    fullWidth
                                    placeholder={t('searchAssignments')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <FormControl fullWidth>
                                    <InputLabel>{t('type')}</InputLabel>
                                    <Select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        label={t('type')}
                                    >
                                        <MenuItem value="">{t('all')}</MenuItem>
                                        {assignmentTypes.map((type) => (
                                            <MenuItem key={type.name} value={type.name}>
                                                {type.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <FormControl fullWidth>
                                    <InputLabel>{t('status')}</InputLabel>
                                    <Select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        label={t('status')}
                                    >
                                        <MenuItem value="">{t('all')}</MenuItem>
                                        <MenuItem value="completed">{t('completed')}</MenuItem>
                                        <MenuItem value="pending">{t('pending')}</MenuItem>
                                        <MenuItem value="overdue">{t('overdue')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilterType('');
                                        setFilterStatus('');
                                    }}
                                >
                                    {t('clearFilters')}
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Assignments Table */}
                <Card>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('name')}</TableCell>
                                    <TableCell>{t('type')}</TableCell>
                                    <TableCell>{t('dueDate')}</TableCell>
                                    <TableCell>{t('points')}</TableCell>
                                    <TableCell>{t('status')}</TableCell>
                                    <TableCell align="right">{t('actions')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredAssignments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                            <Typography variant="body1" color="text.secondary">
                                                {t('noAssignmentsFound')}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredAssignments.map((assignment) => (
                                        <TableRow key={assignment.id} hover>
                                            <TableCell>
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight={500}>
                                                        {assignment.name}
                                                    </Typography>
                                                    {assignment.description && (
                                                        <Typography variant="body2" color="text.secondary" noWrap>
                                                            {assignment.description.substring(0, 100)}
                                                            {assignment.description.length > 100 && '...'}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={getTypeLabel(assignment.type)}
                                                    color={getTypeColor(assignment.type)}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <CalendarIcon fontSize="small" color="action" />
                                                    <Box>
                                                        <Typography variant="body2">
                                                            {formatDate(assignment.due_date)}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {formatTime(assignment.due_date)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                {assignment.points && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <GradeIcon fontSize="small" color="action" />
                                                        <Typography variant="body2">
                                                            {assignment.points}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    {assignment.is_completed ? (
                                                        <Chip
                                                            label={t('completed')}
                                                            color="success"
                                                            size="small"
                                                            icon={<CheckCircleIcon />}
                                                        />
                                                    ) : isOverdue(assignment.due_date, assignment.is_completed) ? (
                                                        <Chip
                                                            label={t('overdue')}
                                                            color="error"
                                                            size="small"
                                                        />
                                                    ) : (
                                                        <Chip
                                                            label={t('pending')}
                                                            color="warning"
                                                            size="small"
                                                        />
                                                    )}
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Stack direction="row" spacing={1}>
                                                    <Tooltip title={t('viewDetails')}>
                                                        <IconButton
                                                            size="small"
                                                            component={Link}
                                                            href={`/subjects/${subject.id}/assignments/${assignment.id}`}
                                                        >
                                                            <VisibilityIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={t('editAssignment')}>
                                                        <IconButton
                                                            size="small"
                                                            component={Link}
                                                            href={`/subjects/${subject.id}/assignments/${assignment.id}/edit`}
                                                        >
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={assignment.is_completed ? t('markAsIncomplete') : t('markAsCompleted')}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleToggleComplete(assignment)}
                                                            color={assignment.is_completed ? "success" : "default"}
                                                        >
                                                            {assignment.is_completed ? (
                                                                <CheckCircleIcon fontSize="small" />
                                                            ) : (
                                                                <RadioButtonUncheckedIcon fontSize="small" />
                                                            )}
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={t('deleteAssignment')}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => {
                                                                setAssignmentToDelete(assignment);
                                                                setDeleteDialogOpen(true);
                                                            }}
                                                            color="error"
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>{t('deleteAssignment')}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {t('confirmDeleteAssignment', { name: assignmentToDelete?.name })}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>
                            {t('cancel')}
                        </Button>
                        <Button onClick={handleDelete} color="error" variant="contained">
                            {t('deleteAssignment')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
}
