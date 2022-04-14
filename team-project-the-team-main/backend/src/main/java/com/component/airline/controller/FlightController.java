package com.component.airline.controller;

import java.util.List;

import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.component.airline.db.FlightDAOService;
import com.component.airline.entity.Flight;
import com.component.airline.entity.Seat;
import com.component.airline.models.FlightAddRequest;
import com.component.airline.models.FlightCancelObject;
import com.component.airline.models.FlightSearchObject;
import com.component.models.FlightRequestObject;

@RestController
public class FlightController {

	@Autowired
	FlightDAOService service;
	
	@GetMapping(path = "/getFlightById", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object getFlightById(@RequestBody Flight flight) {
		return service.getFlightById(flight);
	}
	
	@PostMapping(path = "/searchFlights", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Flight> getFlights(@RequestBody FlightRequestObject flight) {
		return service.getFlightBySourceAndDestination(flight);
	}
	
	@PostMapping(path = "/addFlight", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object addFlight(@RequestBody FlightAddRequest flight) {
		Object newFlight = service.addFlight(flight);
		 if(newFlight!=null){
		 return Response.status(Response.Status.OK).status(200,"Flight Added Successfully!").entity(newFlight).build();
		 }else{
			 return Response.status(Response.Status.BAD_REQUEST).status(403, "Error while adding flight").entity(flight).build();
		 }
	}
	
	@PostMapping(path = "/updateFlight", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object updateFlight(@RequestBody Flight flight) {
		Object newFlight = service.updateFlight(flight);
		if(newFlight!=null) {
			 return Response.ok(newFlight).status(Response.Status.OK).status(200, "Flight Updated Successfully!").build();
		}else{
			 return Response.status(Response.Status.BAD_REQUEST).status(400, "Something Went Wrong").entity(flight).build();
		 }
	}
	
	@PostMapping(path = "/getFlightByCriteria", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object getFlightByCriteria(@RequestBody FlightSearchObject flightSearchObject) {
		return service.getFlightByCriteria(flightSearchObject);
	}
	
	@PostMapping(path = "/cancelFlight", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object cancelFlight(@RequestBody FlightCancelObject flightSearchObject) {
		String status = service.cancelFlight(flightSearchObject.getId());
		return Response.ok(flightSearchObject).status(Response.Status.OK).status(200, status).build();
		
	}
	
	@GetMapping(path = "/seatsForFLight", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Seat> getAvailableSeatsForFLight(@QueryParam(value = "flightId") int flightId) {
		return service.getAvailableSeatsForFlight(flightId);
	}
}
