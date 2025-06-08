<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $availableLocales = ['en', 'uk'];
        $defaultLocale = 'en';

        // Check for locale in session first
        $locale = session('locale');

        // If not in session, check browser language
        if (!$locale) {
            $locale = $request->getPreferredLanguage($availableLocales) ?? $defaultLocale;
        }

        // Ensure locale is valid
        if (!in_array($locale, $availableLocales)) {
            $locale = $defaultLocale;
        }

        // Set the application locale
        app()->setLocale($locale);

        // Store in session for persistence
        session(['locale' => $locale]);

        return $next($request);
    }
}
