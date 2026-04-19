<?php

namespace App\Http\Controllers;

use App\Models\t_schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $size = (int) $request->query("size", 10);
        $page = (int) $request->query("page", 0);

        if ($page < 0 || $size < 1) {
            return response()->json([
                "message" => "invalid fields"
            ], 422);
        }

        $schedule = t_schedule::with(["doctor", "department"])->offset($page * $size)->limit($size)->get();

        $format = $schedule->map(function($s) {
            return [
                "scheduleID" => $s->schedule_id,
                "doctorID" => $s->doctor_id,
                "doctorName" => $s->doctor->name ?? null,
                "departmentID" => $s->department_id,
                "departmentName" => $s->department->department_name ?? null,
                "scheduleDate" => $s->schedule_date,
                "startTime" => $s->schedule_start,
                "endTime" => $s->schedule_end,
                "createdAt" => $s->created_at,
                "updatedAt" => $s->updated_at
            ];
        });
        return response()->json([
            "page" => $page,
            "size" => $size,
            "schedules" => $format
        ]);
    }

    private function validationData(Request $request) {
        return Validator::make($request->all(),[
            "doctorID" => "string|required|max:15",
            "departmentID" => "string|required|max:10",
            "date" => "date|required|after:today",
            "startTime" => "date_format:H:i|required",
            "endTime" => "date_format:H:i|required|after:startTime",
        ],[
            "doctorID.required" => "Doctor field is required.",
            "departmentID.required" => "Department field is required.",
            "date.required" => "Date field is required. | Minimal tomorrow",
            "date.after" => "Date field is required. | Minimal tomorrow",
            "startTime.required" => "Start Time field is required.",
            "endTime.required" => "End Time field is required.",
        ]);
    }

    private function overlapping ($doctor_id, $depamrtment_id, $date, $start, $end, $ignore_id = null) {
        $query = t_schedule::where("schedule_date", $date)->where(function($q) use($doctor_id, $depamrtment_id){
            $q->where("doctor_id", $doctor_id)->orWhere("department_id", $depamrtment_id);
        })->where(function($q) use($start, $end) {
            $q->where("schedule_start", "<", $end)->where("schedule_end", ">", $start);
        });

        if ($ignore_id) {
            $query->where("schedule_id", "!=", $ignore_id);
        }

        return $query->exists();
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $validatedData = $this->validationData($request);

       if ($validatedData->fails()) {
        return response()->json([
            "message" => "invalid fields",
            "errors" => $validatedData->errors()
        ], 422);
       }

       if ($this->overlapping($request->doctorID, $request->departmentID, $request->date, $request->startTime, $request->endTime)) {
        return response()->json([
            "message" => "invalid fileds",
            "erorrs" => [
                "time" => "schedule cannot overlapp with another schedule"
            ]
        ], 422);
       }

       t_schedule::create([
        "department_id" => $request->departmentID,
        "doctor_id" => $request->doctorID,
        "schedule_date" => $request->date,
        "schedule_start" => $request->startTime,
        "schedule_end" => $request->endTime,
       ]);

       return response()->json([
        "message" => "schedule created"
       ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       $schedule = t_schedule::find($id);

       if (!$schedule) {
        return response()->json([
            "message" => "schedule not found"
        ], 404);
       }

       $validatedData = $this->validationData($request);

       if ($validatedData->fails()) {
        return response()->json([
            "message" => "invalid fields",
            "errors" => $validatedData->errors()
        ], 422);
       }

       $today = Carbon::today()->format("Y-m-d");

       if ($schedule->schedule_date <= $today) {
            return response()->json([
                "message" => "schedule cannot be modified once the day has passed"
            ], 422);
       }

       if ($this->overlapping($request->doctorID, $request->departmentID, $request->date, $request->startTime, $request->endTime)) {
        return response()->json([
            "message" => "invalid fileds",
            "erorrs" => [
                "time" => "schedule cannot overlapp with another schedule"
            ]
        ], 422);
       }

        $schedule->update([
        "department_id" => $request->departmentID,
        "doctor_id" => $request->doctorID,
        "schedule_date" => $request->date,
        "schedule_start" => $request->startTime,
        "schedule_end" => $request->endTime,
       ]);

       return response()->json([
        "message" => "schedule modified"
       ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $schedule = t_schedule::find($id);

       if (!$schedule) {
        return response()->json([
            "message" => "schedule not found"
        ], 404);
       }

        $today = Carbon::today()->format("Y-m-d");

       if ($schedule->schedule_date <= $today) {
            return response()->json([
                "message" => "schedule cannot be modified once the day has passed"
            ], 422);
       }

        $schedule->delete();

        return response()->json([], 204);
       
    }
}
