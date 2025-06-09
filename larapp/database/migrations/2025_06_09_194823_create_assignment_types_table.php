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
        Schema::create('assignment_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., 'homework', 'project', 'exam'
            $table->string('label'); // Display name e.g., 'Homework', 'Project', 'Exam'
            $table->string('color')->default('primary'); // Material-UI color: primary, secondary, error, warning, info, success
            $table->string('icon')->nullable(); // Optional icon name
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Per-user types
            $table->timestamps();

            // Ensure unique name per user
            $table->unique(['name', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignment_types');
    }
};
