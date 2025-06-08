<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Subject;
use Illuminate\Database\Seeder;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all subjects to assign assignments to
        $subjects = Subject::all();

        if ($subjects->isEmpty()) {
            $this->command->info('No subjects found. Please run SubjectSeeder first.');
            return;
        }

        $assignments = [
            // Computer Science assignments
            [
                'name' => 'Hello World Program',
                'description' => 'Write your first program that displays "Hello, World!" to the console. Practice basic syntax and understand program structure.',
                'type' => 'programming',
                'due_date' => now()->addDays(7),
                'priority' => 'medium',
                'estimated_hours' => 2,
                'is_completed' => true,
                'completion_percentage' => 100,
                'subject_code' => 'CS101',
            ],
            [
                'name' => 'Algorithm Analysis Report',
                'description' => 'Write a comprehensive report analyzing the time and space complexity of sorting algorithms including bubble sort, merge sort, and quick sort.',
                'type' => 'research',
                'due_date' => now()->addDays(14),
                'priority' => 'high',
                'estimated_hours' => 8,
                'is_completed' => false,
                'completion_percentage' => 25,
                'subject_code' => 'CS201',
            ],
            [
                'name' => 'Database Design Project',
                'description' => 'Design and implement a complete database system for a library management system including ER diagrams, normalization, and SQL queries.',
                'type' => 'project',
                'due_date' => now()->addDays(21),
                'priority' => 'high',
                'estimated_hours' => 15,
                'is_completed' => false,
                'completion_percentage' => 40,
                'subject_code' => 'CS301',
            ],
            [
                'name' => 'Machine Learning Model Implementation',
                'description' => 'Implement a neural network from scratch using Python and NumPy. Train the model on the MNIST dataset and achieve at least 90% accuracy.',
                'type' => 'project',
                'due_date' => now()->addDays(28),
                'priority' => 'high',
                'estimated_hours' => 20,
                'is_completed' => false,
                'completion_percentage' => 10,
                'subject_code' => 'CS401',
            ],

            // Mathematics assignments
            [
                'name' => 'Derivative Calculations',
                'description' => 'Complete problem set covering differentiation rules, chain rule, and applications of derivatives including optimization problems.',
                'type' => 'homework',
                'due_date' => now()->addDays(5),
                'priority' => 'medium',
                'estimated_hours' => 3,
                'is_completed' => true,
                'completion_percentage' => 100,
                'subject_code' => 'MATH101',
            ],
            [
                'name' => 'Linear Transformation Project',
                'description' => 'Explore linear transformations in 2D and 3D space. Create visualizations and write proofs for key properties.',
                'type' => 'project',
                'due_date' => now()->addDays(18),
                'priority' => 'medium',
                'estimated_hours' => 6,
                'is_completed' => false,
                'completion_percentage' => 60,
                'subject_code' => 'MATH201',
            ],

            // Physics assignments
            [
                'name' => 'Projectile Motion Lab Report',
                'description' => 'Analyze experimental data from projectile motion experiments. Calculate theoretical values and compare with measured results.',
                'type' => 'lab',
                'due_date' => now()->addDays(10),
                'priority' => 'medium',
                'estimated_hours' => 4,
                'is_completed' => false,
                'completion_percentage' => 75,
                'subject_code' => 'PHYS101',
            ],

            // Web Development assignments
            [
                'name' => 'Responsive Portfolio Website',
                'description' => 'Create a personal portfolio website using HTML5, CSS3, and JavaScript. Must be fully responsive and include interactive elements.',
                'type' => 'project',
                'due_date' => now()->addDays(14),
                'priority' => 'high',
                'estimated_hours' => 12,
                'is_completed' => false,
                'completion_percentage' => 30,
                'subject_code' => 'WEB201',
            ],

            // Software Engineering assignments
            [
                'name' => 'Software Requirements Document',
                'description' => 'Create a comprehensive Software Requirements Specification (SRS) document for a proposed mobile application.',
                'type' => 'documentation',
                'due_date' => now()->addDays(12),
                'priority' => 'high',
                'estimated_hours' => 10,
                'is_completed' => false,
                'completion_percentage' => 50,
                'subject_code' => 'SE301',
            ],

            // English assignments
            [
                'name' => 'Argumentative Essay',
                'description' => 'Write a 1500-word argumentative essay on a contemporary social issue. Include proper citations and follow MLA format.',
                'type' => 'essay',
                'due_date' => now()->addDays(8),
                'priority' => 'medium',
                'estimated_hours' => 5,
                'is_completed' => true,
                'completion_percentage' => 100,
                'subject_code' => 'ENG101',
            ],
        ];

        foreach ($assignments as $assignmentData) {
            // Find the subject by subject_code
            $subject = $subjects->where('subject_code', $assignmentData['subject_code'])->first();

            if ($subject) {
                // Remove subject_code from assignment data and add subject_id
                unset($assignmentData['subject_code']);
                $assignmentData['subject_id'] = $subject->id;
                $assignmentData['user_id'] = $subject->user_id; // Inherit user from subject

                Assignment::create($assignmentData);
            }
        }

        $this->command->info('AssignmentSeeder completed successfully!');
    }
}
