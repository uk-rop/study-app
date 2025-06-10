import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    Stack,
    LinearProgress,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Alert
} from '@mui/material';
import {
    School as SchoolIcon,
    Assignment as AssignmentIcon,
    CheckCircle as CheckCircleIcon,
    Schedule as ScheduleIcon,
    Warning as WarningIcon,
    TrendingUp as TrendingUpIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link } from '@inertiajs/react';
import Layout from '../Layouts/Layout';

export default function MuiDashboard({ auth, subjects = [], recentAssignments = [], upcomingAssignments = [], stats }) {
    const { t } = useTranslation();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isOverdue = (dueDate) => {
        return new Date(dueDate) < new Date();
    };

    const getChipColor = (dueDate, isCompleted) => {
        if (isCompleted) return 'success';
        if (isOverdue(dueDate)) return 'error';
        return 'warning';
    };

    const getChipLabel = (dueDate, isCompleted) => {
        if (isCompleted) return t('completed');
        if (isOverdue(dueDate)) return t('overdue');
        return t('pending');
    };

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

                {/* Statistics Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={<SchoolIcon />}
                            title={t('dashboardKeys.totalSubjects')}
                            value={stats?.totalSubjects || 0}
                            subtitle={`${stats?.activeSubjects || 0} ${t('dashboardKeys.activeSubjects')}`}
                            color="primary"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={<AssignmentIcon />}
                            title={t('dashboardKeys.totalAssignments')}
                            value={stats?.totalAssignments || 0}
                            subtitle={`${stats?.pendingAssignments || 0} ${t('dashboardKeys.pendingAssignments')}`}
                            color="info"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={<CheckCircleIcon />}
                            title={t('dashboardKeys.completedAssignments')}
                            value={stats?.completedAssignments || 0}
                            subtitle={`${Math.round(((stats?.completedAssignments || 0) / (stats?.totalAssignments || 1)) * 100)}% ${t('dashboardKeys.completionRate')}`}
                            color="success"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatsCard
                            icon={<WarningIcon />}
                            title={t('dashboardKeys.overdueAssignments')}
                            value={stats?.overdueAssignments || 0}
                            subtitle={t('dashboardKeys.needAttention')}
                            color="error"
                        />
                    </Grid>
                </Grid>

                {/* Quick Actions */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {t('dashboardKeys.quickActions')}
                                </Typography>
                                <Stack spacing={2}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        component={Link}
                                        href="/subjects/create"
                                        size="large"
                                    >
                                        {t('dashboardKeys.addNewSubject')}
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<SchoolIcon />}
                                        component={Link}
                                        href="/subjects"
                                        size="large"
                                    >
                                        {t('dashboardKeys.viewAllSubjects')}
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {t('dashboardKeys.completionProgress')}
                                </Typography>
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {t('dashboardKeys.overallAssignmentCompletion')}
                                    </Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        value={Math.round(((stats?.completedAssignments || 0) / (stats?.totalAssignments || 1)) * 100)}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            backgroundColor: 'grey.200',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: 'success.main'
                                            }
                                        }}
                                    />
                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {Math.round(((stats?.completedAssignments || 0) / (stats?.totalAssignments || 1)) * 100)}% {t('dashboardKeys.complete')}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Main Content */}
                <Grid container spacing={3}>
                    {/* Recent Subjects */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {t('dashboardKeys.recentSubjects')}
                                </Typography>
                                {subjects.length > 0 ? (
                                    <Stack spacing={2} sx={{ mt: 2 }}>
                                        {subjects.map((subject) => (
                                            <SubjectItem
                                                key={subject.id}
                                                subject={subject}
                                            />
                                        ))}
                                        <Button
                                            variant="text"
                                            component={Link}
                                            href="/subjects"
                                            sx={{ mt: 2 }}
                                        >
                                            {t('dashboardKeys.viewAllSubjects')}
                                        </Button>
                                    </Stack>
                                ) : (
                                    <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50', mt: 2 }}>
                                        <SchoolIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary" gutterBottom>
                                            {t('dashboardKeys.noSubjectsYet')}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                            {t('dashboardKeys.createFirstSubject')}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            startIcon={<AddIcon />}
                                            component={Link}
                                            href="/subjects/create"
                                        >
                                            {t('dashboardKeys.createFirstSubjectButton')}
                                        </Button>
                                    </Paper>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Upcoming Assignments */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    {t('dashboardKeys.upcomingAssignments')}
                                </Typography>
                                {upcomingAssignments.length > 0 ? (
                                    <Stack spacing={2} sx={{ mt: 2 }}>
                                        {upcomingAssignments.map((assignment) => (
                                            <AssignmentItem
                                                key={assignment.id}
                                                assignment={assignment}
                                                formatDate={formatDate}
                                                getChipColor={getChipColor}
                                                getChipLabel={getChipLabel}
                                            />
                                        ))}
                                    </Stack>
                                ) : (
                                    <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50', mt: 2 }}>
                                        <AssignmentIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary" gutterBottom>
                                            {t('dashboardKeys.noUpcomingAssignments')}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {t('dashboardKeys.allCaughtUp')}
                                        </Typography>
                                    </Paper>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Recent Assignments Table */}
                {recentAssignments.length > 0 && (
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                {t('dashboardKeys.recentAssignments')}
                            </Typography>
                            <TableContainer component={Paper} sx={{ mt: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{t('assignment')}</TableCell>
                                            <TableCell>{t('subjects')}</TableCell>
                                            <TableCell>{t('dueDate')}</TableCell>
                                            <TableCell>{t('status')}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentAssignments.map((assignment) => (
                                            <TableRow key={assignment.id} hover>
                                                <TableCell>
                                                    <Typography variant="subtitle2" fontWeight={500}>
                                                        {assignment.name}
                                                    </Typography>
                                                    {assignment.description && (
                                                        <Typography variant="body2" color="text.secondary" noWrap>
                                                            {assignment.description.substring(0, 60)}
                                                            {assignment.description.length > 60 && '...'}
                                                        </Typography>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={assignment.subject?.name}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {formatDate(assignment.due_date)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={getChipLabel(assignment.due_date, assignment.is_completed)}
                                                        color={getChipColor(assignment.due_date, assignment.is_completed)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Layout>
    );
}

function StatsCard({ icon, title, value, subtitle, color = 'primary' }) {
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
                        <Typography variant="h4" fontWeight={600} gutterBottom>
                            {value}
                        </Typography>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {subtitle}
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

function SubjectItem({ subject }) {
    const { t } = useTranslation();
    const completionPercentage = subject.assignments_count > 0
        ? Math.round((subject.completed_assignments_count / subject.assignments_count) * 100)
        : 0;

    return (
        <Card sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                        {subject.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {subject.subject_code} • {subject.assignments_count} {t('dashboardKeys.assignments')}
                    </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                        label={subject.is_active ? t('active') : t('inactive')}
                        color={subject.is_active ? 'success' : 'default'}
                        size="small"
                    />
                    <Button
                        variant="outlined"
                        size="small"
                        component={Link}
                        href={`/subjects/${subject.id}`}
                    >
                        {t('dashboardKeys.view')}
                    </Button>
                </Stack>
            </Stack>
            {subject.assignments_count > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        {t('dashboardKeys.progress')}: {subject.completed_assignments_count}/{subject.assignments_count} {t('dashboardKeys.assignments')}
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={completionPercentage}
                        sx={{
                            height: 4,
                            borderRadius: 2,
                            mt: 0.5
                        }}
                    />
                </Box>
            )}
        </Card>
    );
}

function AssignmentItem({ assignment, formatDate, getChipColor, getChipLabel }) {
    const { t } = useTranslation();

    return (
        <Box>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        width: 40,
                        height: 40
                    }}
                >
                    <AssignmentIcon />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                        {assignment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {assignment.subject?.name}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            {t('dashboardKeys.due')}: {formatDate(assignment.due_date)}
                        </Typography>
                        <Chip
                            label={getChipLabel(assignment.due_date, assignment.is_completed)}
                            color={getChipColor(assignment.due_date, assignment.is_completed)}
                            size="small"
                        />
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}
