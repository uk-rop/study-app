import React from 'react';
import {
    Button,
    IconButton,
    Fab,
    ButtonGroup,
    ToggleButton,
    ToggleButtonGroup,
    LoadingButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Enhanced button with consistent styling
 */
export default function MuiButton({
    children,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    loading = false,
    gradient = false,
    rounded = false,
    shadow = false,
    ...props
}) {
    const StyledButton = styled(Button)(({ theme }) => ({
        ...(gradient && {
            background: `linear-gradient(45deg, ${theme.palette[color].main}, ${theme.palette[color].light})`,
            color: 'white',
            '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette[color].dark}, ${theme.palette[color].main})`,
            }
        }),
        ...(rounded && {
            borderRadius: theme.spacing(3)
        }),
        ...(shadow && {
            boxShadow: theme.shadows[4],
            '&:hover': {
                boxShadow: theme.shadows[8]
            }
        })
    }));

    if (loading) {
        return (
            <LoadingButton
                loading={loading}
                variant={variant}
                color={color}
                size={size}
                {...props}
            >
                {children}
            </LoadingButton>
        );
    }

    return (
        <StyledButton
            variant={variant}
            color={color}
            size={size}
            {...props}
        >
            {children}
        </StyledButton>
    );
}

/**
 * Floating Action Button with enhanced styling
 */
export function MuiFab({
    children,
    color = 'primary',
    size = 'large',
    position = 'fixed',
    bottom = 16,
    right = 16,
    ...props
}) {
    return (
        <Fab
            color={color}
            size={size}
            sx={{
                position,
                bottom,
                right,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)'
                }
            }}
            {...props}
        >
            {children}
        </Fab>
    );
}

/**
 * Icon button with enhanced styling
 */
export function MuiIconButton({
    children,
    color = 'primary',
    size = 'medium',
    variant = 'text',
    ...props
}) {
    return (
        <IconButton
            color={color}
            size={size}
            sx={{
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)',
                    backgroundColor: `${color}.50`
                }
            }}
            {...props}
        >
            {children}
        </IconButton>
    );
}

/**
 * Button group with consistent styling
 */
export function MuiButtonGroup({
    children,
    variant = 'contained',
    color = 'primary',
    orientation = 'horizontal',
    ...props
}) {
    return (
        <ButtonGroup
            variant={variant}
            color={color}
            orientation={orientation}
            {...props}
        >
            {children}
        </ButtonGroup>
    );
}
