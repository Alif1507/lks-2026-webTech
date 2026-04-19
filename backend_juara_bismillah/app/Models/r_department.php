<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class r_department extends Model
{
    protected $table = "r_departments";
    protected $primaryKey = 'department_id';
    public $incrementing = false;
    protected $fillable = [
        'department_id',
        "department_name",
        "department_description"
    ];

    public function schedule()
    {
        return $this->hasMany(t_schedule::class, "department_id");
    }
}
