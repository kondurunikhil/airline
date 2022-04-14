package com.component.airline.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.component.airline.entity.Payment;
import com.component.airline.repository.PaymentRepository;

@Service
public class PaymentDAOService {
	@Autowired
	PaymentRepository paymentRepository;
	
	@Cacheable(value = "paymentCache")
	public Object getPaymentById(int id){
		return paymentRepository.findById(id).orElseThrow(RuntimeException::new);
	}
	
	@Cacheable(value = "paymentCache")
	public Object getPaymentByUserId(int id){
		return paymentRepository.findByUserId(id);
	}
	
	@Cacheable(value = "paymentCache")
	public Object addPayment(Payment payment){
		return paymentRepository.save(payment);
	}
	
	@Cacheable(value = "paymentCache")
	public void deletePayment(Payment payment){
		 paymentRepository.deleteById(payment.getId());
	}
	
	/*public void deletePaymentByUserId(Payment payment){
		 paymentRepository.deleteByUserId(payment.getUserId());
	}*/
}
