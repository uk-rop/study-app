import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    Stack,
    Pagination,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    Add as AddIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    School as SchoolIcon,
    Person as PersonIcon,
    Schedule as ScheduleIcon,
    Grade as GradeIcon,
    ToggleOn as ToggleOnIcon,
    ToggleOff as ToggleOffIcon,
    ViewModule as ViewModuleIcon,
    ViewList as ViewListIcon,
    Assignment as AssignmentIcon,
    CheckCircle as CheckCircleIcon,
    PendingActions as PendingIcon,
    Warning as WarningIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Layout from '../../Layouts/Layout';

export default function SubjectsIndex({ auth, subjects, filters, flash }) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [difficulty, setDifficulty] = useState(filters.difficulty || '');
    const [period, setPeriod] = useState(filters.period || '');
    const [status, setStatus] = useState(filters.status || '');
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'rows'

    const { delete: destroy, patch } = useForm();

    const handleMenuOpen = (event, subject) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
        setSelectedSubject(subject);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedSubject(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/subjects', {
            search: searchTerm,
            difficulty,
            period,
            status
        }, {
            preserveState: true,
            replace: true
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setDifficulty('');
        setPeriod('');
        setStatus('');
        router.get('/subjects', {}, {
            preserveState: true,
            replace: true
        });
    };

    const handleDeleteSubject = () => {
        if (selectedSubject) {
            destroy(`/subjects/${selectedSubject.id}`, {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    handleMenuClose();
                }
            });
        }
    };

    const handleToggleStatus = (subject) => {
        patch(`/subjects/${subject.id}/toggle-status`, {}, {
            onSuccess: () => {
                handleMenuClose();
            }
        });
    };

    const getDifficultyColor = (level) => {
        switch (level) {
            case 'beginner': return 'success';
            case 'intermediate': return 'warning';
            case 'advanced': return 'error';
            default: return 'default';
        }
    };

    return (
        <Layout auth={auth} title={t('subjects')}>
            <Box sx={{ p: 3 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <SchoolIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                        <Typography variant="h4" component="h1" fontWeight={600}>
                            {t('subjects')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: 1, borderColor: 'divider', borderRadius: 1, p: 0.5 }}>
                            <IconButton
                                size="small"
                                onClick={() => setViewMode('cards')}
                                sx={{
                                    color: viewMode === 'cards' ? 'primary.main' : 'text.secondary',
                                    bgcolor: viewMode === 'cards' ? 'primary.50' : 'transparent'
                                }}
                            >
                                <ViewModuleIcon />
                            </IconButton>
                            <IconButton
                                size="small"
                                onClick={() => setViewMode('rows')}
                                sx={{
                                    color: viewMode === 'rows' ? 'primary.main' : 'text.secondary',
                                    bgcolor: viewMode === 'rows' ? 'primary.50' : 'transparent'
                                }}
                            >
                                <ViewListIcon />
                            </IconButton>
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            component={Link}
                            href="/subjects/create"
                            size="large"
                        >
                            {t('addSubject')}
                        </Button>
                    </Box>
                </Box>

                {/* Flash Messages */}
                {flash?.success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        {flash.success}
                    </Alert>
                )}

                {/* Filters */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Box component="form" onSubmit={handleSearch}>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                alignItems: 'center',
                                '& .MuiFormControl-root': {
                                    minWidth: 'fit-content'
                                }
                            }}>
                                <TextField
                                    label={t('search')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={t('searchPlaceholder')}
                                    sx={{
                                        width: { xs: '100%', sm: '280px' }
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <FormControl sx={{ width: { xs: '100%', sm: '140px' } }}>
                                    <InputLabel>{t('difficulty')}</InputLabel>
                                    <Select
                                        value={difficulty}
                                        onChange={(e) => setDifficulty(e.target.value)}
                                        label={t('difficulty')}
                                    >
                                        <MenuItem value="">{t('all')}</MenuItem>
                                        <MenuItem value="beginner">{t('beginner')}</MenuItem>
                                        <MenuItem value="intermediate">{t('intermediate')}</MenuItem>
                                        <MenuItem value="advanced">{t('advanced')}</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ width: { xs: '100%', sm: '150px' } }}>
                                    <InputLabel>{t('period')}</InputLabel>
                                    <Select
                                        value={period}
                                        onChange={(e) => setPeriod(e.target.value)}
                                        label={t('period')}
                                    >
                                        <MenuItem value="">{t('all')}</MenuItem>
                                        <MenuItem value="Fall 2024">{t('periods.fall2024')}</MenuItem>
                                        <MenuItem value="Spring 2025">{t('periods.spring2025')}</MenuItem>
                                        <MenuItem value="Summer 2025">{t('periods.summer2025')}</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ width: { xs: '100%', sm: '100px' } }}>
                                    <InputLabel>{t('status')}</InputLabel>
                                    <Select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        label={t('status')}
                                    >
                                        <MenuItem value="">{t('all')}</MenuItem>
                                        <MenuItem value="active">{t('active')}</MenuItem>
                                        <MenuItem value="inactive">{t('inactive')}</MenuItem>
                                    </Select>
                                </FormControl>

                                <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
                                    <Button type="submit" variant="contained">
                                        {t('search')}
                                    </Button>
                                    <Button onClick={clearFilters} variant="outlined">
                                        {t('clear')}
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Subjects Grid/List */}
                {viewMode === 'cards' ? (
                    <Stack spacing={3}>
                        {subjects.data.map((subject) => (
                            <Card
                                key={subject.id}
                                sx={{
                                    minHeight: 200,
                                    maxHeight: 400,
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    opacity: subject.is_active ? 1 : 0.7,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-2px)',
                                        transition: 'all 0.2s ease-in-out'
                                    }
                                }}
                                onClick={() => router.visit(`/subjects/${subject.id}`)}
                            >
                                    <CardContent sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        p: 2,
                                        '&:last-child': { pb: 2 }
                                    }}>
                                        {/* Header - Fixed height section */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            mb: 2,
                                            minHeight: '72px' // Fixed height for header
                                        }}>
                                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                                <Typography variant="h6" component="h3" sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    mb: 1,
                                                    lineHeight: 1.2,
                                                    height: '2.4em' // Fixed height for 2 lines
                                                }}>
                                                    {subject.name}
                                                </Typography>
                                                <Chip
                                                    label={subject.subject_code}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Box>
                                            <IconButton
                                                size="small"
                                                onClick={(e) => handleMenuOpen(e, subject)}
                                                sx={{ ml: 1, flexShrink: 0 }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Box>

                                        {/* Description - Flexible height section with max height */}
                                        <Box sx={{ mb: 1.5, width: '100%', maxHeight: '84px', overflow: 'hidden' }}> {/* Flexible height with max constraint */}
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 4,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    lineHeight: 1.4,
                                                    width: '100%',
                                                    textAlign: 'justify'
                                                }}
                                            >
                                                {subject.description || t('noDescriptionAvailable')}
                                            </Typography>
                                        </Box>

                                        {/* Details - Fixed height section */}
                                        <Box sx={{ mb: 1.5 }}> {/* Fixed height for details */}
                                            <Stack spacing={0.5}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
                                                    <Typography variant="body2" color="text.secondary" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {subject.teacher_name}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
                                                    <Typography variant="body2" color="text.secondary" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {subject.period_of_study}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <GradeIcon sx={{ fontSize: 16, color: 'text.secondary', flexShrink: 0 }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {subject.credit_hours} {t('creditHours')}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </Box>

                                        {/* Assignment Statistics */}
                                        {subject.assignments_count > 0 && (
                                            <Box sx={{ mb: 1.5, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <AssignmentIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                                    <Typography variant="body2" fontWeight={600} color="primary.main">
                                                        {t('assignments')} ({subject.assignments_count})
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                                                    {subject.completed_assignments_count > 0 && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <CheckCircleIcon sx={{ fontSize: 14, color: 'success.main' }} />
                                                            <Typography variant="caption" color="success.main">
                                                                {subject.completed_assignments_count}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                    {subject.pending_assignments_count > 0 && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <PendingIcon sx={{ fontSize: 14, color: 'warning.main' }} />
                                                            <Typography variant="caption" color="warning.main">
                                                                {subject.pending_assignments_count}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                    {subject.overdue_assignments_count > 0 && (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <WarningIcon sx={{ fontSize: 14, color: 'error.main' }} />
                                                            <Typography variant="caption" color="error.main">
                                                                {subject.overdue_assignments_count}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Box>
                                            </Box>
                                        )}

                                        {/* Tags - Bottom aligned */}
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 'auto' }}>
                                            <Chip
                                                label={t(subject.difficulty_level)}
                                                size="small"
                                                color={getDifficultyColor(subject.difficulty_level)}
                                            />
                                            <Chip
                                                label={subject.is_active ? t('active') : t('inactive')}
                                                size="small"
                                                color={subject.is_active ? 'success' : 'default'}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                        ))}
                    </Stack>
                ) : (
                    <Stack spacing={2}>
                        {subjects.data.map((subject) => (
                            <Card
                                key={subject.id}
                                sx={{
                                    opacity: subject.is_active ? 1 : 0.7,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: 2,
                                        bgcolor: 'grey.50'
                                    }
                                }}
                                onClick={() => router.visit(`/subjects/${subject.id}`)}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexGrow: 1 }}>
                                            {/* Subject Info */}
                                            <Box sx={{ minWidth: 200 }}>
                                                <Typography variant="h6" component="h3" gutterBottom>
                                                    {subject.name}
                                                </Typography>
                                                <Chip
                                                    label={subject.subject_code}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </Box>

                                            {/* Teacher */}
                                            <Box sx={{ minWidth: 150, display: { xs: 'none', md: 'block' } }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {subject.teacher_name}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Period */}
                                            <Box sx={{ minWidth: 120, display: { xs: 'none', lg: 'block' } }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {subject.period_of_study}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Credit Hours */}
                                            <Box sx={{ minWidth: 100, display: { xs: 'none', md: 'block' } }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <GradeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {subject.credit_hours}h
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* Assignment Statistics */}
                                            <Box sx={{ minWidth: 120, display: { xs: 'none', lg: 'block' } }}>
                                                {subject.assignments_count > 0 ? (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <AssignmentIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                                        <Typography variant="body2" color="primary.main" fontWeight={600}>
                                                            {subject.assignments_count}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                                                            {subject.completed_assignments_count > 0 && (
                                                                <Typography variant="caption" color="success.main">
                                                                    ✓{subject.completed_assignments_count}
                                                                </Typography>
                                                            )}
                                                            {subject.pending_assignments_count > 0 && (
                                                                <Typography variant="caption" color="warning.main">
                                                                    ⏳{subject.pending_assignments_count}
                                                                </Typography>
                                                            )}
                                                            {subject.overdue_assignments_count > 0 && (
                                                                <Typography variant="caption" color="error.main">
                                                                    ⚠️{subject.overdue_assignments_count}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </Box>
                                                ) : (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        <AssignmentIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                                                        <Typography variant="body2" color="text.disabled">
                                                            {t('noAssignments')}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>

                                            {/* Tags */}
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                <Chip
                                                    label={t(subject.difficulty_level)}
                                                    size="small"
                                                    color={getDifficultyColor(subject.difficulty_level)}
                                                />
                                                <Chip
                                                    label={subject.is_active ? t('active') : t('inactive')}
                                                    size="small"
                                                    color={subject.is_active ? 'success' : 'default'}
                                                />
                                            </Box>
                                        </Box>

                                        {/* Actions */}
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleMenuOpen(e, subject)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Box>

                                    {/* Description - only show in mobile for row view */}
                                    <Box sx={{ display: { xs: 'block', md: 'none' }, mt: 2 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            <strong>{t('teacher')}:</strong> {subject.teacher_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            <strong>{t('period')}:</strong> {subject.period_of_study}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            <strong>{t('credits')}:</strong> {subject.credit_hours} {t('creditHours').toLowerCase()}
                                        </Typography>
                                        {subject.assignments_count > 0 && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                                <AssignmentIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                                                <Typography variant="body2" color="primary.main" fontWeight={600}>
                                                    <strong>{t('assignments')}:</strong> {subject.assignments_count}
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    {subject.completed_assignments_count > 0 && (
                                                        <Typography variant="caption" color="success.main">
                                                            ✓{subject.completed_assignments_count}
                                                        </Typography>
                                                    )}
                                                    {subject.pending_assignments_count > 0 && (
                                                        <Typography variant="caption" color="warning.main">
                                                            ⏳{subject.pending_assignments_count}
                                                        </Typography>
                                                    )}
                                                    {subject.overdue_assignments_count > 0 && (
                                                        <Typography variant="caption" color="error.main">
                                                            ⚠️{subject.overdue_assignments_count}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}

                {/* Empty State */}
                {subjects.data.length === 0 && (
                    <Card sx={{ textAlign: 'center', py: 6 }}>
                        <CardContent>
                            <SchoolIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                {t('noSubjects')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                {filters.search || filters.difficulty || filters.period || filters.status
                                    ? t('adjustFiltersMessage')
                                    : t('getStartedMessage')
                                }
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                component={Link}
                                href="/subjects/create"
                            >
                                {t('addSubject')}
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {subjects.data.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={subjects.last_page}
                            page={subjects.current_page}
                            onChange={(event, page) => {
                                router.get(`/subjects?page=${page}`, {
                                    search: searchTerm,
                                    difficulty,
                                    period,
                                    status
                                }, {
                                    preserveState: true,
                                    replace: true
                                });
                            }}
                            color="primary"
                            size="large"
                        />
                    </Box>
                )}

                {/* Context Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem
                        component={Link}
                        href={`/subjects/${selectedSubject?.id}`}
                        onClick={handleMenuClose}
                    >
                        <ViewIcon sx={{ mr: 1 }} />
                        {t('viewDetails')}
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        href={`/assignments?subject_id=${selectedSubject?.id}`}
                        onClick={handleMenuClose}
                    >
                        <AssignmentIcon sx={{ mr: 1 }} />
                        {t('manageAssignments')}
                    </MenuItem>
                    <MenuItem
                        component={Link}
                        href={`/subjects/${selectedSubject?.id}/edit`}
                        onClick={handleMenuClose}
                    >
                        <EditIcon sx={{ mr: 1 }} />
                        {t('edit')}
                    </MenuItem>
                    <MenuItem onClick={() => selectedSubject && handleToggleStatus(selectedSubject)}>
                        {selectedSubject?.is_active ? (
                            <>
                                <ToggleOffIcon sx={{ mr: 1 }} />
                                {t('deactivate')}
                            </>
                        ) : (
                            <>
                                <ToggleOnIcon sx={{ mr: 1 }} />
                                {t('activate')}
                            </>
                        )}
                    </MenuItem>
                    <MenuItem
                        onClick={() => setDeleteDialogOpen(true)}
                        sx={{ color: 'error.main' }}
                    >
                        <DeleteIcon sx={{ mr: 1 }} />
                        {t('delete')}
                    </MenuItem>
                </Menu>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <DialogTitle>{t('deleteSubject')}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            {t('confirmDeleteSubject', { name: selectedSubject?.name })}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDialogOpen(false)}>{t('cancel')}</Button>
                        <Button onClick={handleDeleteSubject} color="error" variant="contained">
                            {t('delete')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
}
