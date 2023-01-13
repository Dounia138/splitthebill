<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'amount',
        'for_owes_payment_id',
        'payer_id',
    ];

    public function payer()
    {
        return $this->belongsTo(User::class, 'payer_id');
    }

    public function owesPayment()
    {
        return $this->belongsTo(OwesPayment::class, 'for_owes_payment_id');
    }
}
