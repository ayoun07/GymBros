package com.cwa.GymBros.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cwa.GymBros.model.Product;
import com.cwa.GymBros.model.Type;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByType(Type type, Pageable pageable);
}
