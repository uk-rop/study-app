<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\AssignmentType;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    /**
     * Display a listing of assignments for a specific subject.
     */
    public function index(Subject $subject)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        $assignments = $subject->assignments()
            ->orderBy('due_date')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $assignmentTypes = AssignmentType::where('user_id', auth()->id())
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Assignments/Index', [
            'subject' => $subject,
            'assignments' => $assignments,
            'assignmentTypes' => $assignmentTypes,
        ]);
    }

    /**
     * Show the form for creating a new assignment.
     */
    public function create(Subject $subject)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        $assignmentTypes = AssignmentType::where('user_id', auth()->id())
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Assignments/Create', [
            'subject' => $subject,
            'assignmentTypes' => $assignmentTypes,
        ]);
    }

    /**
     * Store a newly created assignment in storage.
     */
    public function store(Request $request, Subject $subject)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        // Get valid assignment types for this user
        $validTypes = AssignmentType::where('user_id', auth()->id())
            ->where('is_active', true)
            ->pluck('name')
            ->toArray();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:' . implode(',', $validTypes),
            'due_date' => 'required|date',
            'points' => 'nullable|integer|min:0|max:1000',
            'is_completed' => 'boolean',
        ]);

        $validated['is_completed'] = $request->boolean('is_completed', false);
        $validated['subject_id'] = $subject->id;
        $validated['user_id'] = auth()->id();

        Assignment::create($validated);

        return redirect()->route('subjects.assignments.index', $subject)
            ->with('success', 'Assignment created successfully!');
    }

    /**
     * Display the specified assignment.
     */
    public function show(Subject $subject, Assignment $assignment)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        // Ensure the assignment belongs to the subject
        if ($assignment->subject_id !== $subject->id) {
            abort(404, 'Assignment not found for this subject.');
        }

        return Inertia::render('Assignments/Show', [
            'subject' => $subject,
            'assignment' => $assignment,
        ]);
    }

    /**
     * Show the form for editing the specified assignment.
     */
    public function edit(Subject $subject, Assignment $assignment)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        // Ensure the assignment belongs to the subject
        if ($assignment->subject_id !== $subject->id) {
            abort(404, 'Assignment not found for this subject.');
        }

        $assignmentTypes = AssignmentType::where('user_id', auth()->id())
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Assignments/Edit', [
            'subject' => $subject,
            'assignment' => $assignment,
            'assignmentTypes' => $assignmentTypes,
        ]);
    }

    /**
     * Update the specified assignment in storage.
     */
    public function update(Request $request, Subject $subject, Assignment $assignment)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        // Ensure the assignment belongs to the subject
        if ($assignment->subject_id !== $subject->id) {
            abort(404, 'Assignment not found for this subject.');
        }

        // Get valid assignment types for this user
        $validTypes = AssignmentType::where('user_id', auth()->id())
            ->where('is_active', true)
            ->pluck('name')
            ->toArray();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:' . implode(',', $validTypes),
            'due_date' => 'required|date',
            'points' => 'nullable|integer|min:0|max:1000',
            'is_completed' => 'boolean',
        ]);

        $validated['is_completed'] = $request->boolean('is_completed', false);

        $assignment->update($validated);

        return redirect()->route('subjects.assignments.index', $subject)
            ->with('success', 'Assignment updated successfully!');
    }

    /**
     * Remove the specified assignment from storage.
     */
    public function destroy(Subject $subject, Assignment $assignment)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        // Ensure the assignment belongs to the subject
        if ($assignment->subject_id !== $subject->id) {
            abort(404, 'Assignment not found for this subject.');
        }

        $assignment->delete();

        return redirect()->route('subjects.assignments.index', $subject)
            ->with('success', 'Assignment deleted successfully!');
    }

    /**
     * Toggle the completion status of an assignment.
     */
    public function toggleComplete(Subject $subject, Assignment $assignment)
    {
        // Ensure the subject belongs to the authenticated user
        if ($subject->user_id !== auth()->id()) {
            abort(403, 'Unauthorized access to this subject.');
        }

        // Ensure the assignment belongs to the subject
        if ($assignment->subject_id !== $subject->id) {
            abort(404, 'Assignment not found for this subject.');
        }

        $assignment->update([
            'is_completed' => !$assignment->is_completed
        ]);

        $status = $assignment->is_completed ? 'completed' : 'marked as incomplete';

        return redirect()->back()
            ->with('success', "Assignment {$status} successfully!");
    }
}
