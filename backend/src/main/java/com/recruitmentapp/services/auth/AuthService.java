package com.recruitmentapp.services.auth;

import com.recruitmentapp.dto.EmployerDTO;
import com.recruitmentapp.dto.SignupDTO;
import com.recruitmentapp.dto.UserDTO;

public interface AuthService {
    UserDTO createUser(SignupDTO signupDTO);
    EmployerDTO createEmployer(SignupDTO signupDTO);
}
