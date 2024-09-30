package com.recruitmentapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.entities.InternshipOffer;

import java.util.List;

public interface InternshipOfferRepository extends JpaRepository<InternshipOffer, Long> {
    List<InternshipOffer> findByEmployer(Employer employer);
}
