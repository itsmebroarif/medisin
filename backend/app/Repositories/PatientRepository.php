<?php

namespace App\Repositories;

use App\Models\Patient;

class PatientRepository
{
    public function getAll(){
        return Patient::latest()->get();
    }

    public function findById($id){
        return Patient::findOrFail($id);
    }

    public function findByMedicalRecordNumber($mrNumber){
        return Patient::where('medical_record_number', $mrNumber)->first();
    }

    public function create(array $data){
        return Patient::create($data);
    }

    public function getLastMedicalRecordNumber(){
        return Patient::latest('id')->value('medical_record_number');
    }

    public function nikExists($nik){
        foreach (Patient::select('id', 'nik')->cursor() as $patient) {
            if ($patient->nik === $nik) {
                return true;
            }
        }
        return false;
    }

    public function emailExists($email){
        foreach (Patient::select('id', 'email')->cursor() as $patient) {
            if ($patient->email === $email) {
                return true;
            }
        }
        return false;
    }
}
