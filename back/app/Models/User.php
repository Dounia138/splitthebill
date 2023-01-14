<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<int, string>
     */
    protected $casts = [
        'is_admin' => 'boolean',
    ];

    /**
     * The attributes that should be appended.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'tickets',
        'payments',
        'owes_payments',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function appartment()
    {
        return $this->belongsTo(Appartment::class, 'appartment_id', 'id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'creator_id', 'id');
    }

    public function payments()
    {
        return $this->hasMany(Payment::class, 'payer_id', 'id');
    }

    public function owesPayments()
    {
        return $this->hasMany(OwesPayment::class, 'payer_id', 'id');
    }

    public function getTicketsAttribute()
    {
        return $this->tickets()->get();
    }

    public function getPaymentsAttribute()
    {
        return $this->payments()->get();
    }

    public function getOwesPaymentsAttribute()
    {
        return $this->owesPayments()->get();
    }
}
