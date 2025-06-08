import React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Avatar,
    Typography,
    Box,
    Stack
} from '@mui/material';

/**
 * A reusable MUI Card component with consistent styling
 */
export default function MuiCard({
    title,
    subtitle,
    icon,
    iconColor = 'primary',
    children,
    actions,
    hover = true,
    elevation = 2,
    sx = {},
    ...props
}) {
    return (
        <Card
            elevation={elevation}
            sx={{
                transition: 'all 0.3s ease-in-out',
                ...(hover && {
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                    }
                }),
                ...sx
            }}
            {...props}
        >
            {(title || subtitle || icon) && (
                <CardHeader
                    avatar={
                        icon && (
                            <Avatar
                                sx={{
                                    bgcolor: `${iconColor}.main`,
                                    color: 'white'
                                }}
                            >
                                {icon}
                            </Avatar>
                        )
                    }
                    title={title}
                    subheader={subtitle}
                    titleTypographyProps={{
                        variant: 'h6',
                        fontWeight: 600
                    }}
                />
            )}
            {children && (
                <CardContent>
                    {children}
                </CardContent>
            )}
            {actions && (
                <CardActions>
                    {actions}
                </CardActions>
            )}
        </Card>
    );
}

/**
 * A feature card component for displaying features or services
 */
export function FeatureCard({ icon, title, description, color = 'primary', ...props }) {
    return (
        <MuiCard hover {...props}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                    sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: `${color}.main`,
                        color: 'white'
                    }}
                >
                    {icon}
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {description}
                </Typography>
            </CardContent>
        </MuiCard>
    );
}

/**
 * A stats card for displaying metrics
 */
export function StatsCard({ title, value, subtitle, icon, color = 'primary', trend, ...props }) {
    return (
        <MuiCard hover {...props}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h4" fontWeight={600} color={`${color}.main`}>
                            {value}
                        </Typography>
                        {subtitle && (
                            <Typography variant="body2" color="text.secondary">
                                {subtitle}
                            </Typography>
                        )}
                        {trend && (
                            <Typography
                                variant="caption"
                                color={trend > 0 ? 'success.main' : 'error.main'}
                                sx={{ mt: 1, display: 'block' }}
                            >
                                {trend > 0 ? '+' : ''}{trend}%
                            </Typography>
                        )}
                    </Box>
                    {icon && (
                        <Avatar
                            sx={{
                                bgcolor: `${color}.light`,
                                color: `${color}.main`,
                                width: 48,
                                height: 48
                            }}
                        >
                            {icon}
                        </Avatar>
                    )}
                </Stack>
            </CardContent>
        </MuiCard>
    );
}
