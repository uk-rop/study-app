<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LocalizationController extends Controller
{
    /**
     * Display the localization demo page
     */
    public function demo()
    {
        return Inertia::render('LocalizationDemo', [
            'currentLocale' => app()->getLocale(),
            'availableLocales' => ['en', 'uk'],
            'messages' => [
                'serverMessage' => __('messages.welcome'),
                'currentTime' => now()->format('Y-m-d H:i:s'),
            ]
        ]);
    }

    /**
     * Switch the application locale
     */
    public function switchLocale(Request $request, $locale)
    {
        $availableLocales = ['en', 'uk'];

        if (in_array($locale, $availableLocales)) {
            session(['locale' => $locale]);
            app()->setLocale($locale);
        }

        return back()->with('success', __('messages.language_changed'));
    }

    /**
     * Get translation data for the frontend
     */
    public function getTranslations(Request $request)
    {
        $locale = $request->get('locale', app()->getLocale());

        if (!in_array($locale, ['en', 'uk'])) {
            $locale = 'en';
        }

        // Load Laravel translations for the frontend
        $translations = include resource_path("lang/{$locale}/messages.php");

        return response()->json([
            'locale' => $locale,
            'translations' => $translations
        ]);
    }
}
