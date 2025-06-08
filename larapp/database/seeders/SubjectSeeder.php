<?php

namespace Database\Seeders;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user or create one if none exists
        $user = User::first();
        if (!$user) {
            $user = User::create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        $subjects = [
            [
                'name' => 'Introduction to Computer Science',
                'description' => 'An introduction to the field of computer science, covering fundamental concepts of programming, algorithms, and data structures. Students will learn basic programming concepts using modern programming languages.',
                'teacher_name' => 'Dr. Sarah Johnson',
                'period_of_study' => 'Fall 2024',
                'credit_hours' => 3,
                'subject_code' => 'CS101',
                'difficulty_level' => 'beginner',
                'is_active' => true,
            ],
            [
                'name' => 'Data Structures and Algorithms',
                'description' => 'Advanced study of data structures including trees, graphs, hash tables, and their applications. Analysis of algorithm efficiency and complexity theory.',
                'teacher_name' => 'Prof. Michael Chen',
                'period_of_study' => 'Spring 2025',
                'credit_hours' => 4,
                'subject_code' => 'CS201',
                'difficulty_level' => 'intermediate',
                'is_active' => true,
            ],
            [
                'name' => 'Database Systems',
                'description' => 'Comprehensive study of database design, implementation, and management. Covers relational database theory, SQL, normalization, and modern database technologies.',
                'teacher_name' => 'Dr. Emily Rodriguez',
                'period_of_study' => 'Fall 2024',
                'credit_hours' => 3,
                'subject_code' => 'CS301',
                'difficulty_level' => 'intermediate',
                'is_active' => true,
            ],
            [
                'name' => 'Machine Learning',
                'description' => 'Introduction to machine learning algorithms and their applications. Covers supervised and unsupervised learning, neural networks, and deep learning concepts.',
                'teacher_name' => 'Dr. Alexander Kim',
                'period_of_study' => 'Spring 2025',
                'credit_hours' => 4,
                'subject_code' => 'CS401',
                'difficulty_level' => 'advanced',
                'is_active' => true,
            ],
            [
                'name' => 'Calculus I',
                'description' => 'Fundamental concepts of differential and integral calculus. Limits, derivatives, applications of derivatives, and basic integration techniques.',
                'teacher_name' => 'Prof. David Thompson',
                'period_of_study' => 'Fall 2024',
                'credit_hours' => 4,
                'subject_code' => 'MATH101',
                'difficulty_level' => 'intermediate',
                'is_active' => true,
            ],
            [
                'name' => 'Linear Algebra',
                'description' => 'Vector spaces, matrix operations, eigenvalues and eigenvectors, linear transformations, and applications to computer science and engineering.',
                'teacher_name' => 'Dr. Maria Garcia',
                'period_of_study' => 'Spring 2025',
                'credit_hours' => 3,
                'subject_code' => 'MATH201',
                'difficulty_level' => 'intermediate',
                'is_active' => true,
            ],
            [
                'name' => 'Physics I: Mechanics',
                'description' => 'Classical mechanics including kinematics, dynamics, energy, momentum, rotational motion, and oscillations. Laboratory component included.',
                'teacher_name' => 'Prof. Robert Wilson',
                'period_of_study' => 'Fall 2024',
                'credit_hours' => 4,
                'subject_code' => 'PHYS101',
                'difficulty_level' => 'intermediate',
                'is_active' => true,
            ],
            [
                'name' => 'Web Development',
                'description' => 'Modern web development techniques using HTML5, CSS3, JavaScript, and popular frameworks. Full-stack development including backend APIs and database integration.',
                'teacher_name' => 'Ms. Jennifer Lee',
                'period_of_study' => 'Summer 2025',
                'credit_hours' => 3,
                'subject_code' => 'WEB201',
                'difficulty_level' => 'beginner',
                'is_active' => true,
            ],
            [
                'name' => 'Software Engineering',
                'description' => 'Principles and practices of software development including requirements analysis, system design, testing, and project management methodologies.',
                'teacher_name' => 'Dr. James Anderson',
                'period_of_study' => 'Spring 2025',
                'credit_hours' => 3,
                'subject_code' => 'SE301',
                'difficulty_level' => 'advanced',
                'is_active' => false, // This one is inactive for demo
            ],
            [
                'name' => 'English Composition',
                'description' => 'Development of writing skills through practice in various forms of composition. Emphasis on critical thinking, research methods, and academic writing.',
                'teacher_name' => 'Prof. Lisa Brown',
                'period_of_study' => 'Fall 2024',
                'credit_hours' => 3,
                'subject_code' => 'ENG101',
                'difficulty_level' => 'beginner',
                'is_active' => true,
            ],
        ];

        foreach ($subjects as $subject) {
            $subject['user_id'] = $user->id;
            Subject::create($subject);
        }
    }
}
