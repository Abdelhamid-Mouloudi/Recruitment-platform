package com.recruitmentapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.recruitmentapp.dto.EmployerDTO;
import com.recruitmentapp.dto.SignupDTO;
import com.recruitmentapp.dto.UserDTO;
import com.recruitmentapp.services.auth.AuthService;

@RestController
public class SignupController {

    @Autowired
    private AuthService authService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupDTO signupDTO) {
        if ("EMPLOYER".equals(signupDTO.getRole())) {
            EmployerDTO createdEmployer = authService.createEmployer(signupDTO);
            return new ResponseEntity<>(createdEmployer, HttpStatus.CREATED);
        } else {
            UserDTO createdUser = authService.createUser(signupDTO);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        }
    }

}
