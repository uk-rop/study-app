import React from 'react';
import { Head } from '@inertiajs/react';
import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Navbar from '../Components/Navbar';

export default function MuiLayout({ auth, title, children, maxWidth = 'lg' }) {
    const { t } = useTranslation();

    return (
        <>
            <Head title={title} />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar auth={auth} />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 3,
                        backgroundColor: 'background.default',
                    }}
                >
                    <Container maxWidth={maxWidth}>
                        {children}
                    </Container>
                </Box>
            </Box>
        </>
    );
}
