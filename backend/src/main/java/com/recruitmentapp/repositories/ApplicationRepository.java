package com.recruitmentapp.repositories;

import com.recruitmentapp.entities.CandidateApplication;
import com.recruitmentapp.entities.Offer;
import com.recruitmentapp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<CandidateApplication, Long> {
    List<CandidateApplication> findByUser(User user);
    List<CandidateApplication> findByOfferIn(List<Offer> offers);
}
