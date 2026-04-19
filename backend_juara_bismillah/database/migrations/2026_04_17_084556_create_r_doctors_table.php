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
        Schema::create('r_doctors', function (Blueprint $table) {
            $table->string("doctor_id", 15)->primary();
            $table->string("name");
            $table->enum("gender", ["Male", "Female", "M", "F"]);
            $table->string("phone_number");
            $table->string("address");
            $table->string("email");
            $table->text("bio"); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('r_doctors');
    }
};
