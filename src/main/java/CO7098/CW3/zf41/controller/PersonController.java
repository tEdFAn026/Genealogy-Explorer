package CO7098.CW3.zf41.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import CO7098.CW3.zf41.domain.Person;
import CO7098.CW3.zf41.domain.PersonModel;
import CO7098.CW3.zf41.domain.PersonSecviceMessage;
import CO7098.CW3.zf41.domain.PersonTree;
import CO7098.CW3.zf41.exception.PersonSecviceException;

import CO7098.CW3.zf41.service.PersonService;

@Controller
public class PersonController {
	@Autowired
	PersonService ps;

	@Controller
	public class DisplayGE {

		@RequestMapping(value = "/", method = RequestMethod.GET)
		public ModelAndView ShowGETree() {
			return new ModelAndView("index", "persons", ps.findAllPerson());
		}

		//
		// @RequestMapping(value = "/edit/{id}")
		// public ModelAndView edit(@PathVariable Integer id) {
		// return new ModelAndView("edit", "person", ps.findById(id));
		// }
		//
		//
		// @RequestMapping(value = "/update", method = RequestMethod.POST)
		// public ModelAndView update(Person p) {
		// ps.save(p);
		// return new ModelAndView("redirect:/");
		// }
	}

	@Controller
	@RequestMapping(value = "/person")
	public class PersonWebPagesDisplay {

		@RequestMapping(value = "/All", method = RequestMethod.GET)
		public ModelAndView ShowAllPersonInTable() {
			return new ModelAndView("listAll", "persons", ps.findAllPerson());
		}
		
		@RequestMapping(value = "/create")
		public ModelAndView create() {
			return new ModelAndView("create");
		}

	}

	@Controller
	@RequestMapping(value = "/person")
	public class PersonOperation {

		/**
		 * (a) Adding a person
		 */
		
		/**
		 * (1) GET /GE/person/add?key=3&name=RichardIII&dob=14830626&m=1&f=2&g=male
		 * 
		 * @param key
		 * 				the unique key of the person (*)
		 * @param name
		 * 				full name of the person (*)
		 * @param motherKey
		 * : 			the person’s mother’s key
		 * @param fatherKey
		 * 				the person’s father’s key
		 * @param dateOfBirth
		 * 				the person’s date of birth (e.g. 19921210 – December 10th 1992)
		 * @param gender
		 * 				the person’s gender
		 * @return
		 * 				return PersonSecviceMessage
		 * (*) Required fields
		 */
		@RequestMapping(value = "/add", method = RequestMethod.GET)
		public @ResponseBody Object addPerson(@RequestParam(value = "key", required = true) int key,
				@RequestParam(value = "name", required = true) String name,
				@RequestParam(value = "m", required = false) Integer motherKey,
				@RequestParam(value = "f", required = false) Integer fatherKey,
				@RequestParam(value = "dob", required = false) Integer dateOfBirth,
				@RequestParam(value = "g", required = false) String gender) {

			try {
				ps.save(new Person(key, name, motherKey, fatherKey, dateOfBirth, gender));
			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println(e);
				return new PersonSecviceMessage(false, e.getPServiceErrorCode().getDesc());
			}

			return new PersonSecviceMessage(true);
		}
		
		/**
		 * (2) POST /GE/person/addJSON
		 * 
		 * @param list
		 * 				input person list
		 * @param p
		 * 				input person
		 * @return
		 * 				return PersonSecviceMessage
		 */
		@RequestMapping(value = "/addJSON", method = RequestMethod.POST)
		public @ResponseBody Object listAllJson(PersonModel list, Person p) {
			System.out.println(p);
			System.out.println(list);

			if (list != null && list.getList() != null) {
				for (Person _p : list.getList()) {
					try {
						ps.save(_p);
					} catch (PersonSecviceException e) {
						// TODO: handle exception
						System.out.println(e);
						return new PersonSecviceMessage(false, e.getPServiceErrorCode().getDesc());
					}
				}

				return new PersonSecviceMessage(true);
			}

			if (p != null) {
				try {
					ps.save(p);
				} catch (PersonSecviceException e) {
					// TODO: handle exception
					System.out.println(e);
					return new PersonSecviceMessage(false, e.getPServiceErrorCode().getDesc());
				}

				return new PersonSecviceMessage(true);
			}

			return new PersonSecviceMessage(false, "No person or person list passed in");
		}

		// @RequestMapping(value = { "/listAllJson" }, method =
		// RequestMethod.POST)
		// public @ResponseBody Object listAllJson(Object obj) {
		//
		// System.out.println(obj);
		//
		// PersonModel personModel = null;
		// try {
		// personModel = (PersonModel) obj;
		// for (Person p : personModel.getList()) {
		// try {
		// ps.save(p);
		// } catch (PersonSecviceException e) {
		// // TODO: handle exception
		// System.out.println(e);
		// }
		// }
		//
		// return personModel;
		// } catch (Exception e) {
		// // TODO: handle exception
		// System.out.println("no PersonModel");
		// }
		//
		// Person p = null;
		// try {
		// p = Person.class.cast(obj);
		//
		// try {
		// ps.save(p);
		// } catch (PersonSecviceException e) {
		// // TODO: handle exception
		// System.out.println(e);
		// }
		//
		// return p;
		// } catch (Exception e) {
		// // TODO: handle exception
		// System.out.println("no Person");
		// }
		//
		// return null;
		// }	
		
		/**
		 * (b) Deleting a person
		 * 
		 * GET /GE/person/delete/7
		 * 
		 * @param id
		 * 				input person key
		 * @return
		 *				return PersonSecviceMessage
		 */
		@RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
		public @ResponseBody Object delete(@PathVariable Integer id) {
			try {
				ps.deleteById(id);
			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println(e);
				return new PersonSecviceMessage(false, e.getPServiceErrorCode().getDesc());
			}
			
			return new PersonSecviceMessage(true);
		}
	
		/**
		 * (c) Getting information about a specific person
		 * 
		 * GET /GE/person/get/12
		 * 
		 * @param id
		 * 				input person key
		 * @return
		 * 				return Person if find
		 * 				else return PersonSecviceMessage
		 */
		@RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
		public @ResponseBody Object get(@PathVariable Integer id) {
			try {
				return ps.findById(id);
			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println(e);
				return new PersonSecviceMessage(false, e.getPServiceErrorCode().getDesc());
			}
		}
		
		/**
		 * (d) Finding someone’s ancestors
		 * 
		 * GET /GE/person/ancestors/6
		 * 
		 * @param id
		 * 				input person key
		 * @return
		 * 				return a Person's ancestors tree if find
		 * 				else return a PersonSecviceMessage
		 */
		@RequestMapping(value = "/ancestors/{id}", method = RequestMethod.GET)
		public @ResponseBody Object ancestors(@PathVariable Integer id) {
			try {
				return new PersonTree(ps.findById(id), ps, true);
			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println(e);
				return new PersonSecviceMessage(false, e.getPServiceErrorCode().getDesc());
			}
		}
		
		/**
		 * (e) Finding someone’s descendants
		 * 
		 * GET /GE/person/descendants/7
		 * 
		 * @param id
		 * 				input person key
		 * @return
		 * 				return a Person's descendants tree if find
		 * 				else return a PersonSecviceMessage
		 */
		@RequestMapping(value = "/descendants/{id}", method = RequestMethod.GET)
		public @ResponseBody Object descendants(@PathVariable Integer id) {
			try {
				return new PersonTree(ps.findById(id), ps, false);
			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println(e);
				return new PersonSecviceMessage(false, e.getPServiceErrorCode().getDesc());
			}
		}
		
	}
}
