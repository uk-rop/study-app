<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('subjects', function (Blueprint $table) {
            // Add user_id column first (nullable initially)
            $table->unsignedBigInteger('user_id')->nullable();
        });

        // Get or create a default user for existing subjects
        $defaultUser = \App\Models\User::first();
        if (!$defaultUser) {
            $defaultUser = \App\Models\User::create([
                'name' => 'Default User',
                'email' => 'default@example.com',
                'password' => bcrypt('password'),
            ]);
        }

        // Assign all existing subjects to the default user
        \App\Models\Subject::whereNull('user_id')->update(['user_id' => $defaultUser->id]);

        Schema::table('subjects', function (Blueprint $table) {
            // Now make user_id not nullable and add foreign key constraint
            $table->unsignedBigInteger('user_id')->nullable(false)->change();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Drop the existing unique constraint on subject_code
            $table->dropUnique(['subject_code']);

            // Add a unique constraint that combines user_id and subject_code
            $table->unique(['user_id', 'subject_code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subjects', function (Blueprint $table) {
            // Drop the combined unique constraint
            $table->dropUnique(['user_id', 'subject_code']);

            // Restore the original unique constraint on subject_code
            $table->unique('subject_code');

            // Drop the foreign key and user_id column
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
};
