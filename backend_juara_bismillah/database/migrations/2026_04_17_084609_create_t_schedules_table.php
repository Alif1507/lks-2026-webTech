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
        Schema::create('t_schedules', function (Blueprint $table) {
            $table->id("schedule_id");
            $table->string("doctor_id", 15);
            $table->string("department_id", 10);
            $table->date("schedule_date");
            $table->time("schedule_start");
            $table->time("schedule_end");

            $table->foreign("department_id")->references("department_id")->on("r_departments")->onDelete("restrict");
            $table->foreign("doctor_id")->references("doctor_id")->on("r_doctors")->onDelete("restrict");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_schedules');
    }
};
