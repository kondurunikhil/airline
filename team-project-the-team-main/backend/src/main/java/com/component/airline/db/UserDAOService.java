package com.component.airline.db;

import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.component.airline.entity.Mileage;
import com.component.airline.entity.User;
import com.component.airline.models.UserLogin;
import com.component.airline.models.UserRequestObject;
import com.component.airline.repository.UserRepository;

@Service
public class UserDAOService {
	@Autowired
	UserRepository userService;
	
	
	public Object registerUser(UserRequestObject newUser) throws SQLException{
		User olduser = userService.getUserByEmail(newUser.getEmail());
		if(olduser!=null) {
			return null;
		}
		User user = new User();
		user.setFirst_name(newUser.getFirst_name());
		user.setUser_type(newUser.getUser_type());
		user.setLast_name(newUser.getLast_name());
		user.setAdd_line1(newUser.getAdd_line1());
		user.setAdd_line2(newUser.getAdd_line2());
		user.setCity(newUser.getCity());
		user.setCountry(newUser.getCountry());
		user.setState(newUser.getState());
		user.setEmail(newUser.getEmail());
		user.setPhone_number(newUser.getPhone_number());
		user.setUsername(newUser.getEmail());
		user.setPassword(newUser.getPassword());
		user.setDob(newUser.getDob());
		Mileage mileage = new Mileage();
		mileage.setMemberSince(new Date(System.currentTimeMillis()));
		user.setMileage(mileage);
		return userService.save(user);
		
		
	}
	
	//@Cacheable(value = "userCache")
	public Object getUserById(int userId){
		return userService.findById(userId).orElseThrow(RuntimeException::new);
	}
	
	//@Cacheable(value = "userCache")
	public Object updateUser(User user){
		return userService.save(user);
  }
  
	public Object loginUser(UserLogin userLogin){
		User user =  userService.findUserByUsernameandPassword(userLogin.getUsername(),userLogin.getPassword(),userLogin.getUserType());
		if(user==null) {
			return null;
		}else {
			return user;
		}
	}
	
	public List<User> getUserByUserType(String userType){
		return userService.getUserByUserType(userType);
	}
}
