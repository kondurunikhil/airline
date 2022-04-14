package com.component.airline.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.component.airline.db.PassengerDAOService;
import com.component.airline.entity.Passenger;

@RestController
public class PassengerComtroller {
	
	@Autowired
	private PassengerDAOService service;
	
	@PostMapping("/addPassenger")
	@ResponseBody
	public Passenger addPassenger(@RequestBody Passenger passenger) {
		return service.savePassenger(passenger);
		
	}
	
	@GetMapping("/passenger/{Id}")
	@ResponseBody
	public Passenger findPassengerById(@PathVariable int id) {
		return service.getPassengerById(id);
		
	}
	
	@DeleteMapping("/delete/{passengerID}")
	@ResponseBody
	public void deleteBookingByID(@PathVariable int passengerID) {
		service.deletePassenger(passengerID);
	}
}
