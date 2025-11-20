package com.cwa.GymBros.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cwa.GymBros.model.Cart;
import com.cwa.GymBros.model.Product;
import com.cwa.GymBros.model.User;
import com.cwa.GymBros.repository.CartRepository;
import com.cwa.GymBros.repository.ProductRepository;
import com.cwa.GymBros.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart addToCart(Long userId, Long productId/*, Cart cartData*/) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        //cart.setPrice(cartData.getPrice()); 
        cart.setOrder(null);

        return cartRepository.save(cart);
    }

    public List<Cart> getUserCart(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void deleteCartItem(Long cartId) {
        if (!cartRepository.existsById(cartId)) {
            throw new RuntimeException("Cart item not found");
        }
        cartRepository.deleteById(cartId);
    }

    public Cart updateCart(Long cartId/* , Cart cartData*/) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        /*cart.setPrice(cartData.getPrice());
        cart.setUpdatedAt(cartData.getUpdatedAt());*/

        return cartRepository.save(cart);
    }

    public void clearCart(Long userId) {
        List<Cart> carts = cartRepository.findByUserId(userId);
        cartRepository.deleteAll(carts);
    }
}
