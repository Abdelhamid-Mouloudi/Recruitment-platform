package com.recruitmentapp.repositories;

import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.entities.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByEmployer(Employer employer);

}
