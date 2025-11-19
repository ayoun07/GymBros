package com.cwa.GymBros.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cwa.GymBros.model.Cart;
import com.cwa.GymBros.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;

    // 🔹 Ajouter un produit au panier
    @PostMapping("/{userId}/{productId}")
    public Cart addToCart(
        @PathVariable Long userId,
        @PathVariable Long productId,
        @RequestBody Cart cartData
    ) {
        return cartService.addToCart(userId, productId, cartData);
    }

    // 🔹 Récupérer tous les articles du panier d'un user
    @GetMapping("/{userId}")
    public List<Cart> getUserCart(@PathVariable Long userId) {
        return cartService.getUserCart(userId);
    }

    // 🔹 Mettre à jour un article du panier
    @PutMapping("/item/{cartId}")
    public Cart updateCartItem(
        @PathVariable Long cartId,
        @RequestBody Cart cartData
    ) {
        return cartService.updateCart(cartId, cartData);
    }

    // 🔹 Supprimer un article du panier
    @DeleteMapping("/item/{cartId}")
    public String deleteCartItem(@PathVariable Long cartId) {
        cartService.deleteCartItem(cartId);
        return "Cart item deleted successfully";
    }

    // 🔹 Vider tout le panier d'un utilisateur
    @DeleteMapping("/clear/{userId}")
    public String clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return "Cart cleared successfully";
    }
}

