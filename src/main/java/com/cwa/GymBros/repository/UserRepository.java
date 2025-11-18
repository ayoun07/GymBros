package com.cwa.GymBros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cwa.GymBros.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
}
