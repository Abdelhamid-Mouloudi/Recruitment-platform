package com.recruitmentapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.entities.User;

public interface EmployerRepository extends JpaRepository<Employer,Long> {
    //Employer findFirstByEmail(String email);
    Employer findFirstByContactEmail(String contactEmail);
}
