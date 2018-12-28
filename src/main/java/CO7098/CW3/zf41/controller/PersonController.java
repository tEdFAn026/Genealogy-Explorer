package CO7098.CW3.zf41.controller;

import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import CO7098.CW3.zf41.domain.Person;
import CO7098.CW3.zf41.service.PersonService;

@Controller
public class PersonController {
	@Autowired
	PersonService ps;
	
	@Controller
	public class DisplayGE {

		@RequestMapping(value = "/", method = RequestMethod.GET)
		public ModelAndView addPerson() {
			System.out.println(ps.findAllPerson());
			return new ModelAndView("listAll", "persons", ps.findAllPerson());
		}
		
//		@RequestMapping(value = { "/listAllJson" })
//		public @ResponseBody Object listAllJson(Model model) {
//			Object o = ps.findAllPerson();
//			return o;
//		}
//		
//		@RequestMapping(value = "/create")
//		public ModelAndView create() {
//			return new ModelAndView("create");
//		}
//
//		@RequestMapping(value = "/save", method = RequestMethod.POST)
//		public ModelAndView save(Person p) {
//			ps.save(p);
//			return new ModelAndView("redirect:/");
//
//		}
//
//		@RequestMapping(value = "/edit/{id}")
//		public ModelAndView edit(@PathVariable Integer id) {
//			return new ModelAndView("edit", "person", ps.findById(id));
//		}
//
//		@RequestMapping(value = "/delete/{id}")
//		public ModelAndView delete(@PathVariable Integer id) {
//			ps.deleteById(id);
//			return new ModelAndView("redirect:../");
//		}
//
//		@RequestMapping(value = "/update", method = RequestMethod.POST)
//		public ModelAndView update(Person p) {
//			ps.save(p);
//			return new ModelAndView("redirect:/");
//		}
	}
	
	@Controller
	@RequestMapping(value = "/person")
	public class PersonOperation {

		@RequestMapping(value = "/add", method = RequestMethod.GET)
		public ModelAndView addPerson(@RequestParam(value = "key", required = true) int key,
				@RequestParam(value = "name", required = true) String name,
				@RequestParam(value = "m", required = false) int motherKey,
				@RequestParam(value = "f", required = false) int fatherKey,
				@RequestParam(value = "dob", required = false) int dateOfBirth,
				@RequestParam(value = "g", required = false) String gender) {

			Vector<Person> persons = new Vector<Person>();
			System.out.println(key);
			persons.add(new Person(key, name, motherKey, fatherKey, dateOfBirth, gender));

			ModelAndView mv = new ModelAndView("listAll", "persons", persons);
			return mv;
		}

		// @RequestMapping(value = "/addJSON", method = RequestMethod.POST)
		// public @ResponseBody Object addPerson(Model model) {
		// Object object = null;
		// return object;
		// }
	}
}
