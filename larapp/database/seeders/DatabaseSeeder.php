<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Seed assignment types (must be after users)
        $this->call(AssignmentTypeSeeder::class);

        // Seed subjects
        $this->call(SubjectSeeder::class);

        // Seed assignments (must be after subjects and assignment types)
        $this->call(AssignmentSeeder::class);
    }
}
