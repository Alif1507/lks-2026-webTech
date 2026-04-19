<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class r_doctor extends Model
{
    protected $table = "r_doctors";
    protected $primaryKey = 'doctor_id';
    public $incrementing = false;
    protected $fillable = [
        "doctor_id",
        "name",
        "gender",
        "phone_number",
        "address",
        "email",
        "bio"
    ];


    public function schedule()
    {
        return $this->hasMany(t_schedule::class, "doctor_id");
    }
}
