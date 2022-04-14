package com.component.airline.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Table(name="mileage")
@Proxy(lazy = false)
@JsonSerialize
public class Mileage implements Serializable{
	


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name = "mySeqGen", sequenceName = "mySeq", initialValue = 12312312)
    @GeneratedValue(generator = "mySeqGen")
	@Column(name = "id")
    private Integer id;

	@JsonBackReference
	@OneToOne(cascade = CascadeType.ALL,mappedBy = "mileage")
	private User user;
	
	@Column(name = "points",columnDefinition = "integer default 0")
	private double points;
	
	@Column(name = "available_rewards")
	private double availableRewards;
	
	@Column(name = "exp_date")
	private Date expDate;
	
	@Column(name = "distance_travelled")
	private long distance;
	
	@Column(name = "member_since")
	private Date memberSince;
	
	@Column(name = "earned_points",columnDefinition = "integer default 0")
	private double earnedPoints;
	
	public double getPoints() {
		return points;
	}


	public void setPoints(double points) {
		this.points = points;
	}


	public double getEarnedPoints() {
		return earnedPoints;
	}


	public void setEarnedPoints(double earnedPoints) {
		this.earnedPoints = earnedPoints;
	}


	@JsonManagedReference
	@OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	private List<MileageHistory> transactions;


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public double getAvailableRewards() {
		return availableRewards;
	}


	public void setAvailableRewards(double availableRewards) {
		this.availableRewards = availableRewards;
	}


	public Date getExpDate() {
		return expDate;
	}


	public void setExpDate(Date expDate) {
		this.expDate = expDate;
	}


	public long getDistance() {
		return distance;
	}


	public void setDistance(long distance) {
		this.distance = distance;
	}


	public List<MileageHistory> getTransactions() {
		return transactions;
	}


	public void setTransactions(List<MileageHistory> transactions) {
		this.transactions = transactions;
	}
	
	
	
	public Date getMemberSince() {
		return memberSince;
	}


	public void setMemberSince(Date memberSince) {
		this.memberSince = memberSince;
	}


	@Override
	public String toString() {
		return "Mileage [id=" + id + ", user=" + user + ", availableRewards=" + availableRewards + ", expDate="
				+ expDate + ", distance=" + distance + ", transactions=" + transactions + "]";
	}
	
	
}
