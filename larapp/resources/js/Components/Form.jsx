import React from 'react';
import {
    TextField,
    FormControl,
    FormLabel,
    FormHelperText,
    Select,
    MenuItem,
    InputLabel,
    Autocomplete,
    Checkbox,
    FormControlLabel,
    RadioGroup,
    Radio,
    Switch,
    Slider,
    Rating,
    Box,
    Stack
} from '@mui/material';

/**
 * Enhanced TextField with consistent styling and validation
 */
export default function MuiTextField({
    label,
    error,
    helperText,
    required = false,
    fullWidth = true,
    margin = 'normal',
    variant = 'outlined',
    ...props
}) {
    return (
        <TextField
            label={label}
            error={!!error}
            helperText={helperText || error}
            required={required}
            fullWidth={fullWidth}
            margin={margin}
            variant={variant}
            {...props}
        />
    );
}

/**
 * Enhanced Select component
 */
export function MuiSelect({
    label,
    value,
    onChange,
    options = [],
    error,
    helperText,
    required = false,
    fullWidth = true,
    ...props
}) {
    return (
        <FormControl fullWidth={fullWidth} error={!!error} margin="normal" {...props}>
            <InputLabel required={required}>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {(helperText || error) && (
                <FormHelperText>{helperText || error}</FormHelperText>
            )}
        </FormControl>
    );
}

/**
 * Enhanced Autocomplete component
 */
export function MuiAutocomplete({
    label,
    options = [],
    value,
    onChange,
    error,
    helperText,
    required = false,
    fullWidth = true,
    multiple = false,
    ...props
}) {
    return (
        <Autocomplete
            options={options}
            value={value}
            onChange={onChange}
            multiple={multiple}
            fullWidth={fullWidth}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    error={!!error}
                    helperText={helperText || error}
                    required={required}
                    margin="normal"
                />
            )}
            {...props}
        />
    );
}

/**
 * Form section wrapper
 */
export function FormSection({ title, children, sx = {} }) {
    return (
        <Box sx={{ mb: 3, ...sx }}>
            {title && (
                <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600, fontSize: '1.1rem' }}>
                    {title}
                </FormLabel>
            )}
            <Stack spacing={2}>
                {children}
            </Stack>
        </Box>
    );
}

/**
 * Enhanced Checkbox with label
 */
export function MuiCheckbox({
    label,
    checked,
    onChange,
    color = 'primary',
    ...props
}) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    color={color}
                    {...props}
                />
            }
            label={label}
        />
    );
}

/**
 * Enhanced Radio Group
 */
export function MuiRadioGroup({
    label,
    value,
    onChange,
    options = [],
    row = false,
    error,
    helperText,
    ...props
}) {
    return (
        <FormControl component="fieldset" error={!!error} {...props}>
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <RadioGroup
                value={value}
                onChange={onChange}
                row={row}
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
            {(helperText || error) && (
                <FormHelperText>{helperText || error}</FormHelperText>
            )}
        </FormControl>
    );
}

/**
 * Enhanced Switch with label
 */
export function MuiSwitch({
    label,
    checked,
    onChange,
    color = 'primary',
    ...props
}) {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={onChange}
                    color={color}
                    {...props}
                />
            }
            label={label}
        />
    );
}
