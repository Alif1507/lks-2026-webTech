<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\RDepartmentController;
use App\Http\Controllers\RDoctorController;
use App\Http\Controllers\TScheduleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix("/v1")->group(function () {
    Route::apiResource("/department", RDepartmentController::class)->middleware("auth:sanctum");
    Route::apiResource("/doctor", RDoctorController::class)->middleware("auth:sanctum");
    Route::apiResource("/schedule", TScheduleController::class)->middleware("auth:sanctum");
    Route::prefix("/auth")->group(function() {
        Route::post("/login", [AuthController::class, "login"]);
        Route::post("/logout", [AuthController::class, "logout"])->middleware("auth:sanctum");
        Route::get("/me", [AuthController::class, "me"])->middleware("auth:sanctum");
    });
});
