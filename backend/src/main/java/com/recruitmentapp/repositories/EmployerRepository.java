package com.recruitmentapp.repositories;

import com.recruitmentapp.entities.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepository extends JpaRepository<Employer,Long> {
    //Employer findFirstByEmail(String email);
    Employer findFirstByContactEmail(String contactEmail);
}
