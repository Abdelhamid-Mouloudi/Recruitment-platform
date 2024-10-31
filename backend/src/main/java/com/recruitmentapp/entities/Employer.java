package com.recruitmentapp.entities;



import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "employers")
@Data
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String password;

    private String name;

    private String contactEmail;

    // Relation entre l'employeur et les offres
    @OneToMany(mappedBy = "employer")
    @JsonManagedReference
    private List<Offer> offers;


}

