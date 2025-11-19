package com.cwa.GymBros.service;

import org.springframework.stereotype.Service;

import com.cwa.GymBros.dto.UserDTO;
import com.cwa.GymBros.model.User;


@Service
public class UserMapperService {

    public UserDTO toDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getFirstname(),
            user.getLastname(),
            user.getEmail(),
            user.getPhone(),
            user.getAdress(),  
            user.getSex()
        );
    }
}

