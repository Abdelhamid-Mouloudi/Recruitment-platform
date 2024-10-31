package com.recruitmentapp.controllers;

import com.recruitmentapp.entities.JobOffer;
import com.recruitmentapp.entities.InternshipOffer;
import com.recruitmentapp.repositories.JobOfferRepository;
import com.recruitmentapp.repositories.InternshipOfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class OfferSearchController {

    @Autowired
    private JobOfferRepository jobOfferRepository;

    @Autowired
    private InternshipOfferRepository internshipOfferRepository;

    // Recherche des offres par mot-clé
    @GetMapping("/search")
    public List<Object> searchOffers(@RequestParam("keyword") String keyword) {
        List<Object> results = new ArrayList<>();

        // Recherche des offres d'emploi et de stage par titre ou description
        List<JobOffer> jobOffers = jobOfferRepository.findByTitleContainingOrDescriptionContaining(keyword, keyword);
        List<InternshipOffer> internshipOffers = internshipOfferRepository.findByTitleContainingOrDescriptionContaining(keyword, keyword);

        results.addAll(jobOffers);
        results.addAll(internshipOffers);

        return results;
    }
}
