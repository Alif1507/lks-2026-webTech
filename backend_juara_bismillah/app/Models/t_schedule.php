<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class t_schedule extends Model
{
    protected $table = "t_schedules";
    protected $primaryKey = 'schedule_id';
    protected $fillable = [
        "doctor_id",
        "department_id",
        "schedule_date",
        "schedule_start",
        "schedule_end"
    ];

    public function doctor()
    {
        return $this->belongsTo(r_doctor::class, "doctor_id", "doctor_id");
    }

    public function department()
    {
        return $this->belongsTo(r_department::class, "department_id", "department_id");
    }
}
