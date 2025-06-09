<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\AssignmentType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    /**
     * Display a listing of subjects.
     */
    public function index(Request $request)
    {
        $query = Subject::where('user_id', auth()->id());

        // Apply filters
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('subject_code', 'like', '%' . $request->search . '%')
                    ->orWhere('teacher_name', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('difficulty')) {
            $query->byDifficulty($request->difficulty);
        }

        if ($request->filled('period')) {
            $query->byPeriod($request->period);
        }

        if ($request->filled('status')) {
            if ($request->status === 'active') {
                $query->active();
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }

        $subjects = $query->withCount([
            'assignments',
            'assignments as completed_assignments_count' => function ($query) {
                $query->where('is_completed', true);
            },
            'assignments as pending_assignments_count' => function ($query) {
                $query->where('is_completed', false);
            },
            'assignments as overdue_assignments_count' => function ($query) {
                $query->where('is_completed', false)
                    ->where('due_date', '<', now());
            }
        ])
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Subjects/Index', [
            'subjects' => $subjects,
            'filters' => $request->only(['search', 'difficulty', 'period', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new subject.
     */
    public function create()
    {
        return Inertia::render('Subjects/Create');
    }

    /**
     * Store a newly created subject in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'teacher_name' => 'required|string|max:255',
            'period_of_study' => 'required|string|max:255',
            'credit_hours' => 'required|integer|min:1|max:10',
            'subject_code' => [
                'required',
                'string',
                'max:20',
                'unique:subjects,subject_code,NULL,id,user_id,' . auth()->id()
            ],
            'difficulty_level' => 'required|in:beginner,intermediate,advanced',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['user_id'] = auth()->id();

        Subject::create($validated);

        return redirect()->route('subjects.index')
            ->with('success', 'Subject created successfully!');
    }

    /**
     * Display the specified subject.
     */
    public function show(Subject $subject)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        // Get assignments with statistics
        $assignments = $subject->assignments()
            ->orderBy('due_date')
            ->orderBy('created_at', 'desc')
            ->get();

        // Calculate assignment statistics
        $assignmentStats = [
            'total' => $assignments->count(),
            'completed' => $assignments->where('is_completed', true)->count(),
            'pending' => $assignments->where('is_completed', false)->count(),
            'overdue' => $assignments->where('is_completed', false)
                ->where('due_date', '<', now())->count(),
        ];

        // Get assignment types for this user
        $assignmentTypes = AssignmentType::where('user_id', auth()->id())
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Subjects/Show', [
            'subject' => $subject,
            'assignments' => $assignments,
            'assignmentStats' => $assignmentStats,
            'assignmentTypes' => $assignmentTypes,
        ]);
    }

    /**
     * Show the form for editing the specified subject.
     */
    public function edit(Subject $subject)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        return Inertia::render('Subjects/Edit', [
            'subject' => $subject,
        ]);
    }

    /**
     * Update the specified subject in storage.
     */
    public function update(Request $request, Subject $subject)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'teacher_name' => 'required|string|max:255',
            'period_of_study' => 'required|string|max:255',
            'credit_hours' => 'required|integer|min:1|max:10',
            'subject_code' => [
                'required',
                'string',
                'max:20',
                'unique:subjects,subject_code,' . $subject->id . ',id,user_id,' . auth()->id()
            ],
            'difficulty_level' => 'required|in:beginner,intermediate,advanced',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        // dd($validated);
        $subject->update($validated);

        return redirect()->route('subjects.index')
            ->with('success', 'Subject updated successfully!');
    }

    /**
     * Remove the specified subject from storage.
     */
    public function destroy(Subject $subject)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        $subject->delete();

        return redirect()->route('subjects.index')
            ->with('success', 'Subject deleted successfully!');
    }

    /**
     * Toggle the active status of a subject.
     */
    public function toggleStatus(Subject $subject)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        $subject->update([
            'is_active' => !$subject->is_active
        ]);

        $status = $subject->is_active ? 'activated' : 'deactivated';

        return redirect()->back()
            ->with('success', "Subject {$status} successfully!");
    }
}
