<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'type',
        'due_date',
        'is_completed',
        'priority',
        'points',
        'subject_id',
        'user_id',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'due_date' => 'datetime',
        'points' => 'integer',
    ];

    /**
     * Get the subject that owns the assignment.
     */
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get the user that owns the assignment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the assignment type.
     */
    public function assignmentType()
    {
        return $this->belongsTo(AssignmentType::class, 'type', 'name')
            ->where('user_id', $this->user_id);
    }

    /**
     * Scope to get only completed assignments
     */
    public function scopeCompleted($query)
    {
        return $query->where('is_completed', true);
    }

    /**
     * Scope to get only pending assignments
     */
    public function scopePending($query)
    {
        return $query->where('is_completed', false);
    }

    /**
     * Scope to filter by type
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to filter by priority
     */
    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    /**
     * Scope to get assignments due soon (within next 7 days)
     */
    public function scopeDueSoon($query)
    {
        return $query->where('due_date', '<=', now()->addDays(7))
            ->where('due_date', '>=', now())
            ->where('is_completed', false);
    }

    /**
     * Scope to get overdue assignments
     */
    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now())
            ->where('is_completed', false);
    }

    /**
     * Get the priority color for UI display
     */
    public function getPriorityColorAttribute()
    {
        switch ($this->priority) {
            case 'high':
                return 'error';
            case 'medium':
                return 'warning';
            case 'low':
                return 'success';
            default:
                return 'default';
        }
    }

    /**
     * Get the type color for UI display
     */
    public function getTypeColorAttribute()
    {
        switch ($this->type) {
            case 'exam':
                return 'error';
            case 'quiz':
                return 'warning';
            case 'project':
                return 'info';
            case 'homework':
                return 'primary';
            case 'lab':
                return 'success';
            default:
                return 'default';
        }
    }

    /**
     * Check if assignment is overdue
     */
    public function getIsOverdueAttribute()
    {
        return $this->due_date < now() && !$this->is_completed;
    }

    /**
     * Check if assignment is due soon (within 3 days)
     */
    public function getIsDueSoonAttribute()
    {
        return $this->due_date <= now()->addDays(3) &&
            $this->due_date >= now() &&
            !$this->is_completed;
    }
}
