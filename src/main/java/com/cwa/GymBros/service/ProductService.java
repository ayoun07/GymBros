package com.cwa.GymBros.service;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cwa.GymBros.model.Product;
import com.cwa.GymBros.model.Type;
import com.cwa.GymBros.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import org.apache.commons.text.similarity.FuzzyScore;
import org.apache.commons.text.similarity.LevenshteinDistance;

@Service
public class ProductService {


    private final ProductRepository productRepository;
    private final FuzzyScore fuzzyScore;
    private final LevenshteinDistance levenshteinDistance;

    private static final int MAX_SIMILAR_PRODUCTS = 6;
    
    private static final int MIN_SIMILARITY_SCORE = 3;
    
    // Plus bas = plus de résultats
    private static final int MIN_FUZZY_SCORE = 5;

    // Nombre de fautes tolérées  
    private static final int MAX_LEVENSHTEIN_DISTANCE = 3; 

    // Nombre max de résultats
    private static final int MAX_RESULTS = 10;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
        this.fuzzyScore = new FuzzyScore(Locale.FRENCH);
        this.levenshteinDistance = new LevenshteinDistance(MAX_LEVENSHTEIN_DISTANCE);
    }

    public List<Product> searchProductByName(String searchTerm) {
        return smartSearch(searchTerm);
    }


     // Recherche multi-niveaux avec Apache Commons Text
    public List<Product> smartSearch(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return new ArrayList<>();
        }

        String cleanSearch = searchTerm.trim().toLowerCase();

        // recherche exacte
        List<Product> exactMatches = productRepository.findByNameIgnoreCase(cleanSearch);
        if (!exactMatches.isEmpty()) {
            return exactMatches;
        }

        // commence par la valeur
        List<Product> startsWithMatches = productRepository.findByNameStartingWithIgnoreCase(cleanSearch);
        if (!startsWithMatches.isEmpty()) {
            return startsWithMatches.stream()
                .limit(MAX_RESULTS)
                .collect(Collectors.toList());
        }

        // contient dans nom ou description
        List<Product> containsMatches = productRepository.findByNameOrDescriptionContaining(cleanSearch);
        if (!containsMatches.isEmpty()) {
            return containsMatches.stream()
                .limit(MAX_RESULTS)
                .collect(Collectors.toList());
        }

        // recherche floue (fautes de frappe)
        List<ProductWithScore> scoredProducts = findSimilarProducts(cleanSearch);
        
        if (!scoredProducts.isEmpty()) {
            return scoredProducts.stream()
                .sorted((a, b) -> Integer.compare(b.score, a.score))
                .limit(MAX_RESULTS)
                .map(ps -> ps.product)
                .collect(Collectors.toList());
        }

        // suggérer des produits du même type si rien trouvé
        Type guessedType = guessTypeFromSearch(cleanSearch);
        if (guessedType != null) {
            return productRepository.findByType(guessedType).stream()
                .limit(5)
                .collect(Collectors.toList());
        }

        return new ArrayList<>();
    }

     // Trouve des produits similaires avec FuzzyScore et Levenshtein
    private List<ProductWithScore> findSimilarProducts(String searchTerm) {
        List<Product> allProducts = productRepository.findAll();
        List<ProductWithScore> scoredProducts = new ArrayList<>();
        
        for (Product product : allProducts) {
            String productName = product.getName().toLowerCase();
            

            // Plus le score est élevé, plus c'est pertinent
            int fuzzyScoreValue = fuzzyScore.fuzzyScore(productName, searchTerm);
            
            // Plus la distance est faible, plus c'est similaire
            Integer levDistance = levenshteinDistance.apply(productName, searchTerm);
            
            // Calculer le score combiné
            int combinedScore = 0;
            
            if (fuzzyScoreValue >= MIN_FUZZY_SCORE) {
                combinedScore += fuzzyScoreValue;
            }
            
            if (levDistance != null && levDistance <= MAX_LEVENSHTEIN_DISTANCE) {
                combinedScore += (MAX_LEVENSHTEIN_DISTANCE - levDistance) * 10;
            }
            
            if (productName.contains(searchTerm)) {
                combinedScore += 20;
            }
            
            // ajouter à la liste si le score est pertinent
            if (combinedScore > 0) {
                scoredProducts.add(new ProductWithScore(product, combinedScore));
            }
        }
        
        return scoredProducts;
    }


     // Devine le type de produit à partir de mots-clés
    private Type guessTypeFromSearch(String search) {
        String lower = search.toLowerCase();
        
        // NUTRITION
        String[] nutritionKeywords = {
            "protéine", "protein", "whey", "créatine", "creatine",
            "bcaa", "vitamine", "vitamin", "supplément", "supplement",
            "shake", "mass", "gainer", "isolat", "caseine"
        };
        
        for (String keyword : nutritionKeywords) {
            if (lower.contains(keyword)) {
                return Type.NUTRITION;
            }
        }
        
        // VETEMENT
        String[] vetementKeywords = {
            "t-shirt", "tshirt", "short", "legging", "vêtement", "vetement",
            "pantalon", "débardeur", "debardeur", "hoodie", "sweat",
            "chaussure", "basket", "jogging", "brassière", "brassiere"
        };
        
        for (String keyword : vetementKeywords) {
            if (lower.contains(keyword)) {
                return Type.VETEMENT;
            }
        }
        
        return null;
    }

    private static class ProductWithScore {
        Product product;
        int score;

        ProductWithScore(Product product, int score) {
            this.product = product;
            this.score = score;
        }
    }

    public List<Product> findSimilarProducts(Long productId) {
    Product referenceProduct = getProductById(productId);
    List<Product> allProducts = productRepository.findAllExcept(productId);
    List<ProductSimilarityScore> scoredProducts = new ArrayList<>();
    
    for (Product product : allProducts) {
        int similarityScore = calculateSimilarityScore(referenceProduct, product);
        
        if (similarityScore > MIN_SIMILARITY_SCORE) {
            scoredProducts.add(new ProductSimilarityScore(product, similarityScore));
        }
    }
    
    return scoredProducts.stream()
        .sorted((a, b) -> Integer.compare(b.score, a.score))
        .limit(MAX_SIMILAR_PRODUCTS)
        .map(ps -> ps.product)
        .collect(Collectors.toList());
}

