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

import com.component.airline.db.TransactionDAOService;
import com.component.airline.entity.Transaction;

@RestController
@RequestMapping(path="/v1/transaction")
public class TransactionController {

	@Autowired
		TransactionDAOService service;
		
		
		@GetMapping(path = "/get", produces=MediaType.APPLICATION_JSON_VALUE)
		@ResponseBody
		public Object getPayment(@QueryParam(value = "paymentId") int paymentId) {
			return service.getTransactionById(paymentId);
			
		}
		
		@PostMapping(path = "/make", produces=MediaType.APPLICATION_JSON_VALUE)
		@ResponseBody
		public Object getPayments(@RequestBody Transaction transaction) {
			return service.makeTransaction(transaction);
			
		}
	
}
