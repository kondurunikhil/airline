package com.component.airline.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.component.airline.entity.Passenger;
import com.component.airline.repository.PassengerRepository;

@Service
public class PassengerDAOService {

	@Autowired
	PassengerRepository passengerRepository;
	
	public Passenger savePassenger(Passenger passenger){
		return passengerRepository.save(passenger);
	}
	
	public void deletePassenger(int passengerID){
		passengerRepository.deleteById(passengerID);
	}
	public Passenger getPassengerById(int id){
		return passengerRepository.findById(id).orElseThrow(RuntimeException::new);
	}
	
}
