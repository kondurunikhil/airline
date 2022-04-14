package com.component.airline.controller;

import javax.ws.rs.QueryParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.component.airline.db.PaymentDAOService;
import com.component.airline.entity.Payment;

@RestController
@RequestMapping(path="/v1/payment")
public class PaymentController {

	@Autowired
	PaymentDAOService service;
	
	
	@GetMapping(path = "/get", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object getPayment(@QueryParam(value = "paymentId") int paymentId) {
		return service.getPaymentById(paymentId);
		
	}
	
	/*@GetMapping(path = "/getbyuser", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object getPaymentByUserId(@RequestBody int userId) {
		return service.getPaymentById(userId);
		
	}*/
	
	@PostMapping(path = "/add", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Object getPayments(@RequestBody Payment payment) {
		return service.addPayment(payment);
		
	}
	
	@PostMapping(path = "/deleteById", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public void deleteById(@RequestBody Payment payment) {
		 service.deletePayment(payment);
		
	}
	
	/*@PostMapping(path = "/deleteByUserId", produces=MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public void deleteByUserId(@RequestBody Payment payment) {
		 service.deletePaymentByUserId(payment);
		
	}*/
}
