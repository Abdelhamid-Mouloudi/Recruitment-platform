package com.recruitmentapp.services.auth;

import com.recruitmentapp.dto.EmployerDTO;
import com.recruitmentapp.dto.SignupDTO;
import com.recruitmentapp.dto.UserDTO;
import com.recruitmentapp.entities.Employer;
import com.recruitmentapp.entities.User;
import com.recruitmentapp.repositories.EmployerRepository;
import com.recruitmentapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmployerRepository employerRepository;

    @Override
    public UserDTO createUser(SignupDTO signupDTO) {
        User user = new User();
        user.setName(signupDTO.getName());
        user.setEmail(signupDTO.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));
        User createdUser = userRepository.save(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setId(createdUser.getId());
        userDTO.setEmail(createdUser.getEmail());
        userDTO.setName(createdUser.getName());
        return userDTO;
    }

    @Override
    public EmployerDTO createEmployer(SignupDTO signupDTO) {
        Employer employer = new Employer();
        employer.setContactEmail(signupDTO.getEmail());
        employer.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));

        // Sauvegarde de l'employeur sans le nom de la société
        Employer createdEmployer = employerRepository.save(employer);

        // Création d'un DTO pour renvoyer les détails de l'employeur
        EmployerDTO employerDTO = new EmployerDTO();
        employerDTO.setId(createdEmployer.getId());
        employerDTO.setContactEmail(createdEmployer.getContactEmail());

        return employerDTO;
    }


}
