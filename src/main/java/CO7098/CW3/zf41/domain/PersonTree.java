package CO7098.CW3.zf41.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import CO7098.CW3.zf41.exception.PersonSecviceException;
import CO7098.CW3.zf41.service.PersonService;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PersonTree {

	private int key;
	private Parents parents;
	private List<PersonTree> children;

	public PersonTree() {
		super();
	}

	public PersonTree(int key) {
		super();
		this.key = key;
	}

	public PersonTree(Person p, PersonService ps, boolean findAncestors) {
		super();
		if (p == null)
			return;

		this.key = p.getKey();

		if (ps == null)
			return;

		if (findAncestors) {
			try {

				PersonTree m = new PersonTree(ps.findById(p.getMotherKey()), ps, findAncestors);
				if (parents == null)
					this.parents = new Parents(m, null);
				else
					this.parents.setM(m);

			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println("mother:" + e);
			}

			try {
				PersonTree f = new PersonTree(ps.findById(p.getFatherKey()), ps, findAncestors);
				if (parents == null)
					this.parents = new Parents(null, f);
				else
					this.parents.setF(f);

			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println("father:" + e);
			}
		} else {
			if (this.children == null)
				this.children = new ArrayList<PersonTree>();

			for (Person pChildren : (Iterable<Person>) ps.findAllPerson()) {

				if ((pChildren.getFatherKey() != null && pChildren.getFatherKey() == this.key)
						|| (pChildren.getMotherKey() != null && pChildren.getMotherKey() == this.key))
					this.children.add(new PersonTree(pChildren, ps, findAncestors));
			}

			if (this.children.isEmpty())
				this.children = null;
		}

	}

	public int getKey() {
		return key;
	}

	public void setKey(int key) {
		this.key = key;
	}

	public Parents getParents() {
		return parents;
	}

	public void setParents(Parents parents) {
		this.parents = parents;
	}

	public List<PersonTree> getChildren() {
		return children;
	}

	public void setChildren(List<PersonTree> children) {
		this.children = children;
	}

	@JsonInclude(JsonInclude.Include.NON_NULL)
	public class Parents {

		private PersonTree m;
		private PersonTree f;

		public Parents() {
			super();
		}

		public Parents(PersonTree m, PersonTree f) {
			super();
			this.m = m;
			this.f = f;
		}

		public PersonTree getM() {
			return m;
		}

		public void setM(PersonTree m) {
			this.m = m;
		}

		public PersonTree getF() {
			return f;
		}

		public void setF(PersonTree f) {
			this.f = f;
		}
	}
}
