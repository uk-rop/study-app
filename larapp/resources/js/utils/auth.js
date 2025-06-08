import { router } from '@inertiajs/react';

/**
 * Handle logout with proper error handling
 */
export const handleLogout = () => {
    router.post('/logout', {}, {
        onError: (errors) => {
            console.error('Logout failed:', errors);

            // If it's a CSRF error (419), try to logout via GET redirect as fallback
            if (errors?.status === 419 || Object.values(errors).some(error =>
                typeof error === 'string' && error.includes('419')
            )) {
                console.log('CSRF error detected, trying alternative logout method');
                // Redirect to logout route that handles GET requests
                window.location.href = '/logout-redirect';
            }
        },
        onFinish: () => {
            console.log('Logout request completed');
        }
    });
};

/**
 * Force logout by clearing session and redirecting
 */
export const forceLogout = () => {
    // Clear any local storage/session storage if used
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to home page
    window.location.href = '/';
};
