package com.component.airline.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "trasaction_dtl")
public class Transaction {
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
	private int Id;
	
	@Column(name = "total_amt")
	private double total_amt;
	
	@Column(name = "Tran_date")
	private Date Tran_date;
	
	
	@Column(name = "Rewards")
	private double Rewards;
	
	@Column(name = "Cash")
	private double Cash;
	
	
	@OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user", referencedColumnName = "id")
	private User user;
	
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment", referencedColumnName = "id")
	private Payment payment;

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public double getTotal_amt() {
		return total_amt;
	}

	public void setTotal_amt(double total_amt) {
		this.total_amt = total_amt;
	}

	public Date getTran_date() {
		return Tran_date;
	}

	public void setTran_date(Date tran_date) {
		Tran_date = tran_date;
	}

	/*
	 * public int getPayment_id() { return Payment_id; }
	 * 
	 * public void setPayment_id(int payment_id) { Payment_id = payment_id; }
	 */

	public double getRewards() {
		return Rewards;
	}

	public void setRewards(double rewards) {
		Rewards = rewards;
	}

	public double getCash() {
		return Cash;
	}

	public void setCash(double cash) {
		Cash = cash;
	}


	
	  public User getUser() { return user; }
	  public void setUser(User user) { this.user = user; }
	 

	public Payment getPayment() {
		return payment;
	}
	public void setPayment(Payment payment) {
		this.payment = payment;
	}


	
}
