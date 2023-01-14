<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OwesPayment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'requested_amount',
        'for_ticket_id',
        'payer_id',
    ];

    public function forTicket()
    {
        return $this->belongsTo(Ticket::class, 'for_ticket_id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'for_owes_payment_id');
    }

    public function payer()
    {
        return $this->belongsTo(User::class, 'payer_id');
    }
}
