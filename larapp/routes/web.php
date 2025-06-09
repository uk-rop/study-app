<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\LocalizationController;
use Inertia\Inertia;

// Main Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'laravelVersion' => app()->version(),
        'phpVersion' => PHP_VERSION,
    ]);
});

// Localization Routes
Route::post('/locale/{locale}', [LocalizationController::class, 'switchLocale'])->name('locale.switch');
Route::get('/api/translations', [LocalizationController::class, 'getTranslations'])->name('api.translations');

// Authentication Routes
Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Protected Routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Subject Management Routes
    Route::resource('subjects', SubjectController::class);
    Route::patch('/subjects/{subject}/toggle-status', [SubjectController::class, 'toggleStatus'])
        ->name('subjects.toggle-status');

    // Assignment Management Routes (nested under subjects)
    Route::resource('subjects.assignments', AssignmentController::class);
    Route::patch('/subjects/{subject}/assignments/{assignment}/toggle-complete', [AssignmentController::class, 'toggleComplete'])
        ->name('subjects.assignments.toggle-complete');
});
