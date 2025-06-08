<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'teacher_name',
        'period_of_study',
        'credit_hours',
        'subject_code',
        'difficulty_level',
        'is_active',
        'user_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'credit_hours' => 'integer',
    ];

    /**
     * Get the user that owns the subject.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the assignments for the subject.
     */
    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    /**
     * Scope to get only active subjects
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to filter by difficulty level
     */
    public function scopeByDifficulty($query, $level)
    {
        return $query->where('difficulty_level', $level);
    }

    /**
     * Scope to filter by period of study
     */
    public function scopeByPeriod($query, $period)
    {
        return $query->where('period_of_study', $period);
    }
}
