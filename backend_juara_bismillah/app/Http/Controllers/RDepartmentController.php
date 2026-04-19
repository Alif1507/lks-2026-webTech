<?php

namespace App\Http\Controllers;

use App\Models\r_department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RDepartmentController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $size = (int) $request->query("size", 10);
    $page = (int) $request->query("page", 0);

    if ($size < 1 || $page < 0) {
      return response()->json([
        "message" => "Invalid field",
        "errors" => [
          "page" => "The page field must be at least 0.",
          "size" => "The size field must be a number."
        ]
      ]);
    }

    $department = r_department::with(["schedule.doctor"])->offset($page * $size)->limit($size)->get();

    $format = $department->map(function ($dept) {
      return [
        "departmentID" => $dept->department_id,
        "departmentName" => $dept->department_name,
        "departmentDesc" => $dept->department_description,
        "createdAt" => $dept->created_at,
        "updatedAt" => $dept->updated_at,
        "sechedules" => $dept->schedule->first()
      ];
    });

    return response()->json([
      "page" => $page,
      "size" => $size,
      "departments" => $format
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $validateData = Validator::make($request->all(), [
      "departmentID" => "string|required|unique:r_departments,department_id",
      "name" => "string|required",
      "description" => "nullable|string"
    ], [
      "departmentID.required" => "Department ID field is required.",
      "name.required" => "Department Name field is required."
    ]);

    if ($validateData->fails()) {
      return response()->json([
        "message" => "Invalid fields",
        "errors" => $validateData->errors()
      ], 422);
    }

    r_department::create([
      "department_id" => $request->departmentID,
      "department_name" => $request->name,
      "department_description" => $request->description
    ]);

    return response()->json([
      "message" => "Department created"
    ]);
  }

  public function show(string $id) {
  $department = r_department::find($id);

    if (!$department) {
      return response()->json([
        "message" => "Department not found"
      ], 404);
    }

  return response()->json([
    "message" => "get byID success",
    "department" => $department
  ]);
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    $department = r_department::find($id);

    if (!$department) {
      return response()->json([
        "message" => "Department not found"
      ], 404);
    }


    $validateData = Validator::make($request->all(), [
      "name" => "string|required",
      "description" => "nullable|string"
    ], [
      "name.required" => "Department Name field is required."
    ]);

    if ($validateData->fails()) {
      return response()->json([
        "message" => "Invalid fields",
        "errors" => $validateData->errors()
      ]);
    }

    $department->update([
      "department_name" => $request->name,
      "department_description" => $request->description
    ]);

    return response()->json([
      "message" => "Department modified"
    ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $department = r_department::find($id);

    if (!$department) {
      return response()->json([
        "message" => "Department not found"
      ], 404);
    }

    if ($department->schedule()->exists()) {
      return response()->json([
        "message" => "Department cannot deleted"
      ], 422);
    }

    $department->delete();

    return response()->json([
      "message" => "Department Deleted"
    ], 204);
  }
}
