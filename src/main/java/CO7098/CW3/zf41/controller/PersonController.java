package CO7098.CW3.zf41.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import CO7098.CW3.zf41.domain.Person;
import CO7098.CW3.zf41.domain.PersonSecviceMessage;
import CO7098.CW3.zf41.domain.PersonTree;
import CO7098.CW3.zf41.exception.PersonSecviceException;
import CO7098.CW3.zf41.page.util.pageMsg;
import CO7098.CW3.zf41.service.PersonService;

@Controller
public class PersonController {
	@Autowired
	PersonService ps;

	@Controller
	public class DisplayGE {
		@RequestMapping(value = "/", method = RequestMethod.GET)
		public ModelAndView ShowGETree() {
			ModelAndView mv = new ModelAndView("mainPage");
			mv.addObject("page", new pageMsg("/", "index", "GE Tree"));
			return mv;
		}
	}

	@Controller
	@RequestMapping(value = "/person")
	public class PersonWebPagesDisplay {

		@RequestMapping(value = "/All", method = RequestMethod.GET)
		public ModelAndView ShowAllPersonInTable() {
			ModelAndView mv = new ModelAndView("mainPage");
			mv.addObject("page", new pageMsg("/person/All", "listAll", "GE - All Person List"));
			mv.addObject("persons", ps.findAllPerson());

			return mv;
		}

		@RequestMapping(value = "/detail/{id}", method = RequestMethod.GET)
		public ModelAndView ShowPersonDetail(@PathVariable Integer id) {
			ModelAndView mv = new ModelAndView("mainPage");
			Person p = null;
			String Title;
			try {
				p = ps.findById(id);
				mv.addObject("person", p);
				mv.addObject("finded", true);
				Title = "GE - " + p.getName();
			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println(e);
				mv.addObject("finded", false);
				Title = "People not find";
				mv.addObject("msg", e.getPServiceErrorCode().getDesc());
			}
			
			if (p != null) {
				boolean findFather = false;
				boolean findMother = false;

				try {
					Person f = ps.findById(p.getFatherKey());
					if (f != null) {
						mv.addObject("father", f.getName());
						findFather = true;
					}
				} catch (PersonSecviceException e) {
					// TODO: handle exception
				}

				try {
					Person m = ps.findById(p.getMotherKey());
					if (m != null) {
						mv.addObject("mother", m.getName());
						findMother = true;
					}
				} catch (PersonSecviceException e) {
					// TODO: handle exception
				}

				mv.addObject("findFather", findFather);
				mv.addObject("findMother", findMother);
			}
			mv.addObject("page", new pageMsg("/person/detail/" + id, "person", Title));
			return mv;
		}

	}

	@Controller
	@RequestMapping(value = "/person")
	public class PersonOperation {

		/**
		 * (a) Adding a person
		 */

		/**
		 * (1) GET
		 * /GE/person/add?key=3&name=RichardIII&dob=14830626&m=1&f=2&g=male
		 * 
		 * @param key
		 *            the unique key of the person (*)
		 * @param name
		 *            full name of the person (*)
		 * @param motherKey
		 *            : the person’s mother’s key
		 * @param fatherKey
		 *            the person’s father’s key
		 * @param dateOfBirth
		 *            the person’s date of birth (e.g. 19921210 – December 10th
		 *            1992)
		 * @param gender
		 *            the person’s gender
		 * @return return PersonSecviceMessage (*) Required fields
		 */
		@RequestMapping(value = "/add", method = RequestMethod.GET)
		public @ResponseBody Object addPerson(@RequestParam(value = "key", required = true) int key,
				@RequestParam(value = "name", required = true) String name,
				@RequestParam(value = "m", required = false) Integer motherKey,
				@RequestParam(value = "f", required = false) Integer fatherKey,
				@RequestParam(value = "dob", required = false) String dateOfBirth,
				@RequestParam(value = "g", required = false) String gender) {

			Date birthDay = Date.valueOf(dateOfBirth);
			try {
				ps.save(new Person(key, name, motherKey, fatherKey, birthDay, gender), true);
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
		 * @param obj
		 *            input person or person list json
		 * @return return PersonSecviceMessage
		 */
		@RequestMapping(value = "/addJSON", method = RequestMethod.POST)
		public @ResponseBody Object addJson(@RequestBody Object obj,
				@RequestParam(value = "update", required = false) boolean update) {

			Map objMap = null;
			try {
				objMap = (Map) obj;
				if (objMap.containsKey("list")) {
					ArrayList listArray = ((ArrayList) objMap.get("list"));
					ArrayList<Person> pList = new ArrayList<Person>();
					for (Object pObj : listArray) {
						Map pObjMap = (Map) pObj;
						Person p = new Person();
						BeanUtils.populate(p, pObjMap);
						if (objMap.containsKey("dob")) {
							String strDate = objMap.get("dob").toString();
							System.out.println(strDate);
							Date birthDay = Date.valueOf(strDate);
							p.setDateOfBirth(birthDay);
						}
						pList.add(p);
					}
					ps.saveList(pList, !update);
					return new PersonSecviceMessage(true);
				} else {
					Person p = new Person();
					BeanUtils.populate(p, objMap);
					if (objMap.containsKey("dob")) {
						String strDate = objMap.get("dob").toString();
						System.out.println(strDate);
						Date birthDay = Date.valueOf(strDate);
						p.setDateOfBirth(birthDay);
					}
					System.out.println(p);
					ps.save(p, !update);
					return new PersonSecviceMessage(true);
				}
			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println(e);
				return new PersonSecviceMessage(false, e.getPServiceErrorCode().getDesc());
			} catch (Exception e) {
				// TODO: handle exception
				return new PersonSecviceMessage(false, "No person or person list passed in");
			}
		}

		/**
		 * (b) Deleting a person
		 * 
		 * GET /GE/person/delete/7
		 * 
		 * @param id
		 *            input person key
		 * @return return PersonSecviceMessage
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
		 *            input person key
		 * @return return Person if find else return PersonSecviceMessage
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
		 *            input person key
		 * @return return a Person's ancestors tree if find else return a
		 *         PersonSecviceMessage
		 */
		@RequestMapping(value = "/ancestors/{id}", method = RequestMethod.GET)
		public @ResponseBody Object ancestors(@PathVariable Integer id) {
			try {
				return new PersonTree(ps.findById(id), ps, true, 0);
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
		 *            input person key
		 * @return return a Person's descendants tree if find else return a
		 *         PersonSecviceMessage
		 */
		@RequestMapping(value = "/descendants/{id}", method = RequestMethod.GET)
		public @ResponseBody Object descendants(@PathVariable Integer id) {
			try {
				return new PersonTree(ps.findById(id), ps, false, 0);
			} catch (PersonSecviceException e) {
				// TODO: handle exception
				System.out.println(e);
				return new PersonSecviceMessage(false, e.getPServiceErrorCode().getDesc());
			}
		}

		@RequestMapping(value = "/getAll", method = RequestMethod.POST)
		public @ResponseBody Object getAll(){
			return (ps.findAllPerson());
		}
	}
}
