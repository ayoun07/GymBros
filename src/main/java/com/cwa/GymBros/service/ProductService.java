package com.cwa.GymBros.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cwa.GymBros.model.Product;
import com.cwa.GymBros.model.Type;
import com.cwa.GymBros.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // CREATE
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // READ ALL
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Map<Type, List<Product>> getLimitedProductsByType(int limit) {
        Map<Type, List<Product>> result = new HashMap<>();

        // Parcours tous les types de l’enum
        for (Type type : Type.values()) {
            Pageable pageable = PageRequest.of(0, limit);
            List<Product> products = productRepository.findByType(type, pageable);
            result.put(type, products);
        }

        return result;
    }

    // READ BY ID
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // UPDATE
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = getProductById(id);

        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setPrice(updatedProduct.getPrice());
        existing.setStock(updatedProduct.getStock());
        existing.setType(updatedProduct.getType());
        existing.setImageUrls(updatedProduct.getImageUrls());

        return productRepository.save(existing);
    }

    // DELETE
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete: product not found with id " + id);
        }
        productRepository.deleteById(id);
    }
}
