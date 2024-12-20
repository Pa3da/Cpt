package com.cpt;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.cpt.dao") // 确保路径正确
public class CptApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(CptApplication.class, args);
	}
	
}
