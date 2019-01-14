package CO7098.CW3.zf41.domain;

import javax.persistence.Entity;
import javax.persistence.Column;
//import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

//Uncomment annotations if you use Spring Data JPA

@Entity
@Table(name = "GE_Person")
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

	//https://blog.csdn.net/samz5906/article/details/79421051
	//fix date incorrect.
	@JsonProperty("dob")
	@JsonFormat(pattern = "yyyyMMdd", timezone = "GMT+8")
	public Date getDateOfBirth() {
		TimeZone.setDefault(TimeZone.getTimeZone("GMT+08"));
		return this.dateOfBirth;
	}

	public void setDateOfBirth(String dateOfBirth) {
		TimeZone.setDefault(TimeZone.getTimeZone("GMT+08"));
		String[] possiblePatterns = { "yyyy-MM-dd", "yyyyMMdd" };
		this.dateOfBirth = parseDate(dateOfBirth, possiblePatterns);
	}

	// @JsonProperty("g")
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

	public Person(Integer key, String name, Integer motherKey, Integer fatherKey, String dateOfBirth, String gender) {
		super();
		this.key = key;
		this.name = name;
		this.motherKey = motherKey;
		this.fatherKey = fatherKey;
		this.setDateOfBirth(dateOfBirth);
		this.gender = gender;
	}

	@Id
	// @GeneratedValue
	@Column(name = "[key]")
	Integer key;
	@Column(name = "name")
	String name;

	@Column(name = "motherKey")
	Integer motherKey;
	@Column(name = "fatherKey")
	Integer fatherKey;
	@Column(name = "DateOfBirth")
	Date dateOfBirth; // 19921210->December 10th 1992
	@Column(name = "gender")
	String gender;

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "key:" + this.getKey() + ", name:" + this.getName() + ", m:" + this.getMotherKey() + ", f:"
				+ this.getFatherKey() + ", dob:" + this.getDateOfBirth() + ", g:" + this.getGender();
	}

	public static Date parseDate(String inputDate, String[] patterns) {
		if (inputDate == null || patterns == null)
			return null;

		SimpleDateFormat df = new SimpleDateFormat();
		for (String pattern : patterns) {
			df.applyPattern(pattern);
			df.setLenient(false);// 设置解析日期格式是否严格解析日期
			ParsePosition pos = new ParsePosition(0);
			Date date = df.parse(inputDate, pos);
			if (date != null) {
				return date;
			}
		}
		return null;
	}

}
