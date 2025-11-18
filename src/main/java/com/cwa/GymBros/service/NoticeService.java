package com.cwa.GymBros.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cwa.GymBros.model.Notice;
import com.cwa.GymBros.model.Product;
import com.cwa.GymBros.model.User;
import com.cwa.GymBros.repository.NoticeRepository;
import com.cwa.GymBros.repository.ProductRepository;
import com.cwa.GymBros.repository.UserRepository;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public NoticeService(
        NoticeRepository noticeRepository,
        ProductRepository productRepository,
        UserRepository userRepository
    ) {
        this.noticeRepository = noticeRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // CREATE
    public Notice createNotice(Notice notice) {

        // Vérifie que le user existe
        Long userId = notice.getUser().getId();
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Vérifie que le produit existe
        Long productId = notice.getProduct().getId();
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));

        notice.setUser(user);
        notice.setProduct(product);

        return noticeRepository.save(notice);
    }

    // GET ALL
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    // GET BY ID
    public Notice getNoticeById(Long id) {
        return noticeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Notice not found with id: " + id));
    }

    // GET BY PRODUCT
    public List<Notice> getNoticesByProduct(Long productId) {
        return noticeRepository.findByProductId(productId);
    }

    // GET BY USER
    public List<Notice> getNoticesByUser(Long userId) {
        return noticeRepository.findByUserId(userId);
    }

    // UPDATE
    public Notice updateNotice(Long id, Notice updated) {
        Notice existing = getNoticeById(id);

        existing.setRating(updated.getRating());
        existing.setTitle(updated.getTitle());

        return noticeRepository.save(existing);
    }

    // DELETE
    public void deleteNotice(Long id) {
        if (!noticeRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete: notice not found with id " + id);
        }
        noticeRepository.deleteById(id);
    }

    // CALCUL MOYENNE DES NOTES D'UN PRODUIT
    public double getAverageRatingByProduct(Long productId) {
        List<Notice> notices = noticeRepository.findByProductId(productId);

        if (notices.isEmpty()) return 0.0;

        return notices.stream()
            .mapToInt(Notice::getRating)
            .average()
            .orElse(0.0);
    }
}
