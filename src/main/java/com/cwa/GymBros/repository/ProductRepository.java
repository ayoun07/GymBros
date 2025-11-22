package com.cwa.GymBros.repository;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cwa.GymBros.model.Product;
import com.cwa.GymBros.model.Type;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    

    List<Product> findByType(Type type, Pageable pageable);
    List<Product> findByNameContainingIgnoreCase(String name);

    List<Product> findByNameIgnoreCase(String name);
    List<Product> findByNameStartingWithIgnoreCase(String name);
    @Query("SELECT p FROM Product p WHERE " +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> findByNameOrDescriptionContaining(@Param("keyword") String keyword);
    List<Product> findByType(Type type);

    @Query("SELECT p FROM Product p WHERE p.id != :productId")
    List<Product> findAllExcept(@Param("productId") Long productId);

    @Query("SELECT p FROM Product p WHERE p.type = :type AND p.id != :productId")
    List<Product> findByTypeExcept(@Param("type") Type type, @Param("productId") Long productId);
}