package com.cpt.service.impl;

import com.cpt.dao.UserDao;
import com.cpt.entity.User;
import com.cpt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserDao userDao;
	
	@Override
	public boolean authenticate(String username, String password) {
		User user = userDao.findByUsername(username);
		if (user != null) {
			// 此处进行密码验证，通常应使用散列密码匹配
			return user.getPassword().equals(password);
		}
		return false;
	}
	
	@Override
	public boolean register(User user) {
		return userDao.register(user);
	}
	
	
}
