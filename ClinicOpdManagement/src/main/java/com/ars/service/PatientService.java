package com.ars.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ars.entiy.Patient;
import com.ars.repository.PatientRepository;

@Service
public class PatientService {
	@Autowired
    private PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient findById(Integer p_id) {
        return patientRepository.findById(p_id).orElse(null);
    }

    public Patient save(Patient patient) {
    	// Check if the email already exists in the database
        if (patientRepository.findByEmail(patient.getEmail()) != null) {
            throw new RuntimeException("Email is already registered");
        }
        return patientRepository.save(patient);
    }

    public void deleteById(Integer p_id) {
    	patientRepository.deleteById(p_id);
    }

	public List<Patient> findAll() {
		return patientRepository.findAll();
	}
	
	public Patient getPatientByEmail(String email){
		return patientRepository.findByEmail(email);
	}
	
	public boolean checkEmailExists(String email) {
        // Check if the email exists in the database
		Patient existingPatient = patientRepository.findByEmail(email);
        return existingPatient != null;
    }
}
