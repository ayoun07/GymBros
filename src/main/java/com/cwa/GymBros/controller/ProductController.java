package com.cwa.GymBros.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.cwa.GymBros.model.Product;
import com.cwa.GymBros.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // CREATE
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // GET ALL
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/limited")
    public List<Product> getLimitedProducts(@RequestParam(defaultValue = "4") int limit) {
        return productService.getFirstProducts(limit);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
