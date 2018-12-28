//package CO7098.CW3.zf41.repository.service;
//
//import java.util.ArrayList;
//import java.util.Collection;
//
//import org.junit.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import CO7098.CW3.zf41.domain.Person;
//
//public class PersonServiceTest {
//	@Autowired
//	PersonService ps = new PersonService();
//
////	@Test
//	public void findAllPerson() {
//	
//		ArrayList<Person> persons = new ArrayList<Person>((Collection) ps.findAllPerson());
//
//		for (Person p : persons) {
//			System.out.println(toString(p));
//		}
//	}
//
//	public void findById(Integer id) {
//		System.out.println(ps.findById(id));
//	}
//
//	public void deleteById(Integer id) {
//		System.out.println(ps.findAllPerson());
//		ps.deleteById(id);
//	}
//	
//	@Test
//	public void save() {
////		int id = 
//		ps.save(new Person(100,"test"));
//	}
//
//	public String toString(Person p) {
//		return "key:" + p.getKey() + ", name:" + p.getName() + ", m:" + p.getMotherKey() + ", f:" + p.getFatherKey()
//				+ ", dob:" + p.getDateOfBirth() + ", g:" + p.getGender();
//	}
//}
