package com.recruitmentapp.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "offers")
@Data
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Date postedDate;

    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false)
    @JsonBackReference  // Ignore cette relation lors de la sérialisation
    private Employer employer;
}

