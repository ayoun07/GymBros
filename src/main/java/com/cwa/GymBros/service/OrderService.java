package com.cwa.GymBros.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cwa.GymBros.model.Order;
import com.cwa.GymBros.model.User;
import com.cwa.GymBros.repository.OrderRepository;
import com.cwa.GymBros.repository.UserRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;


    public Order createOrder(Order order) {

    Long userId = order.getUser().getId();

    User realUser = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    order.setUser(realUser);

    return orderRepository.save(order);
}


    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrder(Long id, Order newData) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setDate_order(newData.getDate_order());
        order.setTotal(newData.getTotal());
        order.setQuantity(newData.getQuantity());
        order.setStatus(newData.getStatus());

        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found");
        }
        orderRepository.deleteById(id);
    }
}
