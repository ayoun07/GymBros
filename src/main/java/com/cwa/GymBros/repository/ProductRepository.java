package com.cwa.GymBros.repository;

import java.lang.reflect.Type;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cwa.GymBros.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByType(Type type);
}
