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
        Schema::table('assignments', function (Blueprint $table) {
            // Change the type column from ENUM to string to allow dynamic assignment types
            $table->string('type')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assignments', function (Blueprint $table) {
            // Revert back to ENUM with the original values
            $table->enum('type', ['homework', 'project', 'exam', 'quiz', 'lab', 'presentation', 'essay', 'other'])->change();
        });
    }
};
