package com.cwa.GymBros.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.cwa.GymBros.model.Notice;
import com.cwa.GymBros.service.NoticeService;

@RestController
@RequestMapping("/notices")
public class NoticeController {

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    // CREATE
    @PostMapping
    public Notice createNotice(@RequestBody Notice notice) {
        return noticeService.createNotice(notice);
    }

    // GET ALL
    @GetMapping
    public List<Notice> getAllNotices() {
        return noticeService.getAllNotices();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Notice getNoticeById(@PathVariable Long id) {
        return noticeService.getNoticeById(id);
    }

    // GET BY PRODUCT
    @GetMapping("/product/{productId}")
    public List<Notice> getNoticesByProduct(@PathVariable Long productId) {
        return noticeService.getNoticesByProduct(productId);
    }

    // GET BY USER
    @GetMapping("/user/{userId}")
    public List<Notice> getNoticesByUser(@PathVariable Long userId) {
        return noticeService.getNoticesByUser(userId);
    }

    // GET AVERAGE RATING FOR PRODUCT
    @GetMapping("/product/{productId}/average")
    public double getProductAverageRating(@PathVariable Long productId) {
        return noticeService.getAverageRatingByProduct(productId);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Notice updateNotice(
        @PathVariable Long id,
        @RequestBody Notice notice
    ) {
        return noticeService.updateNotice(id, notice);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
    }
}
