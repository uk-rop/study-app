<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard
     */
    public function index()
    {
        $user = auth()->user();

        // Get user's subjects with assignment counts
        $subjects = $user->subjects()
            ->withCount(['assignments', 'assignments as completed_assignments_count' => function ($query) {
                $query->where('is_completed', true);
            }])
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Get recent assignments
        $recentAssignments = Assignment::where('user_id', $user->id)
            ->with('subject')
            ->orderBy('due_date', 'asc')
            ->take(5)
            ->get();

        // Get upcoming assignments (due soon)
        $upcomingAssignments = Assignment::where('user_id', $user->id)
            ->where('is_completed', false)
            ->where('due_date', '>=', now())
            ->where('due_date', '<=', now()->addDays(7))
            ->with('subject')
            ->orderBy('due_date', 'asc')
            ->get();

        // Calculate statistics
        $totalSubjects = $user->subjects()->count();
        $activeSubjects = $user->subjects()->where('is_active', true)->count();
        $totalAssignments = Assignment::where('user_id', $user->id)->count();
        $completedAssignments = Assignment::where('user_id', $user->id)->where('is_completed', true)->count();
        $pendingAssignments = $totalAssignments - $completedAssignments;
        $overdueAssignments = Assignment::where('user_id', $user->id)
            ->where('is_completed', false)
            ->where('due_date', '<', now())
            ->count();

        // dd($recentAssignments, $upcomingAssignments, $totalSubjects, $activeSubjects, $totalAssignments, $completedAssignments, $pendingAssignments, $overdueAssignments);

        return Inertia::render('Dashboard', [
            'subjects' => $subjects,
            'recentAssignments' => $recentAssignments,
            'upcomingAssignments' => $upcomingAssignments,
            'stats' => [
                'totalSubjects' => $totalSubjects,
                'activeSubjects' => $activeSubjects,
                'totalAssignments' => $totalAssignments,
                'completedAssignments' => $completedAssignments,
                'pendingAssignments' => $pendingAssignments,
                'overdueAssignments' => $overdueAssignments,
            ]
        ]);
    }
}
