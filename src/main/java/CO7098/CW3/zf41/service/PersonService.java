package CO7098.CW3.zf41.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;

import CO7098.CW3.zf41.domain.Person;
import CO7098.CW3.zf41.errorcode.PersonServiceErrorCode;
import CO7098.CW3.zf41.exception.PersonSecviceException;
import CO7098.CW3.zf41.repository.PersonRepository;

@Service
public class PersonService {

	@Autowired
	private PersonRepository pr;

	// @Transactional
	public Object findAllPerson() {
		return pr.findAll();
	}

	// @Transactional
	public Person findById(Integer id) {
		// https://blog.csdn.net/weixin_42903508/article/details/81976866?utm_source=blogxgwz3
		if (id == null || !pr.existsById(id))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_FIND_USER_KEY.SetID(id));
		else
			return pr.findById(id).get();
	}

	// @Transactional
	public void deleteById(Integer id) {
		if (id == null || !pr.existsById(id))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_DELETE_USER_KEY.SetID(id));
		else
			pr.deleteById(id);
	}

	// @Transactional
	public void save(Person p) {
		if (pr.existsById(p.getKey()))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_ADD_USER_KEY);
		else if (p.getMotherKey() != null && !pr.existsById(p.getMotherKey()))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_ADD_M_KEY);
		else if (p.getFatherKey() != null && !pr.existsById(p.getFatherKey()))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_ADD_F_KEY);
		else
			pr.save(p);
	}

}
