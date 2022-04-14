package com.component.airline.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.component.airline.entity.Payment;
import com.component.airline.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	 @Query(value ="SELECT * from user e where e.username =:username AND e.password =:password AND e.user_type =:userType",nativeQuery = true)
	    User findUserByUsernameandPassword(@Param("username") String username,@Param("password") String password,@Param("userType") String userType);
	 
	 @Query(value ="SELECT * from user e where e.user_type =:user_type",nativeQuery = true)
	 List<User> getUserByUserType(@Param("user_type") String userType);
	 
	 @Query(value ="SELECT * from user e where e.email =:email",nativeQuery = true)
	 User getUserByEmail(@Param("email")String email); 
	 
}
