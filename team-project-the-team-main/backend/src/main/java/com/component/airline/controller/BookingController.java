package com.component.airline.controller;

import java.util.List;

import javax.validation.Valid;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.component.airline.db.BookingDAOService;
import com.component.airline.entity.Booking;
import com.component.airline.models.AvailMileagePointsRequest;
import com.component.airline.models.BookingRequestObject;
import com.component.airline.models.DeleteBookingRequest;
import com.component.airline.models.UpdateBookingRequestObject;

@RestController
public class BookingController {
	
	@Autowired
	private BookingDAOService service;
	
	@PostMapping("/addBooking")
	@ResponseBody
	public Booking addBooking(@RequestBody BookingRequestObject booking) {
		return service.saveBooking(booking);
		
	}
	@PostMapping("/updateBooking")
	@ResponseBody
	public Booking updateBooking(@RequestBody UpdateBookingRequestObject booking) {
		
		return service.saveBookingUpdateFlow(booking);
		
	}
	@PostMapping("/deleteBooking")
	@ResponseBody
	public void deleteBooking(@RequestBody DeleteBookingRequest deleteBookingRequest) {
		
		 service.deleteBooking(deleteBookingRequest);
		
	}
	@GetMapping("/booking/{Id}")
	@ResponseBody
	public Booking findBookingById(@PathVariable int bookingId) {
		return service.getBookingById(bookingId);
		
	}
	
	@GetMapping("/bookings")
	@ResponseBody
	public List<Booking> findBookings() {
		return  service.getBookings();
		
	}
	
	@GetMapping("/bookings/{id}")
	@ResponseBody
	public List<Booking> findUserBookings(@PathVariable int userId) {
		return  service.getBookingByUserId(userId);
		
	}
	
	@DeleteMapping("/delete/{bookingId}")
	@ResponseBody
	public String deleteBookingByID(@PathVariable int bookingId) {
		return service.deleteByID(bookingId);
	}
	
	
	  @PostMapping("/availBooking")
	  
	  @ResponseBody public Object availMileagePoints(@Valid @RequestBody AvailMileagePointsRequest request) { 
	  String s = service.availMileagePoints(request.getBookingId());
	  if(s.startsWith("Mileage points availed for")|| s.startsWith("Mileage points already availed for")){
			 return Response.ok(s).build();
			 }else{
				 return Response.status(Response.Status.BAD_REQUEST).status(400, "Invalid Booking ID").entity(request).build();
			 }
	  }
	 
}
