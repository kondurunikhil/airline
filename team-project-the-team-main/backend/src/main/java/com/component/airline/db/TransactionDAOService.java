package com.component.airline.db;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.component.airline.entity.Transaction;
import com.component.airline.repository.TransactionRepository;

@Service
public class TransactionDAOService {

	@Autowired
	TransactionRepository transactionService;
	
	@Cacheable(value = "transactionCache")
	public Object makeTransaction(Transaction transaction){
		return transactionService.save(transaction);
	}
	
	@Cacheable(value = "transactionCache")
	public Object getTransactionById(int transactionId){
		return transactionService.findById(transactionId).orElseThrow(RuntimeException::new);
	}
}
