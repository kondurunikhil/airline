package com.component.airline.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Table(name="user")
@JsonSerialize
public class User implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
	private int Id;
	
	@Column(name = "first_name")
	private String first_name;
	
	@Column(name = "last_name")
	private String last_name;
	
	@Column(name = "dob")
	private Date dob;
	
	@Column(name = "phone_number")
	private String phone_number;
	
	@Column(name = "email",unique=true)
	private String  email;
	
	@Column(name = "add_line1")
	private String add_line1;
	
	@Column(name = "add_line2")
	private String add_line2;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "state")
	private String state ;
	
	@Column(name = "country")
	private String country;
	
	@Column(name = "zip")
	private String zip;
	
	@Column(name = "user_type")
	private String user_type;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	@JsonManagedReference
	@OneToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinColumn(name = "mileage_account", referencedColumnName = "id")
	private Mileage mileage;
	
	
	@Column(name = "frequent_flyer",columnDefinition = "boolean default False")
	private boolean frequent_flyer;
	
	
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public String getPhone_number() {
		return phone_number;
	}
	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAdd_line1() {
		return add_line1;
	}
	public void setAdd_line1(String add_line1) {
		this.add_line1 = add_line1;
	}
	public String getAdd_line2() {
		return add_line2;
	}
	public void setAdd_line2(String add_line2) {
		this.add_line2 = add_line2;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public String getUser_type() {
		return user_type;
	}
	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public Mileage getMileage() {
		return mileage;
	}
	public void setMileage(Mileage mileage) {
		this.mileage = mileage;
	}
	public boolean isFrequent_flyer() {
		return frequent_flyer;
	}
	public void setFrequent_flyer(boolean frequent_flyer) {
		this.frequent_flyer = frequent_flyer;
	}
	
	@Override
	public String toString() {
		return "User [Id=" + Id + ", first_name=" + first_name + ", last_name=" + last_name + ", dob=" + dob
				+ ", phone_number=" + phone_number + ", email=" + email + ", add_line1=" + add_line1 + ", add_line2="
				+ add_line2 + ", city=" + city + ", state=" + state + ", country=" + country + ", zip=" + zip
				+ ", user_type=" + user_type + ", username=" + username + ", password=" + password + ", rewards="
				+ mileage + ", frequent_flyer=" + frequent_flyer + "]";
	}

	
}
