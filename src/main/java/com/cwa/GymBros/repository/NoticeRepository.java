package com.cwa.GymBros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cwa.GymBros.model.Notice;
import com.cwa.GymBros.model.Product;
import com.cwa.GymBros.model.User;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
        // Récupérer les notices d’un produit
    List<Notice> findByProduct(Product product);

    // Récupérer les notices d’un user
    List<Notice> findByUser(User user);

    // Récupérer toutes les notices d’un produit via son ID
    List<Notice> findByProductId(Long productId);

    // Récupérer toutes les notices d’un user via son ID
    List<Notice> findByUserId(Long userId);
}
