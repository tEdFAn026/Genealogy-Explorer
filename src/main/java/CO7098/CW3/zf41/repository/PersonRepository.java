package CO7098.CW3.zf41.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import CO7098.CW3.zf41.domain.Person;

@Repository
public interface PersonRepository extends CrudRepository<Person, Integer> {

}
