<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appartment extends Model
{
    use HasFactory, HasUuids;

    protected $appends = [
        'residents',
    ];

    public function residents()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the columns that should receive a unique identifier.
     *
     * @return array
     */
    public function uniqueIds()
    {
        return ['uuid'];
    }

    public function getResidentsAttribute()
    {
        return $this->residents()->get();
    }
}
