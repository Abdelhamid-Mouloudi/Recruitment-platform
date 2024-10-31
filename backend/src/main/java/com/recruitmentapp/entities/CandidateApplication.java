package com.recruitmentapp.entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "applications")
@Data
public class CandidateApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private int age;
    private String motivationLetter;
    private String aiRank;

    // Pour stocker le CV PDF sous forme de chemin vers un fichier
    private String cvPath;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "offer_id")
    private Offer offer;

    // Vous pouvez ajouter d'autres champs selon vos besoins
}
