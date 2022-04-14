package com.component.airline.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "payment_dtl")
public class Payment {
	
	public Payment() {}
	public Payment(int Id,String payment_type,CardDetails saved_card,OnlinePaymentDetails online_payment_dtl) {
		this.Id=Id;
		this.payment_type=payment_type;
	}
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
	int Id;
	
	@Column(name = "payment_type")
	String payment_type;
	
	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "user", referencedColumnName = "id")
	private User user;
	
	/*
	 * @OneToOne(cascade = CascadeType.MERGE)
	 * 
	 * @JoinColumn(name = "booking", referencedColumnName = "id") private Booking
	 * booking;
	 */
	
	@Embedded
	CardDetails saved_card;
	
	@Embedded
	OnlinePaymentDetails online_payment_dtl;

	public CardDetails getCardDetails() {
		return saved_card;
	}

	public void setCardDetails(CardDetails cardDetails) {
		this.saved_card = cardDetails;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public CardDetails getSaved_card() {
		return saved_card;
	}

	public void setSaved_card(CardDetails saved_card) {
		this.saved_card = saved_card;
	}

	public OnlinePaymentDetails getOnline_payment_dtl() {
		return online_payment_dtl;
	}

	public void setOnline_payment_dtl(OnlinePaymentDetails online_payment_dtl) {
		this.online_payment_dtl = online_payment_dtl;
	}

	public OnlinePaymentDetails getOnlinePaymentDetails() {
		return online_payment_dtl;
	}

	public void setOnlinePaymentDetails(OnlinePaymentDetails onlinePaymentDetails) {
		this.online_payment_dtl = onlinePaymentDetails;
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getPayment_type() {
		return payment_type;
	}

	public void setPayment_type(String payment_type) {
		this.payment_type = payment_type;
	}
	
}
