package com.component.airline.controller;

import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.Response.StatusType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.component.airline.db.UserDAOService;
import com.component.airline.entity.User;
import com.component.airline.models.UserLogin;
import com.component.airline.models.UserRequestObject;


@RestController
@RequestMapping(path="/v1/user")
public class UserController {

	@Autowired
	UserDAOService service;
	
	@GetMapping(path = "/getUser", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object getUser(@QueryParam(value = "userId") Integer userId) {
		return service.getUserById(userId);
	}
	
	@PostMapping(path = "/register", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object registerUser(@RequestBody UserRequestObject user) {
		try {
		Object newUser =  service.registerUser(user);
		 if(newUser!=null){
			 return Response.ok(newUser).status(Response.Status.OK).status(200, "User Registered Successfully").build();
			 }else{
				 return Response.status(Response.Status.FORBIDDEN).status(403, "User Already Exist!").entity(user).build();
			 }
		}catch(Exception e) {
			 return Response.status(Response.Status.FORBIDDEN).status(403, "Invalid Data").entity(user).build();
		}
		
	}
	
	@PostMapping(path = "/update", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object updateUser(@RequestBody User user) {
		return service.updateUser(user);
		
	}
	
	@PostMapping(path = "/login", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object loginUser(@RequestBody UserLogin userLogin) {
		Object user = service.loginUser(userLogin);
		 if(user!=null){
		 return Response.ok(user).build();
		 }else{
			 return Response.status(Response.Status.UNAUTHORIZED).status(401, "Invalid Credetials").entity(userLogin).build();
		 }
		
	}
	
	@GetMapping(path = "/users", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object loginUser(@QueryParam(value = "userType") String userType) {
		return service.getUserByUserType(userType);
		
	}
}
