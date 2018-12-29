package CO7098.CW3.zf41.domain;

import java.util.List;

public class PersonModel {
	private List<Person> list;

	public List<Person> getList() {
		return list;
	}

	public void setList(List<Person> list) {
		this.list = list;
	}

	public PersonModel(List<Person> list) {
		super();
		this.list = list;
	}

	public PersonModel() {
		super();
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub

		if (list != null) {
			String pString = "-List Person start- \n";
			for (Person person : list) {
				pString += person.toString() + "\n";
			}

			pString += "-List Person end- \n";
			return pString;
		} else
			return "null list";
	}

}
