package com.ars.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ars.entiy.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer>{
	Patient findByEmail(String email);
	Patient findById(int p_id);

}

