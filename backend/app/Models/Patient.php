<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Patient extends Model
{
    protected $fillable = [
        'medical_record_number',
        'nik',
        'full_name',
        'date_of_birth',
        'gender',
        'phone_number',
        'email',
        'address',
    ];

    public function setNikAttribute($value)
    {
        $this->attributes['nik'] = Crypt::encryptString($value);
    }

    public function getNikAttribute($value)
    {
        return $value ? Crypt::decryptString($value) : null;
    }

    public function setEmailAttribute($value)
    {
        $this->attributes['email'] = Crypt::encryptString($value);
    }

    public function getEmailAttribute($value)
    {
        return $value ? Crypt::decryptString($value) : null;
    }
}
