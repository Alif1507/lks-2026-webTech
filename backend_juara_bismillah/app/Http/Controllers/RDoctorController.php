<?php

namespace App\Http\Controllers;

use App\Models\r_doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RDoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $size = $request->query("size", 10);
        $page = $request->query("page", 0);

        if ($size < 1 || $page < 0) {
            return response()->json([
                "message" => "Invalid field",
                "errors" => [
                    "page" => "The page field must be at least 0.",
                    "size" => "The size field must be a number."
                ]
            ]);
        }

        $doctor = r_doctor::with(["schedule.department"])->offset($size * $page)->limit($size)->get();

        $format = $doctor->map(function($doc){
            return [
            "doctorID" => $doc->doctor_id,
            "doctorName" => $doc->name,
            "gender" => $doc->gender,
            "phone" => $doc->phone_number,
            "address" => $doc->address,
            "email" => $doc->email,
            "bio" => $doc->bio,
            "createdAt" => $doc->created_at,
            "updatedAt" => $doc->updated_at,
            "schedules" => $doc->schedule->first()
            ];
        });

        return response()->json([
            "page" => $page,
            "size" => $size,
            "doctors" => $format
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            "doctorID" => "string|max:15|required|unique:r_doctors,doctor_id",
            "name" => "string|required",
            "gender" => "in:M,F,Male,Female,male,female|required",
            "phone" => "string|required",
            "address" => "string|required",
            "email" => "string|required",
            "bio" => "nullable|string",
        ],[
            "doctorID.required" => "Doctor ID field is required.",
            "name.required" => "Name field is required.",
            "gender.in" => "Gender field is required. | and must be F or M",
            "gender.required" => "Gender field is required. | and must be F or M",
            "phone.required" => "Phone field is required.",
            "address.required" => "address field is required.",
            "email.required" => "email field is required.",
        ]);


        if ($validateData->fails()) {
            return response()->json([
                "message" => "Invalid field",
                "errors" => $validateData->errors()
            ], 422);
        }


        r_doctor::create([
            "doctor_id" => $request->doctorID,
            "name" => $request->name,
            "gender" => $request->gender,
            "phone_number" => $request->phone,
            "address" => $request->address,
            "email" => $request->email,
            "bio" => $request->bio
        ]);

        return response()->json([
            "message" => "Doctor created"
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $doctor = r_doctor::find($id);

        if (!$doctor) {
            return response()->json([
                "message" => "doctor not found",
            ], 404);
        }

        $validateData = Validator::make($request->all(), [
            "name" => "string|required",
            "gender" => "in:M,F,male,female,Male,Female|required",
            "phone" => "string|required",
            "address" => "string|required",
            "email" => "string|required",
            "bio" => "nullable|string",
        ],[
            "name.required" => "Name field is required.",
            "gender.in" => "Gender field is required. | and must be F or M",
            "gender.required" => "Gender field is required. | and must be F or M",
            "phone.required" => "Phone field is required.",
            "address.required" => "address field is required.",
            "email.required" => "email field is required.",
        ]);


        if ($validateData->fails()) {
            return response()->json([
                "message" => "Invalid field",
                "errors" => $validateData->errors()
            ], 422);
        }


        $doctor->update([
            "name" => $request->name,
            "gender" => $request->gender,
            "phone_number" => $request->phone,
            "address" => $request->address,
            "email" => $request->email,
            "bio" => $request->bio
        ]);

        return response()->json([
            "message" => "Doctor modified"
        ]);
    }

    public function show (string $id) {
        $doctor = r_doctor::find($id);

        if (!$doctor) {
            return response()->json([
                "message" => "doctor not found",
            ], 404);
        }

        return response()->json([
            "data" => $doctor
        ]);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $doctor = r_doctor::find($id);

        if (!$doctor) {
            return response()->json([
                "message" => "doctor not found",
            ], 404);
        }

        if ($doctor->schedule()->exists()) {
            return response()->json([
                "message" => "Doctor cannot deleted"
            ], 422);
        }

        $doctor->delete();

        return response()->json([
            "message" => "doctor succsess deleted"
        ], 204 );
    }
}
