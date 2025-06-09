<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AssignmentType;
use App\Models\User;

class AssignmentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users to create default assignment types for each
        $users = User::all();

        $defaultTypes = [
            [
                'name' => 'homework',
                'label' => 'Homework',
                'color' => 'primary',
                'icon' => 'assignment',
                'sort_order' => 1,
            ],
            [
                'name' => 'project',
                'label' => 'Project',
                'color' => 'secondary',
                'icon' => 'folder',
                'sort_order' => 2,
            ],
            [
                'name' => 'exam',
                'label' => 'Exam',
                'color' => 'error',
                'icon' => 'quiz',
                'sort_order' => 3,
            ],
            [
                'name' => 'quiz',
                'label' => 'Quiz',
                'color' => 'warning',
                'icon' => 'help',
                'sort_order' => 4,
            ],
            [
                'name' => 'presentation',
                'label' => 'Presentation',
                'color' => 'info',
                'icon' => 'slideshow',
                'sort_order' => 5,
            ],
            [
                'name' => 'practice',
                'label' => 'Practice',
                'color' => 'info',
                'icon' => 'school',
                'sort_order' => 6,
            ],
            [
                'name' => 'lab',
                'label' => 'Lab',
                'color' => 'success',
                'icon' => 'science',
                'sort_order' => 6,
            ],
            [
                'name' => 'essay',
                'label' => 'Essay',
                'color' => 'primary',
                'icon' => 'create',
                'sort_order' => 7,
            ],
            [
                'name' => 'other',
                'label' => 'Other',
                'color' => 'default',
                'icon' => 'more_horiz',
                'sort_order' => 8,
            ],
        ];

        foreach ($users as $user) {
            foreach ($defaultTypes as $type) {
                AssignmentType::firstOrCreate(
                    [
                        'name' => $type['name'],
                        'user_id' => $user->id,
                    ],
                    [
                        'label' => $type['label'],
                        'color' => $type['color'],
                        'icon' => $type['icon'],
                        'sort_order' => $type['sort_order'],
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
