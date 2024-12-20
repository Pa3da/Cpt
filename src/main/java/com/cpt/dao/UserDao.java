package com.cpt.dao;

import com.cpt.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


@Mapper
//@Repository
public interface UserDao {
	
//	@Select("select id, username, password from user where username = #{username}")
	User findByUsername(String username);
	
	Boolean register(User user);
}
