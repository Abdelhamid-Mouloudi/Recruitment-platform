package com.recruitmentapp.repositories;

import com.recruitmentapp.entities.InternshipOffer;
import com.recruitmentapp.entities.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipOfferRepository extends JpaRepository<InternshipOffer, Long> {
    List<InternshipOffer> findByEmployer(Employer employer);
    List<InternshipOffer> findByTitleContainingOrDescriptionContaining(String title, String description);
}
