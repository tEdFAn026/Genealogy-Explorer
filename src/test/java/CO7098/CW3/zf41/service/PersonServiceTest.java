/*
 * https://blog.csdn.net/gaodml/article/details/68961156 
 */

package CO7098.CW3.zf41.service;

import java.util.ArrayList;
import java.util.Collection;

import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;

import CO7098.CW3.zf41.domain.Person;
import CO7098.CW3.zf41.service.PersonService;

@Controller
public class PersonServiceTest {
	@Autowired
	PersonService ps;
	
//	public static void main(String[] args) {
//        System.out.println("---start---");
//        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("springContext.xml");
//        PersonService ps = (PersonService) applicationContext.getBean("ps");
//		ps.save(new Person(100, "test"), true);
//    }


	@Before
	public void Init() {
		System.out.println("---start---");
		ApplicationContext applicationContext = new ClassPathXmlApplicationContext("springContext.xml");
		ps = (PersonService) applicationContext.getBean("ps");
	}
	
	

	@Test
	public void findAllPerson() {

		ArrayList<Person> persons = new ArrayList<Person>((Collection) ps.findAllPerson());

		for (Person p : persons) {
			System.out.println(p);
		}
	}

	public void findById(Integer id) {
		System.out.println(ps.findById(id));
	}

	public void deleteById(Integer id) {
		System.out.println(ps.findAllPerson());
		ps.deleteById(id);
	}

//	@Test
	public void save() {
		ps.save(new Person(100, "test"),true);
	}
}
