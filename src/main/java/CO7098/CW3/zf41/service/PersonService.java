package CO7098.CW3.zf41.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import CO7098.CW3.zf41.domain.Person;
import CO7098.CW3.zf41.repository.PersonRepository;

@Service
public class PersonService {

	@Autowired
	private PersonRepository pr;

//	@Transactional
	public Object findAllPerson() {
		return pr.findAll();
	}

//	@Transactional
	public Person findById(Integer id) {
		// https://blog.csdn.net/weixin_42903508/article/details/81976866?utm_source=blogxgwz3
		if (pr.existsById(id))
			return pr.findById(id).get();
		else
			return null;
	}

//	@Transactional
	public void deleteById(Integer id) {
		pr.deleteById(id);
	}

//	@Transactional
	public void save(Person p) {
		pr.save(p);
	}

}
