package com.recruitmentapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.entities.JobOffer;

import java.util.List;

public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
    List<JobOffer> findByEmployer(Employer employer);
}
