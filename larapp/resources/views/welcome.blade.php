@extends('layouts.app')

@section('title', 'Welcome')

@section('content')
<div class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <!-- Logo/Title -->
        <div class="mb-8 sm:mb-12 lg:mb-16">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Welcome to Laravel
            </h1>
            <p class="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                A powerful web application framework with elegant syntax
            </p>
        </div>

        <!-- Authentication Links -->
        <div class="space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-16">
            @if (Route::has('login'))
                @auth
                    <!-- User is authenticated -->
                    <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 sm:p-6 max-w-md mx-auto">
                        <p class="text-green-800 dark:text-green-400 mb-3 sm:mb-4 text-sm sm:text-base">
                            Welcome back, {{ Auth::user()->name }}!
                        </p>
                        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <a href="{{ route('dashboard') }}"
                               class="inline-flex justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                Go to Dashboard
                            </a>
                            <form action="{{ route('logout') }}" method="POST" class="inline">
                                @csrf
                                <button type="submit"
                                        class="w-full sm:w-auto inline-flex justify-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 text-sm sm:text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                @else
                    <!-- User is not authenticated -->
                    <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-none mx-auto">
                        <a href="{{ route('login') }}"
                           class="inline-flex justify-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-sm sm:text-base lg:text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                            Sign In
                        </a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}"
                               class="inline-flex justify-center px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 dark:border-gray-600 text-sm sm:text-base lg:text-lg font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                                Sign Up
                            </a>
                        @endif
                    </div>
                @endauth
            @endif
        </div>

        <!-- Features Section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-16">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 transition-colors duration-300 hover:shadow-lg transform hover:-translate-y-1 transition-all">
                <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Fast & Secure</h3>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Built with modern security practices and optimized for performance.</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 transition-colors duration-300 hover:shadow-lg transform hover:-translate-y-1 transition-all">
                <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                    </svg>
                </div>
                <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Authentication</h3>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Complete user authentication system with secure session management.</p>
            </div>

            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 transition-colors duration-300 hover:shadow-lg transform hover:-translate-y-1 transition-all sm:col-span-2 lg:col-span-1">
                <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                    <svg class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                    </svg>
                </div>
                <h3 class="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Responsive Design</h3>
                <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Beautiful UI that works seamlessly across all devices and screen sizes.</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})
            </p>
        </div>
    </div>
</div>
@endsection
