package com.cpt.controller;

import com.cpt.entity.User;
import com.cpt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> login(@RequestParam String username, @RequestParam String password) {
		boolean isAuthenticated = userService.authenticate(username, password);
		Map<String, Object> response = new HashMap<>();
		if (isAuthenticated) {
			response.put("success", true);
			return ResponseEntity.ok(response);
		} else {
			response.put("success", false);
			return ResponseEntity.status(401).body(response);
		}
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	@Transactional
	public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
		boolean isRegistered = userService.register(user);
		Map<String, Object> response = new HashMap<>();
		if (isRegistered) {
			response.put("success", true);
//			response.put("message","注册成功");
			return ResponseEntity.ok(response);
		}else {
			response.put("success", false);
			return ResponseEntity.status(401).body(response);
		}
	}
	
}
