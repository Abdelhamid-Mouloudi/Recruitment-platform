package com.recruitmentapp.repositories;

import com.recruitmentapp.entities.JobOffer;
import com.recruitmentapp.entities.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {
    List<JobOffer> findByEmployer(Employer employer);
    List<JobOffer> findByTitleContainingOrDescriptionContaining(String title, String description);
}
