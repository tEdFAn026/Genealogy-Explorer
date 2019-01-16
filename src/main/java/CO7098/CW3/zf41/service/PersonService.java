package CO7098.CW3.zf41.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;

import CO7098.CW3.zf41.domain.Person;
import CO7098.CW3.zf41.domain.PersonTree;
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
		if (id == null)
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_KEY_NULL);
		else if (!pr.existsById(id))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_FIND_USER_KEY.SetID(id));
		else
			return pr.findById(id).get();
	}

	// @Transactional
	public void deleteById(Integer id) {
		if (id == null)
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_KEY_NULL);
		else if (!pr.existsById(id))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_DELETE_USER_KEY.SetID(id));
		else {
			PersonTree pt = new PersonTree(this.findById(id), this, false, 2, null);
			if (pt.getChildren() != null)
				for (PersonTree child : pt.getChildren()) {
					Person childPerson = this.findById(child.getKey());
					childPerson.setFatherKey(childPerson.getFatherKey() == id ? null : childPerson.getFatherKey());
					childPerson.setMotherKey(childPerson.getMotherKey() == id ? null : childPerson.getMotherKey());
					this.save(childPerson, false);
				}
			pr.deleteById(id);
		}
	}

	// @Transactional
	public void save(Person p, boolean newPerson) {
		if(p.getKey()==null)
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_KEY_NULL);
		else if (newPerson && pr.existsById(p.getKey()))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_ADD_USER_KEY);
		else if (p.getName() == null)
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_NAME_NULL.SetID(p.getKey()));
		else if (p.getMotherKey() != null && !pr.existsById(p.getMotherKey()))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_ADD_M_KEY);
		else if (p.getFatherKey() != null && !pr.existsById(p.getFatherKey()))
			throw new PersonSecviceException(PersonServiceErrorCode.ERROR_ADD_F_KEY);
		else
			pr.save(p);
	}

	public void saveList(List<Person> pList, boolean newPerson) {

		for (Person p : pList) {
			if(p.getKey()==null)
				throw new PersonSecviceException(PersonServiceErrorCode.ERROR_KEY_NULL);
			else if (newPerson && pr.existsById(p.getKey()))
				throw new PersonSecviceException(PersonServiceErrorCode.ERROR_ADD_USER_KEY);
			else if (p.getName() == null)
				throw new PersonSecviceException(PersonServiceErrorCode.ERROR_NAME_NULL.SetID(p.getKey()));
			else if (p.getMotherKey() != null && !pr.existsById(p.getMotherKey()))
				throw new PersonSecviceException(PersonServiceErrorCode.ERROR_ADD_M_KEY);
			else if (p.getFatherKey() != null && !pr.existsById(p.getFatherKey()))
				throw new PersonSecviceException(PersonServiceErrorCode.ERROR_ADD_F_KEY);
		}

		for (Person p : pList) {
			pr.save(p);
		}
	} 
	
	public List<Person> findByNameLike(String name){
		if(name != null)
			return pr.findByNameLike("%"+name+"%");
		
		return null;
	}

}
