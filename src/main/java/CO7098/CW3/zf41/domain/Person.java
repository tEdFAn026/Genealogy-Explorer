package CO7098.CW3.zf41.domain;


import javax.persistence.Entity;
import javax.persistence.Column;
//import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;


//Uncomment annotations if you use Spring Data JPA

@Entity
@Table(name="GE_Person")
public class Person {
	
	public Integer getKey() {
		return key;
	}
	public void setKey(Integer key) {
		this.key = key;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@JsonProperty("m")
	public Integer getMotherKey() {
		return motherKey;
	}
	public void setMotherKey(Integer motherKey) {
		this.motherKey = motherKey;
	}
	@JsonProperty("f")
	public Integer getFatherKey() {
		return fatherKey;
	}
	public void setFatherKey(Integer fatherKey) {
		this.fatherKey = fatherKey;
	}
	
	@JsonProperty("dob")
	public Date getDateOfBirth() {
		return this.dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	
//	@JsonProperty("g")
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public Person() {

	}

	public Person(Integer key, String name) {
		super();
		this.key = key;
		this.name = name;
	}


	public Person(Integer key, String name, Integer motherKey, Integer fatherKey, Date dateOfBirth, String gender) {
		super();
		this.key = key;
		this.name = name;
		this.motherKey = motherKey;
		this.fatherKey = fatherKey;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
	}


	@Id
//	@GeneratedValue
	@Column(name = "[key]")
	Integer key;
	@Column(name = "name")
	String name;
	
	@Column(name = "motherKey")
	Integer motherKey;
	@Column(name = "fatherKey")
	Integer fatherKey;
	@Column(name = "DateOfBirth")
	Date dateOfBirth; //19921210->December 10th 1992 
	@Column(name = "gender")
	String gender;
	
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "key:" + this.getKey() + ", name:" + this.getName() + ", m:" + this.getMotherKey() + ", f:"
				+ this.getFatherKey() + ", dob:" + this.getDateOfBirth() + ", g:" + this.getGender();
	}
}
