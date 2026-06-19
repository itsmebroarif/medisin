<?php

namespace App\Repositories;

use App\Models\Visit;

class VisitRepository
{
    public function getAll()
    {
        return Visit::with('patient')->latest()->get();
    }

    public function findByPatientId($patientId)
    {
        return Visit::with('patient')->where('patient_id', $patientId)->latest()->get();
    }

    public function findById($id)
    {
        return Visit::with('patient')->findOrFail($id);
    }

    public function create(array $data)
    {
        return Visit::create($data);
    }
}
