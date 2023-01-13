<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'amount',
        'creator_id',
        'expiration_date',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function owesPayment()
    {
        return $this->hasMany(Ticket::class, 'for_ticket_id', 'id');
    }
}
