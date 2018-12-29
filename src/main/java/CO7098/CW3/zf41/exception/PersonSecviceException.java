package CO7098.CW3.zf41.exception;

import CO7098.CW3.zf41.errorcode.PersonServiceErrorCode;

public class PersonSecviceException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private PersonServiceErrorCode pServiceErrorCode;

	public PersonSecviceException(PersonServiceErrorCode pServiceErrorCode) {
		super(pServiceErrorCode.toString());
		this.pServiceErrorCode = pServiceErrorCode;
	}

	public PersonServiceErrorCode getPServiceErrorCode() {
		return this.pServiceErrorCode;
	}
}
