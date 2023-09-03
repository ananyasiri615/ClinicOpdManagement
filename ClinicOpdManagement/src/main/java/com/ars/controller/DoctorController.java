package com.ars.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ars.entiy.Doctor;
import com.ars.service.DoctorService;

@RestController
@RequestMapping("/doctors")
public class DoctorController {
	
	@Autowired
    private DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/all")
    public List<Doctor> getAllDoctors() {
        return doctorService.findAll();
    }

    @GetMapping("/id/{doc_id}")
    public Doctor getDoctorById(@PathVariable Integer doc_id) {
        return doctorService.findById(doc_id);
    }

    @PostMapping("/create")
    public Doctor createDoctor(@RequestBody Doctor doctor) {
        return doctorService.save(doctor);
    }

    @PutMapping("/update/{doc_id}")
    public Doctor updateDoctor(@PathVariable Integer doc_id, @RequestBody Doctor doctor) {
        doctor.setDoc_id(doc_id);
        return doctorService.save(doctor);
    }

    @DeleteMapping("/delete/{doc_id}")
    public void delete(@PathVariable Integer doc_id) {
		Doctor doctor = doctorService.findById(doc_id);
        if (doctor != null) {
        	doctorService.deleteById(doc_id);
        }
    }

}