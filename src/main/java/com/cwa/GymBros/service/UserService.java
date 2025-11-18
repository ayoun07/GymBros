package com.cwa.GymBros.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cwa.GymBros.dto.RegisterDTO;
import com.cwa.GymBros.dto.UserDTO;
import com.cwa.GymBros.model.User;
import com.cwa.GymBros.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapperService userMapperService;

    public UserDTO register(RegisterDTO request) {

        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setAdress(request.getAddress());
        user.setPhone(Integer.parseInt(request.getPhone()));
        user.setBirthdate(request.getBirthdate());
        user.setSex(request.getSex());
        user.setPassword(request.getPassword());
        user.setEnabled(false);
        user.setConfirmationToken(UUID.randomUUID().toString());

        User saved = userRepository.save(user);

        return userMapperService.toDTO(saved);
    }
    
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapperService.toDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapperService::toDTO)
                .toList();
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    public UserDTO updateUser(Long id, RegisterDTO request) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstname(request.getFirstname());
        user.setLastname(request.getLastname());
        user.setEmail(request.getEmail());
        user.setAdress(request.getAddress());
        user.setPhone(Integer.parseInt(request.getPhone()));
        user.setBirthdate(request.getBirthdate());
        user.setSex(request.getSex());
        user.setPassword(request.getPassword());

        User updated = userRepository.save(user);

        return userMapperService.toDTO(updated);
    }
}
