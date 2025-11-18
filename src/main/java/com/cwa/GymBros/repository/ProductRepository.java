package com.cwa.GymBros.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cwa.GymBros.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
}
