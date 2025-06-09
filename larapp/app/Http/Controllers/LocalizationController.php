<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\File;

class LocalizationController extends Controller
{
    /**
     * Switch the application locale
     */
    public function switchLocale(Request $request, $locale)
    {
        if (in_array($locale, ['en', 'uk'])) {
            App::setLocale($locale);
            Session::put('locale', $locale);
        }

        return redirect()->back();
    }

    /**
     * Get translations for the frontend
     */
    public function getTranslations(Request $request)
    {
        $locale = $request->get('locale', App::getLocale());

        if (!in_array($locale, ['en', 'uk'])) {
            $locale = 'en';
        }

        $translationPath = public_path("locales/{$locale}/translation.json");

        if (File::exists($translationPath)) {
            $translations = json_decode(File::get($translationPath), true);
            return response()->json($translations);
        }

        return response()->json([]);
    }
}
