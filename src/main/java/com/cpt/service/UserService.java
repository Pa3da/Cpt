package com.cpt.service;


import com.cpt.entity.User;

public interface UserService {
	boolean authenticate(String username, String password);
	boolean register(User user);
}