private int calculateSimilarityScore(Product reference, Product candidate) {
    int totalScore = 0;
    
    // score
    if (reference.getType() != null && reference.getType().equals(candidate.getType())) {
        totalScore += 50;
    }
    
    // nom similaire
    if (reference.getName() != null && candidate.getName() != null) {
        String refName = reference.getName().toLowerCase();
        String candName = candidate.getName().toLowerCase();
        
        int nameFuzzyScore = fuzzyScore.fuzzyScore(refName, candName);
        totalScore += Math.min(nameFuzzyScore, 30);
        
        // Mots-clés communs
        String[] refWords = refName.split("\\s+");
        String[] candWords = candName.split("\\s+");
        int commonWords = 0;
        
        for (String refWord : refWords) {
            for (String candWord : candWords) {
                if (refWord.length() > 3 && candWord.length() > 3) {
                    Integer levDistance = levenshteinDistance.apply(refWord, candWord);
                    if (levDistance != null && levDistance <= 1) {
                        commonWords++;
                    }
                }
            }
        }
        totalScore += commonWords * 10;
    }
    
    // prix similaire
    if (reference.getPrice() != null && candidate.getPrice() != null) {
        BigDecimal refPrice = reference.getPrice();
        BigDecimal candPrice = candidate.getPrice();
        
        BigDecimal priceDiff = refPrice.subtract(candPrice).abs();
        BigDecimal percentageDiff = priceDiff.divide(refPrice, 2, BigDecimal.ROUND_HALF_UP)
                                              .multiply(BigDecimal.valueOf(100));
        
        if (percentageDiff.compareTo(BigDecimal.valueOf(10)) < 0) {
            totalScore += 20;
        } else if (percentageDiff.compareTo(BigDecimal.valueOf(30)) < 0) {
            totalScore += 10;
        } else if (percentageDiff.compareTo(BigDecimal.valueOf(50)) < 0) {
            totalScore += 5;
        }
    }
    
    // Similarité de la description
    if (reference.getDescription() != null && candidate.getDescription() != null) {
        String refDesc = reference.getDescription().toLowerCase();
        String candDesc = candidate.getDescription().toLowerCase();
        
        int descFuzzyScore = fuzzyScore.fuzzyScore(refDesc, candDesc);
        totalScore += Math.min(descFuzzyScore / 10, 15);
    }
    
    return totalScore;
}

private static class ProductSimilarityScore {
    Product product;
    int score;

    ProductSimilarityScore(Product product, int score) {
        this.product = product;
        this.score = score;
    }
}

    

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Map<Type, List<Product>> getLimitedProductsByType(int limit) {
        Map<Type, List<Product>> result = new HashMap<>();
        for (Type type : Type.values()) {
            Pageable pageable = PageRequest.of(0, limit);
            List<Product> products = productRepository.findByType(type, pageable);
            result.put(type, products);
        }
        return result;
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = getProductById(id);

        if (updatedProduct.getName() != null) {
            existing.setName(updatedProduct.getName());
        }
        if (updatedProduct.getDescription() != null) {
            existing.setDescription(updatedProduct.getDescription());
        }
        if (updatedProduct.getPrice() != null) {
            existing.setPrice(updatedProduct.getPrice());
        }
        if (updatedProduct.getStock() != null) {
            existing.setStock(updatedProduct.getStock());
        }
        if (updatedProduct.getType() != null) {
            existing.setType(updatedProduct.getType());
        }
        if (updatedProduct.getFavorite() != null) {
            existing.setFavorite(updatedProduct.getFavorite());
        }

        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete: product not found with id " + id);
        }
        productRepository.deleteById(id);
    }
}
