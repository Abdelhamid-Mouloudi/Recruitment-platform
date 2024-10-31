package com.recruitmentapp.dto;

import lombok.Data;

@Data
public class SignupDTO {

    private String name;

    private String email;

    private String password;
    private String role;  // Ajout du champ rôle

}
